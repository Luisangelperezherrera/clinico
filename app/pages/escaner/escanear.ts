import { Component, NgZone } from '@angular/core';
import { NavController, Platform, AlertController} from 'ionic-angular';
import {Http, Headers, RequestOptions,Response} from '@angular/http';
import { DetallePaciente } from '../detalle_paciente/detalle_paciente';
import {TabsPage} from '../tabs-detalle/tabs-detalle';
import * as services from '../services/services';
declare var estimote: any;

@Component({
  templateUrl: 'build/pages/escaner/escanear.html'
})
export class Escaner {
  timerInterval: number;
  constructor(public nav: NavController, public platform : Platform, public http:Http, public alertCtrl: AlertController) {
    this.platform = platform;
    this.platform.ready().then(()=>{
      this.start();
    });
  }

  start(){
    this.timerInterval = setInterval(()=> this.scanSticker(), 100);
  }

  stopInterval(){
    console.log("stop interval");
    clearInterval(this.timerInterval);
  }

  scanSticker(){
    var that = this;


    /*that.stopInterval();
    that.changePage({});*/

    function filterSticker(regionState){

      if(regionState.isMoving){
        return true;
      }
      return false;
    }

    function onError(errorMessage){
      console.log('Monitor error: ' + errorMessage);
    }

    function displayRegionInfo(regionState)
    {
      console.log("Encontrado");
      console.log(JSON.stringify(regionState));
      for(var i=0; i<regionState.length; i++){
        that.invocaService(regionState[i].identifier);
        /*if(regionState[i].identifier == "53d14205c294e990"){
          that.stopInterval();
          estimote.nearables.stopRangingForType(estimote.nearables.NearableTypeAll);
          that.changePage(regionState[i]);
        }*/
      }
      /*that.nav.setRoot(DetallePaciente,{
      });
      that.stopInterval();
      estimote.nearables.stopRangingForType(estimote.nearables.NearableTypeAll);*/
    };

    console.log("Invocando servicio");

    estimote.nearables.startRangingForType(
          estimote.nearables.NearableTypeAll,
          displayRegionInfo,
          onError);
  }

  stopRangin(){
    estimote.nearables.stopRangingForType(estimote.nearables.NearableTypeAll);
  }

  invocaService(object){
    console.log("invoca service");
    console.log(object);
    var headers = new Headers();
    headers.append('Test', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    var serUrl = "http://10.30.5.83:3000/werable/"+object;
    console.log(serUrl);
    this.http.get(serUrl,{headers:headers})
    .subscribe(
      data => this.changePage(data),
      err => console.log('Error Service'),
      () => console.log('catalogo complete..'));
  }

  changePage(object){
    console.log(object);
    var contact = JSON.parse(object._body);
    var d = contact.result;
    console.log("d->");
    console.log(d);
    if(d.length>0){
      this.stopInterval();
      this.stopRangin();
      console.log(d[0]);
      let alert = this.alertCtrl.create({
            title: 'Dispositivo Encontrado!',
            subTitle: 'Se ha encontrado informacion del paciente!',
            buttons:[{
              text: 'Aceptar',
              handler: data => {
                this.stopInterval();
                this.stopRangin();
                this.nav.setRoot(DetallePaciente,{
                  result:d[0]
                });
              }
            }]
          });
          alert.present();
      }
  }
}
