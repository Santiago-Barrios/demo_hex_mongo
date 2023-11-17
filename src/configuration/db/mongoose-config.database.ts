import {MongooseModule} from "@nestjs/mongoose";

export const MONGOOSE_CONFIG_DATABASE = () => {
  console.log('Mongoose configuration');
  console.log('ENV', process.env);

  return MongooseModule.forRoot('mongodb://localhost:27017/nest-store')
};
