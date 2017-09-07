import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpErrorService } from './http-error.service';

@Injectable()
export class CollectionService {

    private collectionsUrl = 'collections/';
    private countUrl = 'count/';
    private findUrl = 'find/';
    private findExportUrl = 'export/find/';
    private aggregateUrl = 'aggregate/';
    private aggregateExportUrl = 'export/aggregate/';

    constructor (private http: Http, private httpErrorService: HttpErrorService) {}

    get(database: string): Observable<Array<any>> {
        return this.http.get(this.collectionsUrl + database)
                        .map(res => res.json())
                        .catch(this.httpErrorService.handleError);
    }
    count(database: string, collection: string): Observable<number> {
        return this.http.get(this.countUrl + database + '/' + collection)
                        .map(res => res.json())
                        .catch(this.httpErrorService.handleError);
    }
    find(database: string, collection: string, skip: number, limit: number, query?: string): Observable<Array<any>> {
        return this.http.get(this.findUrl + database + '/' + collection + '/' + skip + '/' + limit + (query ? '/' + query : ''))
                        .map(res => res.json())
                        .catch(this.httpErrorService.handleError);
    }
    findExport(database: string, collection: string, query?: string): Observable<Array<any>> {
        return this.http.get(this.findExportUrl + database + '/' + collection + (query ? '/' + query : ''))
                        .map(res => res.json())
                        .catch(this.httpErrorService.handleError);
    }
    aggregate(database: string, collection: string, skip: number, limit: number, query?: string): Observable<Array<any>> {
        return this.http.get(this.aggregateUrl + database + '/' + collection + '/' + skip + '/' + limit + (query ? '/' + query : ''))
                        .map(res => res.json())
                        .catch(this.httpErrorService.handleError);
    }
    aggregateExport(database: string, collection: string, query?: string): Observable<Array<any>> {
        return this.http.get(this.aggregateExportUrl + database + '/' + collection + (query ? '/' + query : ''))
                        .map(res => res.json())
                        .catch(this.httpErrorService.handleError);
    }


}
