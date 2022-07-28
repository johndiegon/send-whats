export interface MessageResponseType {
    messages: MessageType[]
}

export interface MessageType {
    id: string
    title: string
    idClient: string
    message: string
    positiveAnswer: string,
    negativeAnswer: string,
    params:string[];
    picture: string
}

export interface MessagePutType {
    idMessage: string
    title: string
    idClient: string
    message: string
    picture: string
    positiveAnswer:string
    negativeAnswer:string
}

export interface MessageSendType {
   
    template:string
    params:Param[]
   
}

export interface Param {
    name:string, 
    value:string
}
