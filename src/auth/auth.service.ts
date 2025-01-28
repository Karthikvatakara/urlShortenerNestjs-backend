import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { SignupUserDto } from './dtos/signup.dto';
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dtos/login.dto';
import * as jwt from 'jsonwebtoken'
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    async signup(user: SignupUserDto) {
        try{
        const { username, email, password } = user;

        const existingUser = await this.userModel.findOne({email});

        if(existingUser){
            throw new ConflictException('email already exist')
        }

       
        
        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new this.userModel({
            username,
            email,
            password: hashedPassword
        })

        
            const savedUser =  await newUser.save();

            const token = jwt.sign(
                { userId: savedUser._id, username: savedUser.username, email: savedUser.email },
                process.env.JWT_KEY!,
                { expiresIn: '1h' }
            );

            
            return {
                message:"signup succesfull",
                user: {
                    username: savedUser.username,
                    email: savedUser.email
                },
                token
            }
        }catch(error){
            if(error instanceof  ConflictException){
                throw error
            }

            console.log(error,"error ocuured");
            throw new InternalServerErrorException("an error occured while signing up")
        }
    }



    async login(loginDto: LoginUserDto) {
        try{
            const { email, password } = loginDto;

        const user = await this.userModel.findOne({email});

        if(!user){
            throw new UnauthorizedException('email is not valid')
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            throw new UnauthorizedException('invalid password')
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username, email: user.email },
            process.env.JWT_KEY!,
            { expiresIn: '1h'}
        )

        return { message: 'login succesfull',
                 user: {
                    username: user.username,
                    email: user.email
                 },
                 token
        }

        }catch(error){
            if(error instanceof UnauthorizedException){
                throw error;
            }
            console.log(error,"error occured in the login");
            throw new InternalServerErrorException("error occured in the login")
        }
    }


    async logout() {
        try{
            return { message: 'logout succesfull '}
        }catch(error){
            throw new InternalServerErrorException('error occurred while logging out');
        }
    }
}
