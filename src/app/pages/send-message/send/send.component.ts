import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dsw-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.msgForm.controls.inputListMsg.valueChanges.subscribe(_ => {this.setParams()})
  }

  
  setParams(){

    // var params:string[];
    // this.listMsg.forEach( msg => {
    //   debugger
    //   if(msg.id == this.msgForm.controls.inputListMsg.value){
    //     params = msg.params;
    //   }
    // })
   
    // this.showParamData = false;
    // this.showParamCupon = false;
    // this.showParamProduct = false;
    // this.showParamOrder = false;

    // if(params){
    //   this.setShowParams(params)
    // }
  
  }

  setShowParams(params:string[]){
    // debugger
    // params.forEach(param => {
    //   if(param == "data")
    //   {
    //     this.showParamData = true;
    //   }
    //   if(param == "order")
    //   {
    //     this.showParamOrder = true;
    //   }
    //   if(param == "product")
    //   {
    //     this.showParamProduct = true;
    //   }
    //   if(param == "cupom")
    //   {
    //     this.showParamCupon = false;
    //   }
    // });
  }

}

