import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { LinkedIn } from '@ionic-native/linkedin';
@Injectable()
export class SocialLoginServicesProvider {
  scopes: any = ['r_basicprofile', 'r_emailaddress'];
  constructor(public http: HttpClient, private facebook:Facebook, private googlePlus:GooglePlus,private linkedin: LinkedIn) {
    console.log('Hello SocialLoginServicesProvider Provider');
  }

  facebookLogin(): Promise<any> {
    return new Promise(resolve => {

        this.facebook.login(['public_profile'])
            .then((res: FacebookLoginResponse) => {

                this.facebook.api('me?fields=last_name,first_name', []).then((response) => {
                  console.log("facebook response is" , response)
                    // this.socialData.provider = "Facebook";
                    // this.socialData.firstName = response.first_name;
                    // this.socialData.lastName = response.last_name;
                    // this.socialData.socialInfo.accessToken = res.authResponse.accessToken;
                    // this.socialData.socialInfo.id = res.authResponse.userID;
                    // this.socialData.deviceId = this.getDeviceData();
                    // this.http.post(this.config.API_ENDPOINT + "/user/authenticate-provider", this.socialData).subscribe((data: any) => {
                    //    resolve(data);
                    }).catch(e => {
                      console.log("error in fb", e)
                      //UtilHelper.print('Error logging into Facebook' + JSON.stringify(e)));
                  });
                }).catch(e => {
                  console.log("error in fb", e)
                  //UtilHelper.print('Error logging into Facebook' + JSON.stringify(e)));
              });
    })
  }
  googleLogin(): Promise<any> {
    return new Promise((resolve, reject) => {
        this.googlePlus.login({
            'scopes': 'profile',
            'webClientId': 'YOUR_APP_ID'
        }).then(res => {
           console.log("Google response", res)
            // this.socialData.provider = "Google";
            // this.socialData.firstName = res.givenName;
            // this.socialData.lastName = res.familyName;
            // this.socialData.socialInfo.accessToken = res.idToken;
            // this.socialData.socialInfo.id = res.userId;
            // this.socialData.deviceId = this.getDeviceData();
            // this.http.post(this.config.API_ENDPOINT + "/user/authenticate-provider", this.socialData).subscribe((data: any) => {
            //     resolve(data);
            },err => {
              console.log("error from google", err)
                //reject(err);
                
            });
        }).catch(err => {
            //(err);
            //UtilHelper.print("Error : " + err)
            
      });
  }

  async getSelfData(): Promise<any> {
    return new Promise(resolve => {
        this.linkedin.getRequest('people/~')
            .then(res => {
                console.log(res);
                resolve(res);
            }).catch(e => {}
              // UtilHelper.print(e)
            );
    })
}

  loginwithlinkedIn(): Promise<any> {
    return new Promise(resolve => {
        console.log(this.linkedin);
        this.linkedin.getActiveSession().then((active) => {
         
            if (active) {
                //this.isLoggedIn = true;
                this.getSelfData().then((data) => {
                    console.log("data from linkedin is", data)
                    // this.socialData.provider = "LinkedIn";
                    // this.socialData.firstName = data.firstName;
                    // this.socialData.lastName = data.lastName;
                    // this.socialData.socialInfo.accessToken = active.accessToken;
                    // this.socialData.socialInfo.id = data.id;
                    // this.socialData.deviceId = this.getDeviceData();
                    // this.http.post(this.config.API_ENDPOINT + "/user/authenticate-provider", this.socialData).subscribe((data: any) => {
                    //     UtilHelper.print(data);
                    //     resolve(data);
                    // });
                }).catch((err) => {
                    console.log("from get self data",err);
                })
            }
            else {
                this.linkedin.login(this.scopes, true)
                    .then(() => {
                        this.linkedin.getActiveSession().then((active) => {
                           
                            //this.isLoggedIn = true;
                            this.getSelfData().then((data) => {
                              console.log("data from linkedin is", data)
                                // this.socialData.provider = "LinkedIn";
                                // this.socialData.firstName = data.firstName;
                                // this.socialData.lastName = data.lastName;
                                // this.socialData.socialInfo.accessToken = active.accessToken;
                                // this.socialData.socialInfo.id = data.id;
                                // this.socialData.deviceId = this.getDeviceData();
                                // this.http.post(this.config.API_ENDPOINT + "/user/authenticate-provider", this.socialData).subscribe((data: any) => {
                                //     UtilHelper.print(data);
                                //     resolve(data);
                                // });
                            }).catch((err) => {
                                console.log("from second data",err);
                            })
                        })
                    }).catch(e => {
                        //UtilHelper.print('Error logging in' + e);
                        resolve(e);
                    });
            }
        }).catch(err => {
            console.log("from main",err);
        })

    });
}
}
