import { TypeOrmModule } from '@nestjs/typeorm';

export const PG_CONFIG_DATABASE = () => {
  console.log('ENV', process.env.ENV);

  return TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: true,
    synchronize: true,
  });
};
