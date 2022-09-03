export interface HistoryInputFile {
    reportFile: ReportFile[];
}

export interface ReportFile{
    fileName:string  
    lines:number
    messageError:string
    FileInported:boolean
    dateTime:Date 
}