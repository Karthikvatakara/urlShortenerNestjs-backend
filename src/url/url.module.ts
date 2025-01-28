import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { UrlSchema,Url } from './schema/url.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema}]),
      JwtModule.register({
        secret: process.env.JWT_KEY, 
        signOptions: { expiresIn: '1h' },
      }),
  ],
  controllers: [UrlController],
  providers: [UrlService]
})
export class UrlModule {}
