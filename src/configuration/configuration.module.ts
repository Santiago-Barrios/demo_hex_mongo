import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {MYSQL_CONFIG_DATABASE} from "./db/mysql-config.database";
import { PG_CONFIG_DATABASE } from './db/pg-config.database';
import {MONGOOSE_CONFIG_DATABASE} from "./db/mongoose-config.database";

@Module({
  imports: [ConfigModule.forRoot(),
    //PG_CONFIG_DATABASE(),
    MYSQL_CONFIG_DATABASE(),
   // MONGOOSE_CONFIG_DATABASE(),
  ],
})
export class ConfigurationModule {}
