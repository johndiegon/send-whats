export interface ContactListType {
    resume: ContactListResumeResType
}

export interface ContactListResumeResType {
    id: string,
    idClient: string,
    contactLists: ContactListType[]
}

export interface ContactListType {
    id: string,
    idClient: string,
    name: string,
    creationDate: string,
    count: number,
    ticketMedio: number,
    ordersCount:number,
    dateMessage: string
}
