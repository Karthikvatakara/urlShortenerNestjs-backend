import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor( private jwtService: JwtService ) {}

    canActivate(context: ExecutionContext) :boolean {
        const req = context.switchToHttp().getRequest();
        const token = req.cookies['access_Token'];

        if(!token){
            throw new UnauthorizedException('user not authenticated')
        }

        try{
            const decoded = this.jwtService.verify(token,{ secret: process.env.JWT_KEY});
            req.user = decoded;
            console.log(req.user)
            return true;
        }catch(error){
            throw new UnauthorizedException('invalid or expired token')
        }
    }
}