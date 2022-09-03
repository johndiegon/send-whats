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
    typeList: {
        id: string,
        name: string,
        description: string
    },
    count: number,
    dateMessage: string,
    listContact: ContactType[],
    listSendMessage: [
        null
    ]
}

export interface ContactType {
    id: string,
    name: string,
    phone: string,
    email: string,
    idClient: string,
    status: number,
    orders: [
        {
            dateOrder: string,
            price: number
        }
    ],
    daysLastSale: number,
    minDayToSendMessage: number,
    dateLastSale: string,
    ordersInLastMonth: number,
    ordersInLastYear: number,
    ordersInLast6Month: number,
    ordersTotal: number,
    averagePrice: number
}
