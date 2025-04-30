
interface IUser  {
    user_id: number,
    email: string,
}
interface ISession {
    guid_id: string,
    // status
    // exp date...
}

export type {IUser, ISession}