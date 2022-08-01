export interface DashboardResType {
    dataDashboard:DataDashboard
}
export interface DataDashboard{
    countSendMessage:number,
    countReceiverAnswer:number,
    countSendMessageThisMonth:number,
    countReceiverAnswerThisMonth:number,
    reportTemplates:ReportTemplate[],
    historySenders: ReportSendEntity[]
}

export interface ReportTemplate{
    template:string
    countSendMessage:number,
    countReceiverAnswer:number,
    countSendMessageThisMonth:number,
    countReceiverAnswerThisMonth:number,
    totalAnswer: Answers[],
    totalSenders: Senders[],
}

export interface Answers {
    template:string,
    answer:string,
    count:number, 
    month:string, 
    year:string
}

export interface Senders {
    template:string,
    count:number, 
    countOk:number, 
    month:string, 
    year:string
}

export interface ReportSendEntity{
    template:string,
    count:number, 
    countOk:number, 
    dateTime:Date, 
}