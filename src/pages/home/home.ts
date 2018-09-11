import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocialLoginServicesProvider } from '../../providers/social-login-services/social-login-services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private socialLoginProviderService:SocialLoginServicesProvider) {

  }
  facebookLogin(){
    this.socialLoginProviderService.facebookLogin().then(data => {
        
      if (data.token) {
        let authToken = data.token;
        localStorage.setItem('authData', authToken);
        localStorage.setItem('loginFrom', "cordovaFacebook");
        //this.alreadyRegistreduserHandler(data.isNewUser)
      }
     
     else {
      //this.helper.presentToast(data.message);
     
    }
  }).catch(error => { 
    //this.helper.showError(error);
  });
  }
  googlePlusLogin(){
    this.socialLoginProviderService.googleLogin().then(data => {
      // this.loading.dismiss();
      
        if (data.token) { 
          localStorage.setItem('authData', data.token);
          localStorage.setItem('loginFrom', "cordovaGoogle");
          //this.alreadyRegistreduserHandler(data.isNewUser)
        } 
      //this.helper.presentToast(data.msg);
     
    }).catch(error => {
      
      //this.helper.showError(error);
     
    });
  }
  linkedinLogin(){
    this.socialLoginProviderService.loginwithlinkedIn().then(data => {
      if (data.token) {
          let authToken = data.token;
          localStorage.setItem('authData', authToken);
          localStorage.setItem('loginFrom', "Linkedin");
          //this.alreadyRegistreduserHandler(data.isNewUser)
      } else {
        //this.helper.presentToast(data.message);
      }
    }).catch(error => {
    //   let alert = this.alertCtrl.create({
    //     message: error.message,
    //     buttons: [
    //       {
    //         text: "Ok",
    //         role: 'cancel'
    //       }
    //     ]
    //   });
    //   alert.present();
     });
  }
}
