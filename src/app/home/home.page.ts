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

  userName:string="";

  constructor(private _authService:AuthService, private router: Router, private toastController: ToastController) {}

  ngOnInit(){
    this._authService.home().then(res=>{
      res.subscribe(data => {
        if(data.resp==1){
          this.userName=data.userName;
        }else{
          this.presentToast("Login first");
          this.router.navigate(['/login']);
        }
        
      });
    });
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  

}
