export interface MessageResponseType {
    messages: MessageType[]
}

export interface MessageType {
    id: string
    title: string
    idClient: string
    message: string
    picture: string
}

export interface MessagePutType {
    idMessage: string
    title: string
    idClient: string
    message: string
    picture: string
}

export interface MessageSendType {
    idList: string
    message: string
    picture: string
    phone: string
}
