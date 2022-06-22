import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { ContactListType } from 'src/app/models/ContactListType';
import { MessageSendType, MessageType } from 'src/app/models/MessageType';
import { selectClient, selectMessages } from 'src/app/redux/selectors.store';
import { MessageService } from 'src/app/services/message.service';

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


  ngOnInit(): void {
    
    this.store.select(selectMessages).subscribe(messages => {
      this.listMsg = messages;
    });

    if(this.item.orign == 'order')
    {
      this.showParamOrder = true;
    }
  }

  msgForm = this.fb.group({
    msgTemplate: [''],
    inpuCountMenssage: ['', Validators.required],
    inputListMsg: ['', Validators.required],
    inputCountOrders: [''],
    inputParamCupon: [''],
    inputNameProduct: [''],
    inputData: [''],
  })

  setParams(){
     var params:string[];
     this.listMsg.forEach( msg => {
       if(msg.id == this.msgForm.controls.inputListMsg.value){
         params = msg.params;
         this.nameTemplate = msg.title;
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
    
    if(this.msgForm.valid)
    {
      var msgToSend : MessageSendType = {
        message : this.nameTemplate,
        idList : this.item.id
       
      };
     
      if(this.msgForm.controls.inpuCountMenssage.value){
        msgToSend.countMessages = this.msgForm.controls.inpuCountMenssage.value; 
      }

      if(this.msgForm.controls.inputCountOrders.value){
        msgToSend.countMinOrder  =this.msgForm.controls.inputCountOrders.value; 
      }

      if(this.msgForm.controls.inputParamCupon.value){
        msgToSend.cupom = this.msgForm.controls.inputParamCupon.value;
      }

      if(this.msgForm.controls.inputNameProduct.value){
        msgToSend.nameOfProduct = this.msgForm.controls.inputNameProduct.value;
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
}

