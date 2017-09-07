import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpErrorService } from './http-error.service';

@Injectable()
export class DatabaseService {

    private databasesUrl = 'databases';

    constructor (private http: Http, private httpErrorService: HttpErrorService) {}

    get(): Observable<Array<any> > {
        return this.http.get(this.databasesUrl)
                        .map(res => res.json())
                        .catch(this.httpErrorService.handleError);
    }

}
