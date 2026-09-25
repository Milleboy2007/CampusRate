import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
import { PlacesModule } from './places/places.module';
import { JsonService } from './json.service';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true
    }),
    PlacesModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService, JsonService],
})
export class AppModule {}
