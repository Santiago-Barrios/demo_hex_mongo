import { TypeOrmModule } from '@nestjs/typeorm';

export const MYSQL_CONFIG_DATABASE = () => {
  console.log('Mysql configuration');
  console.log('ENV', process.env.ENV);

  return TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.MYSQL_DB_HOST,
    port: +process.env.MYSQL_DB_PORT,
    username: process.env.MYSQL_DB_USERNAME,
    database: process.env.MYSQL_DB_NAME,
    password: process.env.MYSQL_DB_PASSWORD,
    autoLoadEntities: true,
    synchronize: true
  })
};
