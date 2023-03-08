import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database/database.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), AuthModule, UsersModule],
  controllers: [AuthController],
})
export class AppModule {}
