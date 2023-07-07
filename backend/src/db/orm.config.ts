import { Entities } from "src/orm/entity/main";
import { Migrations } from "src/orm/migration/main";
import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import path from 'path';
import * as process from 'process';

if (process.env.NODE_ENV === 'test') {
  const filePath = path.join(__dirname, '../../../.env.test');
  console.log('Loading .env.test configuration from ', filePath);
  dotenv.config({ path: filePath });
} else {
  console.log(`Loading .env configuration`);
  dotenv.config();
}
// only used to run migrations.

const dataSourceOption: DataSourceOptions = {
  type: "postgres",
  logging: true,
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  synchronize: true,
  entities: Entities,
  migrations: Migrations,
  subscribers: ["src/subscriber/**/*{.ts,.js}"],
};

export const AppDataSource = new DataSource(dataSourceOption);
