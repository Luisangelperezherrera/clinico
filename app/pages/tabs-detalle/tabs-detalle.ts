import { Component, NgZone } from '@angular/core';
import {Page, NavController, Platform} from 'ionic-angular';

import {DetallePaciente} from '../detalle_paciente/detalle_paciente';
import {PatologicosPaciente} from '../detalle_patologico/detalle_patologico';

@Page({
  templateUrl: 'build/pages/tabs-detalle/tabs-detalle.html'
})
export class TabsPage {

  tab1Root: any;
  tab2Root: any;
  constructor(public navCtrl: NavController, public platform : Platform, public zone :NgZone) {
    this.tab1Root = DetallePaciente;
    this.tab2Root = PatologicosPaciente;
  }
}
