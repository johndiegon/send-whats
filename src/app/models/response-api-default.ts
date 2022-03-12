
export type ReponseWrapper<T = {}> =  T & {
    data: {
        message: string
        status: number
    }
    notification: any
}