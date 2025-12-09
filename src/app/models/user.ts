export interface User {
    id?: string;
    name: string;
    email: string;
    password?: string; 
    address?: string;   
    cart?: any;         
}

export interface LoginResponse {
    message: string;
    token: string;
    userId: string;
    userName: string;
}