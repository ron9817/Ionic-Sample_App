import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
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
  // authenticationState = new BehaviorSubject(false);

  constructor(private http:HttpClient, private storage: Storage) { 
    // this.checkToken();
  }
  // async checkToken() {
  //   await this.storage.get(TOKEN_KEY).then(res => {
  //     if (res) {
  //       this.authenticationState.next(true);
  //     }
  //   });
  // }
  register(data): Observable<any>{
    // const data={a:1};
    return this.http.post<any>(this._url+"register",data)
                    .catch(this.errorHandler);
  }
  login(data){
    // const data={a:1};

    var api_output=this.http.post<any>(this._url+"log-in",data)
    .catch(this.errorHandler);
    api_output.subscribe(data=>{
      if(data.resp==1){
        this.storage.set(TOKEN_KEY, 'Bearer '+data.accessToken);
        // .then(() => {
        //   this.authenticationState.next(true);
        // });
      }
    });
    return api_output;
  }
  logout() {
    return this.storage.remove(TOKEN_KEY);
    // .then(() => {
      // this.authenticationState.next(false);
    // });
  }

  home(){
    return this.storage.get(TOKEN_KEY).then(res => {
      if(res){
        const httpOptions={
          headers:new HttpHeaders({
            'Authorization':res
          })
        }
        return this.http.get<any>(this._url+"home",httpOptions).catch(this.errorHandler);
      }
      return this.http.get<any>(this._url+"home").catch(this.errorHandler);
    });
  }
 
  isAuthenticated() {
    
    return this.storage.get(TOKEN_KEY).then(res => {
          if (res) {
            console.log("res");
            console.log(res);
            return true;
          }
          return false;
        });
    
  }

  errorHandler(error: HttpErrorResponse){
    return Observable.throw(error.message || "Server Error");
  }


}



// import { IEmployee } from './employee';
// private _url: string = "/assets/data/employees.json";