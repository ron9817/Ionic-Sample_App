import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _url="";

  constructor(private http:HttpClient) { }

  getEmployees(): Observable<any[]>{
    return this.http.get<any[]>(this._url)
                    .catch(this.errorHandler);
  }
  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }


}



// import { IEmployee } from './employee';
// private _url: string = "/assets/data/employees.json";