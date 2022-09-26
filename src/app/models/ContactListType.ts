export interface ContactListType {
    resume: ContactListResumeResType
}

export interface ContactListResumeResType {
    id: string,
    idClient: string,
    fileIsProcessing:boolean,
    InputFile : Date,
    contactLists: ContactListType[]
}

export interface ContactListType {
    id: string,
    idClient: string,
    name: string,
    unity:string,
    count: number,
    type:number,
    creationDate: string,
    dateOrders:DateOrder[],
    countOrders:number,
    orderInWeeks:OrderInWeek[],

}

export enum TypeList{
    Order,
    Tag
}

export interface DateOrder{
    orderDate:Date,
    count:number
}

export interface CountOrder{
    orderCount:number
    count:number
}

export interface OrderInWeek{
    filterDays:FilterWeekDays,
    count:number
}

export enum FilterWeekDays{
    JustNight,
    JustDay,
    JustWeeKend,
    JustWeek,
}