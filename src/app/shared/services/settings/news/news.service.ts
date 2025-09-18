import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NewsService {

    constructor(private http: HttpClient) { }

    add(data: any): Observable<any> {
        // Placeholder implementation
        return this.http.post('/api/news', data);
    }

    update(data: any): Observable<any> {
        // Placeholder implementation
        return this.http.put('/api/news', data);
    }

    getEditNews(id: number): Observable<any> {
        // Placeholder implementation
        return this.http.get(`/api/news/${id}`);
    }
}
