import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigurationModule } from './configuration/configuration.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ConfigurationModule,
    ProductModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-store'),
  ],
})
export class AppModule {}
