import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { DataTableService as IDataTableService } from '../interfaces';
import { HttpService } from '../../core/services/http/http.service';
import { UrlConfig } from '../../core/interface/http/UrlConfig';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataTableService implements IDataTableService {
    opt: any = {
        pageNumber: 1,
        pageSize: 5,
        orderByValue: [{ colId: 'id', sort: 'asc' }],
        filter: {}
    };
    searchNew$: Subject<any> = new Subject<any>();

    private httpService = inject(HttpService);

    loadData(url: string): Observable<any> {
        const urlConfig: UrlConfig = {
            apiName: url,
            params: this.opt,
            showAlert: false
        };
        return this.httpService.getAll(urlConfig);
    }

    delete(url: string, id: string): Observable<any> {
        const urlConfig: UrlConfig = {
            apiName: url,
            params: {},
            showAlert: true
        };
        return this.httpService.delete(urlConfig, id);
    }

    deleteRange(url: string, ids: string[]): Observable<any> {
        const urlConfig: UrlConfig = {
            apiName: url,
            params: {},
            showAlert: true
        };
        return this.httpService.postRange(urlConfig, ids);
    }
}
