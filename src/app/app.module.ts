import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SocialLoginServicesProvider } from '../providers/social-login-services/social-login-services';
import { Facebook } from '@ionic-native/facebook';
import {HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { GooglePlus } from '@ionic-native/google-plus';
import { LinkedIn } from '@ionic-native/linkedin';
import { HelperProvider } from '../providers/helper/helper';
@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,HttpModule,HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,Facebook,GooglePlus,LinkedIn,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SocialLoginServicesProvider,
    HelperProvider
  ]
})
export class AppModule {}
