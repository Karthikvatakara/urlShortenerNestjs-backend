import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Url } from './schema/url.schema';
import { Model } from 'mongoose';
import * as shortid from 'shortid'

@Injectable()
export class UrlService {
    constructor(@InjectModel(Url.name) private urlModel: Model<Url>){}

    async createShortUrl(originalUrl: string,userId:string) {
        const shortCode = shortid.generate();


        const baseUrl = process.env.BASE_URL;

        const shortUrl = `${baseUrl}/${shortCode}`;

        console.log("🚀 ~ UrlService ~ createShortUrl ~ shortUrl:", shortUrl)
        const newUrl = new this.urlModel({
            originalUrl,
            shortUrl,
            userId
        });
        
        return await newUrl.save();
    }

    async getUserUrls(userId: string) {
        const userUrls = await this.urlModel.find({ userId }).sort({createdAt:-1});
        return userUrls
    }

    async findByShortUrl(shortCode: string){
        const baseUrl = process.env.BASE_URL;

        const fullShortUrl = `${baseUrl}/${shortCode}`
        const result = await this.urlModel.findOne({ shortUrl:fullShortUrl })
        return result
    }
}
