import { Component, OnInit } from '@angular/core';
import { AuthService } from './../src/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userName:string="";

  constructor(private _authService:AuthService) {}

  ngOnInit(){
    this._authService.home().then(res=>{
      res.subscribe(data => {
        this.userName=data.userName;
      });  
    });
  }
  

}
