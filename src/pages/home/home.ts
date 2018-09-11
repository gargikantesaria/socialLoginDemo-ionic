import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SocialLoginServicesProvider } from '../../providers/social-login-services/social-login-services';
import { HelperProvider } from '../../providers/helper/helper';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private socialLoginProviderService: SocialLoginServicesProvider, private helper: HelperProvider) {

  }
  facebookLogin() {
    this.socialLoginProviderService.facebookLogin().then(data => {
      if (data.token) {
        let authToken = data.token;
        localStorage.setItem('authData', authToken);
        localStorage.setItem('loginFrom', "cordovaFacebook");
      }

      else {
        this.helper.presentToast(data.message);

      }
    }).catch(error => {
      this.helper.showError(error);
    });
  }
  googlePlusLogin() {
    this.socialLoginProviderService.googleLogin().then(data => {
      this.helper.hideLoading();

      if (data.token) {
        localStorage.setItem('authData', data.token);
        localStorage.setItem('loginFrom', "cordovaGoogle");

      }
      this.helper.presentToast(data.msg);

    }).catch(error => {

      this.helper.showError(error);

    });
  }
  linkedinLogin() {
    this.socialLoginProviderService.loginwithlinkedIn().then(data => {
      if (data.token) {
        let authToken = data.token;
        localStorage.setItem('authData', authToken);
        localStorage.setItem('loginFrom', "Linkedin");
      } else {
        this.helper.presentToast(data.message);
      }
    }).catch(error => {
      this.helper.showError(error);
    });
  }
}
