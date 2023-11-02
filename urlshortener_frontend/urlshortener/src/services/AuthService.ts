import AuthApi from '../api/AuthApi/api'

import {ChangePasswordReq, User} from "../api/AuthApi/types";

export class AuthService {
    async login(username: string, password: string): Promise<User> {
        const data = await AuthApi.login(username, password);
        localStorage.setItem('user', JSON.stringify({"username": data.username, "token": data.token}));
        return data;
    }

    async register(username: string, password: string, email: string): Promise<User> {
        const data = await AuthApi.register(username, password, email);
        localStorage.setItem('user', JSON.stringify({"username": data.username, "token": data.token}));
        return data;
    }

    async isTokenValid(token: string): Promise<Boolean> {
        return await AuthApi.isTokenValid(token);
    }

    async changePass(oldPassword: string, newPassword: string, confirmPassword: string): Promise<User> {
        const user = localStorage.getItem("user")
        let token;
        if(user){
            const parsedData = JSON.parse(user)
            token = parsedData.token
        }

        const changePassReq: ChangePasswordReq = {
            "token": token,
            "oldPassword": oldPassword,
            "newPassword": newPassword,
            "confirmPassword": confirmPassword
        }
        const data = await AuthApi.changePassword(changePassReq);
        localStorage.clear();
        localStorage.setItem('user', JSON.stringify({"username": data.username, "token": data.token}));
        return data;
    }

}