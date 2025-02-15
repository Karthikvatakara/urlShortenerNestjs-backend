import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema}]),
      JwtModule.register({
            secret: process.env.JWT_KEY, 
            signOptions: { expiresIn: '1h' },
          }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
