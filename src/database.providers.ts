
import { DataSource, DataSourceOptions } from 'typeorm';

export const Config: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'gsd_task_manager',
  entities: ['dist/../**/*.entity{.ts,.js}'],
  synchronize: true,
  migrations: ['dist/migrations/*.{ts,js}'],
  migrationsTableName: 'typeorm_migrations',
}

export const AppDataSource: DataSource = new DataSource(Config);
