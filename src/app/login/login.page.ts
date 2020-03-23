import { Component, OnInit } from '@angular/core';
import { AuthService } from './../src/auth.service';
import {Router} from "@angular/router";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private _authService:AuthService, private router: Router, private toastController: ToastController) { }

  userName:string;
  password:string;
  
  ngOnInit() {
  }

  login(){
    const data_body={
      userName:this.userName,
      password:this.password
    }
    console.log("Page");
    // console.log(this._authService.login(data_body));
    this._authService.login(data_body)
      .subscribe(data => {
        console.log(data.resp);
        if(data.resp==1){
          console.log(data.accessToken);
          this.presentToast("login successfull");
          this.router.navigate(['/home']);
        }else{
          this.presentToast("login unsuccessfull. Try again");
        }
      },
      error => this.presentToast("login unsuccessfull. Try again"));
    console.log(this.userName+" "+this.password);
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
