import { normalizeString } from '../normalize/normalize-string';
import { FilterLogicalOperatorEnum, FilterOperatorEnum } from './filter.enums';
import { IUbitsFilterArgs } from './filter.interface';

type ValidationRecord = Record<string, boolean>;

export const filterObject = (
  logicalOperator: FilterLogicalOperatorEnum,
  items: any[],
  args: IUbitsFilterArgs,
): any[] => {
  if (!args || !items) return items || [];
  const currentArgs: IUbitsFilterArgs = getValidArgs(args);

  return items.filter((item) => {
    const validations: ValidationRecord = validateItemValues(currentArgs, item);
    return validateByLogicalOperator(currentArgs, validations, logicalOperator);
  });
};

function getValidArgs(args: IUbitsFilterArgs) {
  const currentArgs: any = {};
  for (const [key, { value }] of Object.entries(args)) {
    if (value !== null && value !== undefined && Boolean(`${value}`.trim())) {
      currentArgs[key] = args[key];
    }
  }
  return currentArgs;
}

function deserializeData(value: any): any {
  return JSON.parse(JSON.stringify(value));
}

function validateItemValues(
  args: IUbitsFilterArgs,
  item: Record<string, any>,
): ValidationRecord {
  const validations: any = {};

  Object.keys(args).forEach((key: string) => {
    const operator: FilterOperatorEnum = args[key].operator;
    const value1 = normalizeString(deserializeData(item?.[key] ?? ''));
    const value2 = normalizeString(deserializeData(args[key]?.value ?? ''));

    let isValid = false;
    if (Object.keys(item).includes(key))
      isValid = compareValues(value1, operator, value2);

    validations[key] = isValid;
  });

  return validations;
}

function validateByLogicalOperator(
  args: IUbitsFilterArgs,
  validations: ValidationRecord,
  logicalOperator: FilterLogicalOperatorEnum,
) {
  switch (logicalOperator) {
    case FilterLogicalOperatorEnum.AND:
      return validateByLogicalOperatorAnd(validations);
    case FilterLogicalOperatorEnum.OR:
      return validateByLogicalOperatorOr(args, validations);
  }
}

function validateByLogicalOperatorAnd(validations: ValidationRecord): boolean {
  return Object.values(validations).every(Boolean);
}

function validateByLogicalOperatorOr(
  args: IUbitsFilterArgs,
  validations: ValidationRecord,
): boolean {
  if (!Object.keys(args).length) return true;

  const primaryKeys: boolean[] = [];
  const secondaryKeys: boolean[] = [];

  for (const key of Object.keys(args)) {
    const { primary } = args[key];
    const validation: boolean = validations[key];
    if (primary) {
      primaryKeys.push(validation);
    } else {
      secondaryKeys.push(validation);
    }
  }

  if (primaryKeys.length && secondaryKeys.length) {
    return !!primaryKeys.includes(false) && secondaryKeys.includes(true);
  }

  if (primaryKeys.length && !secondaryKeys.length) {
    return !!primaryKeys.includes(false);
  }

  return secondaryKeys.includes(true);
}

function compareValues(
  value1: any,
  operator: FilterOperatorEnum,
  value2: any,
): boolean {
  switch (operator) {
    case FilterOperatorEnum.EqualTo:
      return Boolean(value1 == value2);
    case FilterOperatorEnum.NotEqualTo:
      return Boolean(value1 != value2);
    case FilterOperatorEnum.GreaterThan:
      return Boolean(value1 > value2);
    case FilterOperatorEnum.GreaterThanOrEqualTo:
      return Boolean(value1 >= value2);
    case FilterOperatorEnum.LessThan:
      return Boolean(value1 < value2);
    case FilterOperatorEnum.LessThanOrEqualTo:
      return Boolean(value1 <= value2);
    case FilterOperatorEnum.ILike:
      return iLikeOperator(value1, value2);
    case FilterOperatorEnum.ContainsWord:
      return containsWordOperator(value1, value2);
    case FilterOperatorEnum.Includes:
      return includesOperator(value1, value2);
    default:
      return false;
  }
}

function iLikeOperator(value1: string, value2: string): boolean {
  const currentValue = String(value1).toLocaleLowerCase().trim();
  const search = String(value2).toLocaleLowerCase().trim();
  const regex = new RegExp(search, 'i');
  const filter: boolean = regex.test(currentValue);
  return filter;
}

function containsWordOperator(value1: string, value2: string): boolean {
  const currentValue = value1.toLowerCase().trim();
  const words2 = value2.toLowerCase().trim().split(' ');
  const words1 = currentValue.split(' ');
  return words1.some((word1) => words2.some((word2) => word1.includes(word2)));
}

function includesOperator(value1: string, value2: string): boolean {
  return value2.includes(value1);
}
