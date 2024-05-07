import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from './tag/tag.module';
import { TaskModule } from './task/task.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Config } from './database.providers';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'gsd_task_manager',
      entities: [__dirname + '/../**/*.entity.js'],
      migrationsRun: true,
      // synchronize: true // do not use in production
      
      // entities: ['dist/../**/*.entity{.ts,.js}'],
      // migrations: ['dist/migrations/*.{ts,js}'],
      // migrationsTableName: 'typeorm_migrations',

    }),
    // ConfigModule.forRoot({ isGlobal: true}),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => Config,
    //   inject: [ConfigService]
    // }),
    TagModule, TaskModule, CategoryModule,],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
