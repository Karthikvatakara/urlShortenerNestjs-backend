import { Body, Controller, HttpCode, Post, Res, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupUserDto } from './dtos/signup.dto';
import { LoginUserDto } from './dtos/login.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

  @Post('signup')
  @HttpCode(201)
  async signup(@Body() user: SignupUserDto, @Res() res: Response) {
    const result =  await this.authService.signup(user);

    res.cookie('access_Token', result.token,{
        httpOnly: true,
        maxAge: 36000*1000,
        sameSite: "none"
    })
    res.json({message: result.message, user: result.user})
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() user: LoginUserDto,  @Res() res: Response){
    console.log(user,"afjahkjfhakjhdfk")
    const result =  await this.authService.login(user);

    res.cookie('access_Token',result.token,{
        httpOnly: true,
        maxAge: 3600*1000,
        sameSite: "none"
    })

    res.json({ message: result.message , user: result.user})
  }

  @Post('logout')
  @HttpCode(200)
  async logout( @Res() res: Response) {
      const result =  await this.authService.logout()
      res.clearCookie('access_Token');
      res.json({ message: result.message})
  }

  @Get('validate')
  @UseGuards(JwtAuthGuard)
  async validateToken(@Req() req: Request) {
        return { isValid: true, user: req.user }
  }
}
