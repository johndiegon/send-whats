import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ReponseWrapper } from '../models/response-api-default';
import { DashboardResType, DashboardType } from '../models/dashboardType';

@Injectable({providedIn: 'root'})
export class DashboardService {
    constructor(private httpClient: HttpClient) { }
    
    get(){
        return this.httpClient.get<ReponseWrapper<DashboardResType>>(`${environment.FEATURE_API}/DashBoard`,{
            headers: {
                'Access-Control-Allow-Credentials': 'true'
                , 'Access-Control-Allow-Origin': '*'
            }
        });
    }
}