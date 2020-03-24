import { Component, OnInit } from '@angular/core';
import { AuthService } from './../src/auth.service';
import {Router} from "@angular/router";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userName:string;
  firstName:string;
  lastName:string;
  address:string;
  gender:string;

  constructor(private _authService:AuthService, private router: Router, private toastController: ToastController) {}

  ngOnInit(){
    this._authService.home().then(res=>{
      res.subscribe(data => {
        console.log(data);
        if(data.resp==1){
          this.userName=data.data.userName;
          this.firstName=data.data.firstName;
          this.lastName=data.data.lastName;
          this.address=data.data.address;
          if(data.data.gender==1){
            this.gender="Male";
          }else if(data.data.gender==2){
            this.gender="Female";
          }
        }else{
          this.presentToast("Login first");
          this.router.navigate(['/login']);
        }
        
      });
    });
  }

  logout(){
    this._authService.logout();
    this.router.navigate(['/login']);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color:"primary"
    });
    toast.present();
  }
  

}
