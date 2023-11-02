import axios, {AxiosInstance} from 'axios';

class ApiRequest {
    protected instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
            baseURL: 'https://localhost:8080/',
            timeout: 1000,
        });
    }

    protected async request(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', data?: any) {
        const user = localStorage.getItem('user')
        const response = await this.instance.request({
            url,
            method,
            data,
            headers : {
                'Access-Control-Allow-Origin': '*',
                'Authorization': user ? JSON.parse(user).token : null
            },
        });

        return response.data;
    }
}

export default ApiRequest;