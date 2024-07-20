export interface IUser {
    userId: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    isActive: boolean,
    imageUrl: string,
}

export interface IUserData {
    token: string,
    refreshToken: string,
    role: string,
    user : IUser
}

