import ApiRequest from '../../utils/axios';
import {ChangePasswordReq, User} from "./types";

class AuthApi extends ApiRequest {
    BASE_URL = "http://localhost:8080/api/auth"

    async login(username: string, password: string): Promise<User> {
        return await this.request(`${this.BASE_URL}/signin`, "POST",
            {
                "username":username,
                "password":password
            }) as User;
    }

    async register(username: string, password: string, email: string): Promise<User> {
        return await this.request(`${this.BASE_URL}/signup`, "POST",
            {
                "username": username,
                "email": email,
                "password": password
            }) as User;
    }

    async changePassword(req: ChangePasswordReq): Promise<User> {
        return await this.request(`${this.BASE_URL}/changePass`, "POST",
            {
                "token": req.token,
                "oldPassword": req.oldPassword,
                "newPassword": req.newPassword,
                "confirmPassword": req.confirmPassword
            }) as User;
    }

    async isTokenValid(token: string): Promise<Boolean> {
        return await this.request(`${this.BASE_URL}/valid?token=${token}`, "GET")
    }
}

export default new AuthApi();