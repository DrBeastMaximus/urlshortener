import ApiRequest from '../../utils/axios';
import {UrlDataItem} from "./types";

class UrlShortenApi extends ApiRequest {
    BASE_URL = "http://localhost:8080/url"

    async getCode(url: string, token: string): Promise<string> {
        return await this.request(`${this.BASE_URL}`, "POST", {
            "url": url,
            "token": token
        });
    }

    async getLink(code: string): Promise<string> {
        return await this.request(`${this.BASE_URL}/s/${code}`, "GET");
    }

    async getAllLinks(token: string): Promise<UrlDataItem[]> {
        return await this.request(`${this.BASE_URL}/getAll?token=${token}`, "GET") as UrlDataItem[]
    }

    async removeLink(id: string): Promise<void> {
        return await this.request(`${this.BASE_URL}/${id}`, "DELETE")
    }

}

export default new UrlShortenApi();