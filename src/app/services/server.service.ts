import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpErrorService } from './http-error.service';

@Injectable()
export class ServerService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private options = new RequestOptions({ headers: this.headers });
    private serverUrl = 'server';
    private serverDefaultUrl = 'server/default';

    constructor (private http: Http, private httpErrorService: HttpErrorService) {}


    changeServer(host: string, port: number, username: string, password: string): Observable<boolean> {
        return this.http.post(this.serverUrl, { host: host, port: port, username: username, password: password }, this.options)
                        .map(res => res.json())
                        .catch(this.httpErrorService.handleError);
    }

    setDefault(): Observable<boolean> {
        return this.http.post(this.serverDefaultUrl, {}, this.options)
                        .map(res => res.json())
                        .catch(this.httpErrorService.handleError);
    }


}
