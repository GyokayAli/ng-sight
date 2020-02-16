import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { ServerMessage } from '../shared/server-message';
import { Server } from '../shared/server';
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private _http: Http) {
    this.headers = new Headers({
      'Content-type' : 'application/json',
      'Accept' : 'q=0.8;application/json;q=0.9'
    });

    this.options = new RequestOptions({
      headers: this.headers
    });
  }

  options: RequestOptions;
  headers: Headers;

  getServers(): Observable<Server[]> {
    return this._http.get('http://localhost:5000/api/server')
      .pipe(map((res: any) => res.json()),
      catchError( err => {
        return this.handleError(err);
      })
    );
  }

  handleServerMessage(msg: ServerMessage): Observable<Response> {
    const url = 'http://localhost:5000/api/server/' + msg.id;

    return this._http.put(url, msg, this.options)
      .pipe(map((res: any) => res.json()),
      catchError( err => {
        return this.handleError(err);
      })
    );
  }

  handleError(error: any) {
    const errMsg = (error.message) ? error.message :
                    error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    console.log(errMsg);
    return Observable.throw(errMsg);
  }
}
