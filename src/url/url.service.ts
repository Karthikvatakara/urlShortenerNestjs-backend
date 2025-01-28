import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Url } from './schema/url.schema';
import { Model } from 'mongoose';
import * as shortid from 'shortid'

@Injectable()
export class UrlService {
    constructor(@InjectModel(Url.name) private urlModel: Model<Url>){}

    async createShortUrl(originalUrl: string,userId:string) {
        const shortUrl = shortid.generate();

        const newUrl = new this.urlModel({
            originalUrl,
            shortUrl,
            userId
        });
        
        return await newUrl.save();
    }

    async getUserUrls(userId: string) {
        const userUrls = await this.urlModel.find({ userId});
        return userUrls
    }

    async findByShortUrl(shortUrl: string){
        
        return await this.urlModel.findOne({ shortUrl })
    }
}
