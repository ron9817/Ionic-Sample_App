import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './src/auth.service';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(public auth: AuthService, private router: Router, private toastController: ToastController){}
  
  canActivate(): Promise <boolean> {
    return this.auth.isAuthenticated().then(data=>{
      if(data)
    {
      this.presentToast("Already Logged in");
      this.router.navigate(['home']);
      return false;
    }
    return true;
    });
    
    
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
