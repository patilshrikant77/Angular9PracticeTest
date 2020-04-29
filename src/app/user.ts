export interface UserInfo {
    Id?:string;
    userName:string;
    userEmail:string;
    userWebAddress:string
    userCoveLetter:string,
    userAttacment:string;
    userWorking:string;
}

export interface User {
    Id:number;
    email:string;
}

export interface UserResponse  {
    message:string;
    type:boolean;
}
