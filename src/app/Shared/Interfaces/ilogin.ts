export interface Ilogin {

}

export interface IloginRequest {
    email: string;
    password: string;
}

export interface IloginResponse {
    token: string;
    user: IUser;
}

export interface IUser {
    id: number;
    name: string;
    email: string;
}
