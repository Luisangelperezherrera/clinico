import {Component, NgZone} from '@angular/core';
import { NavController, Platform} from 'ionic-angular';
import { Escaner } from '../escaner/escanear';

@Component({
  templateUrl: 'build/pages/login/login.html'
})

export class Login{
    username:string;
    password:string;
    constructor(public navCtrl: NavController, public platform : Platform, public zone :NgZone){

    }

  login(credentials) {
    console.log("Credenciales Login ->");
    console.log(this.username);
    console.log(this.password);

    // this.saveJwt(null);
    var creds = JSON.stringify(credentials);

    this.navCtrl.setRoot(Escaner);

    // var headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    /*this.http.post('http://10.30.5.98:5000/config/enroll/', creds, {
      headers: headers
      })
      .map(res => res.json())
      .subscribe(
        data => this.saveJwt(data),
        err => this.logError(err),
        () => console.log('Authentication Complete')
    );*/
  }
}
