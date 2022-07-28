import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ChartConfiguration } from 'chart.js';
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
    inputParamCupon: [''],
    inputNameProduct: [''],
    inputData: [''],
    inputDays:['']
  })

  setParams(){
     var params:string[];
     this.listMsg.forEach( msg => {
       if(msg.id == this.msgForm.controls.inputListMsg.value){
         params = msg.params;
         this.nameTemplate = msg.title;
         this.message = msg.message
       }
     })
   
     this.showParamData = false;
     this.showParamCupon = false;
     this.showParamProduct = false;
     this.showParamOrder = false;

     if(params){
       this.setShowParams(params)
     }
  
  }

  setShowParams(params:string[]){
     params.forEach(param => {
       if(param == "data")
       {
         this.showParamData = true;
       }
       if(param == "product")
       {
         this.showParamProduct = true;
       }
       if(param == "cupom")
       {
         this.showParamCupon = true;
       }
     });
  }

  sendMessage(){
    debugger
    if(this.msgForm.valid)
    {
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
      
      debugger
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

       if(this.msgForm.controls.inputParamCupon.value){
        msgToSend.params.push({
          name : 'inputParamCupon',
          value : this.msgForm.controls.inputParamCupon.value.toString()
        });
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

       if(this.msgForm.controls.inputDays.value){
        msgToSend.params.push({
          name : 'inputDays',
          value : this.msgForm.controls.inputDays.value.toString()
        });
       }
      

      this.messageService.send(msgToSend)
      .pipe(catchError(error => {
        this.toastr.error('Erro ao enviar mensagem para a lista!');
        return throwError(() => new Error(error.message));
      }))
      .subscribe(_ => {
        this.toastr.success('Mensagem enviada com sucesso!');
      });
    } else{
      this.toastr.error('Preencha os campos obrigatórios.');
    }
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
}

