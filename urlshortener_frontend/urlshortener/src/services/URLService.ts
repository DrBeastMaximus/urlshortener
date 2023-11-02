import UrlShortenerApi from '../api/UrlShortenerApi/api'
import {UrlDataItem} from "../api/UrlShortenerApi/types";

export class URLService {
    async getCode(url: string): Promise<string> {
        const user = localStorage.getItem("user")
        let token;
        if(user){
            const parsedData = JSON.parse(user)
            token = parsedData.token
        }
        return await UrlShortenerApi.getCode(url, token);
    }

    async getAllLinks(): Promise<UrlDataItem[]> {
        const user = localStorage.getItem("user")
        let token;
        if(user){
            const parsedData = JSON.parse(user)
            token = parsedData.token
        }
        return await UrlShortenerApi.getAllLinks(token) as UrlDataItem[];
    }

    async getLink(code: string): Promise<string> {
        return await UrlShortenerApi.getLink(code);
    }

    async removeLink(id: string): Promise<void> {
        return await UrlShortenerApi.removeLink(id);
    }

}