import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
 
const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _url="http://localhost:9090/";
  authenticationState = new BehaviorSubject(false);

  constructor(private http:HttpClient, private storage: Storage, private plt: Platform) { 
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }
  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    })
  }
  register(data): Observable<any>{
    // const data={a:1};
    return this.http.post<any>(this._url+"register",data)
                    .catch(this.errorHandler);
  }
  login(data): Observable<any>{
    // const data={a:1};
    return this.http.post<any>(this._url+"log-in",data)
                    .catch(this.errorHandler);
  }
  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }


}



// import { IEmployee } from './employee';
// private _url: string = "/assets/data/employees.json";