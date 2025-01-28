import { Param,Res,Body, Controller, Post, UseGuards,Req, Get, HttpCode,HttpException, HttpStatus } from '@nestjs/common';
import { UrlService } from './url.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { CreateUrlDto } from './dtos/create-url.dto';
import { Response } from 'express';

@Controller('url')
export class UrlController {
    constructor(private urlService: UrlService) {}

    @UseGuards(JwtAuthGuard)
    @Post('shorten')
    @HttpCode(201)
    async ShortenUrl(@Body() createUrlDto:CreateUrlDto,@Req() req: Request){
        try{
            const userId = req.user.userId;
            const shortendUrl = await this.urlService.createShortUrl(
                createUrlDto.originalUrl,
                userId);
            const baseUrl = process.env.BASE_URL;

            const shortUrl = `${baseUrl}/${shortendUrl.shortUrl}`;

            return { 
                message:"url shortend succesfully",
                shortUrl};
        }catch(error){
            throw new HttpException(
                'Failed to shorten URL',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Get(':shortUrl')
    async redirectToOriginalUrl(@Param('shortUrl') shortUrl: string,@Res() res: Response) {
        try{
            
            const urlData = await this.urlService.findByShortUrl(shortUrl);
            if(!urlData){
                throw new HttpException('short url not found',HttpStatus.NOT_FOUND)
            }
            console.log(urlData)
            return res.redirect(urlData.originalUrl)
        }catch(error){
            throw new HttpException('redirection failed',HttpStatus.INTERNAL_SERVER_ERROR)
        }
    } 

    @UseGuards(JwtAuthGuard)
    @Get('user-urls')
    async getUrl(@Req() req: Request){
        try{
            const userId = req.user.userId;
            const urls = await this.urlService.getUserUrls(userId);
            console.log(urls)
            return { message: "urls fetched succesfully", urls}
        }catch(error){
            throw new HttpException(
                'Failed to fetch URLs',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
