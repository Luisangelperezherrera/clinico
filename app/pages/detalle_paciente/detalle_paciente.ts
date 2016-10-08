import { Component, NgZone } from '@angular/core';
import { NavController, Platform, NavParams} from 'ionic-angular';
import * as services from '../services/services';
@Component({
  templateUrl: 'build/pages/detalle_paciente/detalle_paciente.html'
})
export class DetallePaciente{
    datPaciente : any;
    dPacientes: string = "generales";
    tmp :any;
    contactos: any;
    enfermedades:any;
  constructor(public navCtrl: NavController, navParams: NavParams, public platform : Platform, public zone :NgZone){
      console.log("Detalle_Paciente");
      console.log(navParams.get('result'));
      this.tmp = navParams.get('result');

      if(this.tmp.userId.genero =="M"){
        this.tmp.userId.genero ="Masculino";
      }else{
        this.tmp.userId.genero ="Femenino";
      }
      this.datPaciente = this.tmp.userId;
      this.contactos= this.datPaciente.contactos;
      this.enfermedades = this.datPaciente.patologicas;

      console.log("Enfermedades ->");
      console.log(this.enfermedades);
  }
}
