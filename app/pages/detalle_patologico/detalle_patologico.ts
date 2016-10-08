import { Component, NgZone } from '@angular/core';
import { NavController, Platform} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/detalle_patologico/detalle_patologico.html'
})
export class PatologicosPaciente{

  constructor(public navCtrl: NavController, public platform : Platform, public zone :NgZone){

  }
}
