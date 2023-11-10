import { Module } from '@nestjs/common';
import { PG_CONFIG_DATABASE } from './db/pg-config.database';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), PG_CONFIG_DATABASE()],
})
export class ConfigurationModule {}
