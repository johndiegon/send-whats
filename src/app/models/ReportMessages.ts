export interface ReportMessages {
    template:string
    totalSenders:number
    totalAnswer:number
    answer:HistoryAnswer[] 
}

export interface HistoryAnswer {
    month:string
    count:number
    answer:string
}