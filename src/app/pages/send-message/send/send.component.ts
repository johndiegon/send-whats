import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ContactListType } from 'src/app/models/ContactListType';
import { MessageType } from 'src/app/models/MessageType';
import { selectClient, selectMessages } from 'src/app/redux/selectors.store';

@Component({
  selector: 'dsw-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {

  constructor(private store: Store,
              private router: Router,
              private fb: FormBuilder
              ) 
  {
    const nav = this.router.getCurrentNavigation();
    this.item = nav.extras.state.item;
    console.log(this.item)
  }
  
  listMsg: MessageType[] = [];
  idSelected:string;
  showParamData:boolean = false;
  showParamCupon:boolean = false;
  showParamProduct:boolean = false;
  showParamOrder:boolean = false;
  item:ContactListType;


  ngOnInit(): void {
    
    // this.msgForm.controls.inputListMsg.valueChanges.subscribe(_ => {this.setParams()})
    this.store.select(selectMessages).subscribe(messages => {
      this.listMsg = messages;
    });
  }

  msgForm = this.fb.group({
    listSend: ['', Validators.required],
    numberWhatsApp: ['', Validators.required],
    msgTemplate: [''],
    inputListMsg: ['', Validators.required],
    image: ['']
  })

  setParams(){
     var params:string[];
     this.listMsg.forEach( msg => {
       if(msg.id == this.msgForm.controls.inputListMsg.value){
         params = msg.params;
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

  selectMsgTemplate() {
    // const index = this.msgForm?.value?.msgTemplate;
    // const msgTemplate = this.listMsg[index];

    // this.msgForm.patchValue({
    //   msg: msgTemplate?.message,
    //   image: msgTemplate?.picture
    // })
  }

  setShowParams(params:string[]){
     params.forEach(param => {
       if(param == "data")
       {
         this.showParamData = true;
       }
       if(param == "order")
       {
         this.showParamOrder = true;
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

  }

}

