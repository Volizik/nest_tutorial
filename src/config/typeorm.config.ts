import {TypeOrmModuleOptions} from '@nestjs/typeorm';

export const TypeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port:  3306,
    username: 'volizik',
    password: '1',
    database: 'taskmanagement',
    entities: [__dirname + '/../../dist/**/*.entity.js'],
};
