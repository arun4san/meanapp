import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

    getFilteredObject (url: any,data: any) {
        let body = JSON.stringify({ data });
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(url, JSON.stringify(data), {headers: headers})
            .map(res => res.json());
      }

}
