import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'postgres-db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'tododb',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
