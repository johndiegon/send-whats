import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FailedToNegotiateWithServerError } from '@microsoft/signalr/dist/esm/Errors';
import { Store } from '@ngrx/store';
import { ChartConfiguration } from 'chart.js';
import { debug } from 'console';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { ContactListType, FilterWeekDays } from 'src/app/models/ContactListType';
import { MessageSendType, MessageType } from 'src/app/models/MessageType';
import { selectClient, selectMessages } from 'src/app/redux/selectors.store';
import { MessageService } from 'src/app/services/message.service';
import { ChartTemplate } from 'src/app/shared/helpers/chart-template';
import { colorsChart } from 'src/app/variables/charts';

@Component({
  selector: 'dsw-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {

 
  constructor(private store: Store,
              private router: Router,
              private fb: FormBuilder,
              private messageService: MessageService,
              private toastr: ToastrService,
              ) 
  {
    const nav = this.router.getCurrentNavigation();
    this.item = nav.extras.state.item;
    
  }
  
  listMsg: MessageType[] = [];
  idSelected:string;
  showParamData:boolean = false;
  showParamCupon:boolean = false;
  showParamProduct:boolean = false;
  showParamOrder:boolean = false;
  item:ContactListType;
  nameTemplate:string;
  message:string
  countContacts:number;
  showModal:boolean =false;
  showButton:boolean =false;
  showLoad:boolean =true;
  showProcess:boolean = false;
  params:string[] = [];
 
  config: ChartConfiguration = {
    type: 'bar',
    options: {
      tooltips: {
        mode: 'point',
      },
      legend: {
        display: false,
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 16
        }
      }
    },
    data: {
      labels: [],
      datasets: [{
        label: 'Qtd de Pedidos',
        data: [],
        backgroundColor: []
      }]
    }
  };
  
  private _chart: ChartTemplate;
  _typeDatas = [
    { type: 'ordersOnSunday', label: 'Domingo', color: colorsChart.theme['success'] },
    { type: 'ordersOnMonday', label: 'Segunda-feira', color: colorsChart.theme['success'] },
    { type: 'ordersOnTuesday', label: 'Terça-feira', color: colorsChart.theme['success'] },
    { type: 'ordersOnWednesday', label: 'Quarta-feira', color: colorsChart.theme['success'] },
    { type: 'ordersOnThursday', label: 'Quinta-feira', color: colorsChart.theme['success'] },
    { type: 'ordersOnFriday', label: 'Sexta-feira', color: colorsChart.theme['success'] },
    { type: 'ordersOnSaturday', label: 'Sadabo', color: colorsChart.theme['success'] }
  ]

  ngOnInit(): void {
    
    this.store.select(selectMessages).subscribe(messages => {
      this.listMsg = messages;
    });
    

  }

  msgForm = this.fb.group({
    msgTemplate: [''],
    inpuCountMenssage: [''],
    inputListMsg: ['', Validators.required],
    inputFilterDays :[''],
    inputMaxCountOrders: [''],
    inputMinCountOrders: [''],
    // inputParam: new FormArray([]),
    inputNameProduct: [''],
    inputData: [''],
    inputMaxDays:[''],
    inputMinDays:['']
  })

  setParams(){
     this.listMsg.forEach( msg => {
       if(msg.id == this.msgForm.controls.inputListMsg.value){
        // msg.params.forEach( param => this.inputParam.push( new FormControl(null, [Validators.required] ))) 
        this.params = msg.params;
        this.nameTemplate = msg.title;
        this.message = msg.message
       }
     })
  }

  get inputParam(): FormArray {
    return this.msgForm.get('inputParam') as FormArray;
  }

  validator(control) {
    const validator = this.msgForm.get(control).validator({} as AbstractControl);
    if (validator && validator.required) {
      return true;
    }
  }
  
  sendMessage(){
    if(this.msgForm.valid)
    {
      this.showModalProcess()
      var msgTosend = this.getParam();
      this.messageService.send(msgTosend)
      .pipe(catchError(error => {
        this.toastr.error('Erro ao enviar mensagem para a lista!');
        return throwError(() => new Error(error.message));
      }))
      .subscribe( res=> {
        this.closeModal()
        this.toastr.success('Mensagem enviada com sucesso!');
      });
    } else{
      this.toastr.error('Preencha os campos obrigatórios.');
    }
  }

 showCountToSendMessage(){
  debugger
    if(this.msgForm.valid)
    {
      this.openModal()
      var msgTosend = this.getParam();
      this.messageService.getCount(msgTosend)
      .pipe(catchError(error => {
        this.toastr.error('Erro ao enviar mensagem para a lista!');
        return throwError(() => new Error(error.message));
      }))
      .subscribe( res => {
        this.showButton = true;
        this.showLoad = false;
        this.countContacts= res.total;
        });
    } else{
      this.toastr.error('Preencha os campos obrigatórios.');
    }
  }

  getParam(): MessageSendType{
    var msgToSend : MessageSendType = {
      template:this.nameTemplate,
      params:[]
    };
     msgToSend.params.push({
        name : 'listName',
        value : this.item.name
      });

    if(this.item.unity){
      msgToSend.params.push({
        name : 'unity',
        value : this.item.unity
      });
    }
    
    if(this.item.type){
      msgToSend.params.push({
        name : 'typeList',
        value : this.item.type.toString()
      });
    }

    if(this.msgForm.controls.inpuCountMenssage.value){
      msgToSend.params.push({
        name : 'countMessages',
        value : this.msgForm.controls.inpuCountMenssage.value.toString()
      });
    }

     if(this.msgForm.controls.inputFilterDays.value){
      msgToSend.params.push({
        name : 'inputFilterDays',
        value : this.msgForm.controls.inputFilterDays.value.toString()
      });
     }

     if(this.msgForm.controls.inputMaxCountOrders.value){
      msgToSend.params.push({
        name : 'inputMaxCountOrders',
        value : this.msgForm.controls.inputMaxCountOrders.value.toString()
      });
     }

     if(this.msgForm.controls.inputMinCountOrders.value){
      msgToSend.params.push({
        name : 'inputMinCountOrders',
        value : this.msgForm.controls.inputMinCountOrders.value.toString()
      });
     }

     if(this.msgForm.controls.inputParam){
      const control = <FormArray>this.msgForm.get('inputParam');
      debugger
     }

     if(this.msgForm.controls.inputNameProduct.value){
      msgToSend.params.push({
        name : 'inputNameProduct',
        value : this.msgForm.controls.inputNameProduct.value.toString()
      });
     }

     if(this.msgForm.controls.inputData.value){
      msgToSend.params.push({
        name : 'inputData',
        value : this.msgForm.controls.inputData.value.toString()
      });
     }

     if(this.msgForm.controls.inputMinDays.value){
      msgToSend.params.push({
        name : 'inputMinDays',
        value : this.msgForm.controls.inputMinDays.value.toString()
      });
     }

     if(this.msgForm.controls.inputMaxDays.value){
      msgToSend.params.push({
        name : 'inputMaxDays',
        value : this.msgForm.controls.inputMaxDays.value.toString()
      });
     }
     return msgToSend;
  }

  getCountDasy(date){
    var dateFrom = new Date(date)
    var dateNow = new Date(Date.now())
    var timeDiff = Math.abs(dateFrom.getTime() - dateNow.getTime());
    return Math.ceil(timeDiff / (1000 * 3600 * 24)); 
  }
  
  getStringFilterDay(filterDays){
    switch(filterDays){
      case FilterWeekDays.JustDay:
        return "durante o dia.";
        break;
      case FilterWeekDays.JustNight:
        return "durante a noite.";
        break;
      case FilterWeekDays.JustWeeKend:
        return "de sexta a domingo.";
        break;
      case FilterWeekDays.JustWeek:
        return "de segunda a quinta.";
        break;
    }
  }

  openModal() {
    this.countContacts = null;
    this.showButton =false;
    this.showLoad =true;
    this.showProcess = false;
    this.showModal = true;
  }  

  closeModal() {
    this.showButton = true;
    this.showLoad = false;
    this.showProcess = false;
    this.showModal = false;
  }
  showModalProcess(){
    this.showButton = false;
    this.showLoad = false;
    this.showProcess = true;
  }

}

