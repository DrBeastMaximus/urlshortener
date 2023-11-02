export interface User {
    username: string;
    token: string;
}

export interface ChangePasswordReq {
    token: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}