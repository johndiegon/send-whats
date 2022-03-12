import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AddressService {
    constructor(private httpClient: HttpClient) { }

    getAddressByZipCode(zipCode: string) {
        return this.httpClient.get(`${environment.FEATURE_API}/address`, {
            params: {
                zipCode: zipCode
            },
            headers: {
                'Access-Control-Allow-Credentials': 'true'
                , 'Content-Type': 'application/json'
                , 'Access-Control-Allow-Origin': '*'
            }
        })
    }

}