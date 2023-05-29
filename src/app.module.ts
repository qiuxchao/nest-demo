import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRootAsync({
      useFactory: () =>
        ({
          type: 'mongodb',
          host: 'localhost',
          port: 27017,
          database: 'nest-demo',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        } as MongoConnectionOptions),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
