import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PlacesModule } from './places/places.module';
import { ReviewsModule } from './reviews/reviews.module';
import databaseConfig from './config/database.config';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        PORT: Joi.number().default(3000)
      })
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
        autoIndex: process.env.NODE_ENV !== 'production'
      })
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000, //temp de vie en miliseconde
      limit: 100 // nb max de requête par ip
    }]),
    PlacesModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService, 
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }],
})
export class AppModule {}
