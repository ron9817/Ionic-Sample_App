import { Component, OnInit } from '@angular/core';
import { AuthService } from './../src/auth.service';
import {Router} from "@angular/router";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private _authService:AuthService, private router: Router, private toastController: ToastController) { }

  firstName:string;
  lastName:string;
  password:string;
  address:string;
  userName:string;
  gender=1;
  validated_username=0;

  ngOnInit() {
  } 

  validate(){
    this._authService.validate({userName:this.userName})
        .subscribe(data => {
          this.validated_username=data.resp;
          if(data.resp==2){
            this.presentToast("Username already exists");
          }
        },
        error => console.log("error"));
  }

  register(){
    if(this.validated_username==1){
      if (!this.firstName){
        this.presentToast("Please enter first name");
      }else if (!this.lastName){
        this.presentToast("Please enter last name");
      }else if (!this.userName){
        this.presentToast("Please enter user name");
      }else if (!this.password){
        this.presentToast("Please enter password");
      }else if (!this.address){
        this.presentToast("Please enter address");
      }else{
        const data_body={
          firstName:this.firstName,
          lastName:this.lastName,
          userName:this.userName,
          password:this.password,
          address:this.address,
          gender:this.gender
        };
        this._authService.register(data_body)
          .subscribe(data => {
            if(data.resp==1){
              this.presentToast("registration successfull");
              this.router.navigate(['/login']);
            }else{
              this.presentToast("registration unsuccessfull. Try again");
            }
          },
          error => this.presentToast("registration unsuccessfull. Try again"));
        }
      }else if(this.validated_username==2){
        this.presentToast("Registration unsuccessfull. Username already exists");
      }
    
  }

  genderChange(g){
    this.gender=g;
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
