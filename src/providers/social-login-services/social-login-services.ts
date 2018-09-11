import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { LinkedIn } from '@ionic-native/linkedin';
import { HelperProvider } from '../helper/helper';
@Injectable()
export class SocialLoginServicesProvider {
  scopes: any = ['r_basicprofile', 'r_emailaddress'];
  constructor(public http: HttpClient, private facebook:Facebook, private googlePlus:GooglePlus,private linkedin: LinkedIn, private helper:HelperProvider) { }

  facebookLogin(): Promise<any> {
    return new Promise(resolve => {

        this.facebook.login(['public_profile'])
            .then((res: FacebookLoginResponse) => {

                this.facebook.api('me?fields=last_name,first_name', []).then((response) => {
                    resolve(response);
                    }).catch(e => {
                      this.helper.showError(e);
                  });
                }).catch(e => {
                  this.helper.showError(e);
              });
    })
  }
  googleLogin(): Promise<any> {
    return new Promise((resolve, reject) => {
        this.googlePlus.login({
            'scopes': 'profile',
            'webClientId': 'YOUR_APP_ID'
        }).then(res => {
              resolve(res);
            },err => {
              this.helper.showError(err);   
                reject(err);
            });
        }).catch(err => { 
            this.helper.showError(err);       
      });
  }

  async getSelfData(): Promise<any> {
    return new Promise(resolve => {
        this.linkedin.getRequest('people/~')
            .then(res => {
                resolve(res);
            }).catch(e => {
              this.helper.showError(e);   
            });
    })
}

  loginwithlinkedIn(): Promise<any> {
    return new Promise(resolve => {
        this.linkedin.getActiveSession().then((active) => {
         
            if (active) {
                
                this.getSelfData().then((data) => {
                    resolve(data);
                }).catch((err) => {
                    this.helper.showError(err);
                })
            }
            else {
                this.linkedin.login(this.scopes, true)
                    .then(() => {
                        this.linkedin.getActiveSession().then((active) => {
                           
                            
                            this.getSelfData().then((data) => {
                                  resolve(data);
                                
                            }).catch((err) => {
                                this.helper.showError(err);
                                
                            })
                        })
                    }).catch(e => {
                        this.helper.showError(e);
                        resolve(e);
                    });
            }
        }).catch(err => {
            this.helper.showError(err);
        })

    });
}
}
