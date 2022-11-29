import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder,  FormControl,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ChartConfiguration } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
import { ContactListType, FilterWeekDays } from 'src/app/models/ContactListType';
import { MessageSendType, MessageType } from 'src/app/models/MessageType';
import { selectMessages } from 'src/app/redux/selectors.store';
import { MessageService } from 'src/app/services/message.service';
import { ChartTemplate } from 'src/app/shared/helpers/chart-template';
import { colorsChart } from 'src/app/variables/charts';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReponseWrapper } from 'src/app/models/response-api-default';

@Component({
  selector: 'dsw-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit, AfterViewInit {
  showInputImage = false;


  @ViewChild('fileUpload') fileUpload: ElementRef<HTMLInputElement>;
  @ViewChild('importBox') importBox: ElementRef<HTMLDivElement>;
  files: File[] = [];
  fileAccept = 'image';
  fileReader = new FileReader();
 
  constructor(private store: Store,
              private router: Router,
              private fb: FormBuilder,
              private messageService: MessageService,
              private toastr: ToastrService,
              public activeModal: NgbActiveModal

              ) 
  {
    const msg = sessionStorage.getItem('MSG');
    if (msg) {
      this.item = JSON.parse(msg);
    }
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
  paramName:boolean = false;
 
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
    inputParam: new FormArray([]),
    inputNameProduct: [''],
    inputData: [''],
    inputMaxDays:[''],
    inputMinDays:['']
  })

  setParams(){
     this.listMsg.forEach( msg => {
       if(msg.id == this.msgForm.controls.inputListMsg.value){
        this.inputParam.clear()
        this.params = []
        msg.params.forEach( param => this.pushParam(param)) 
        this.nameTemplate = msg.title;
        this.message = msg.message;
       }
     })
  }

  pushParam(param) {
    if (param === 'image') {
      this.showInputImage = true;
    }
    if (param !== 'name') {
      this.inputParam.push( new FormControl(null, [Validators.required] ))
      this.params.push(param);
    } else {
      this.paramName = true;
    }
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
  
  sendMessage() {
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
        this.closeModal();
        this.activeModal.close();
        this.toastr.success('Mensagem enviada com sucesso!');
      });
    } else{
      this.toastr.error('Preencha os campos obrigatórios.');
    }
  }

 showCountToSendMessage() {
    if (this.msgForm.valid) {
      // this.sendFile();
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

  close() {
    this.activeModal.close();
  }








  

  ngAfterViewInit(): void {
    this.fileUpload.nativeElement.addEventListener('change', this.onSelectFile.bind(this))

    this.importBox.nativeElement.addEventListener('dragenter', this.dragenter.bind(this));
    this.importBox.nativeElement.addEventListener('dragover', this.dragover.bind(this));
    this.importBox.nativeElement.addEventListener('dragleave', this.dragleave.bind(this));
    this.importBox.nativeElement.addEventListener('drop', this.drop.bind(this));

  }

  sendFile() {
    if (this.showInputImage) {
      const formData = new FormData();

      this.files.forEach(file => {
        formData.append('file', file);
        this.messageService.ImportImage(formData)
        .pipe<any>(catchError<any, any>(e => {
          this.toastr.error('Não foi possivel importar o arquivo, entre em contato com suporte.');
          return e;
        }))
        .subscribe(res => {
          this.msgForm.get('inputParam').get('0').setValue(res?.url);
          // this.resetImport();
          this.showCountToSendMessage();
        });
      });
    } else {
      this.showCountToSendMessage();
    }
  }

  resetImport(){
    this.fileUpload.nativeElement.files = undefined;
    this.files = [];
  }

  onSelectFile(_: InputEvent) {
    this.files = Object.values(this.fileUpload.nativeElement.files);
  }

  openFileUpload() {
    this.fileUpload.nativeElement.click();
  }

  dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  dragover(e) {
    e.stopPropagation();
    e.preventDefault();
    this.importBox?.nativeElement?.classList.add('drag-over');
  }

  dragleave(_) {
    this.importBox?.nativeElement?.classList.remove('drag-over');
  }

  drop(e) {
    e.stopPropagation();
    e.preventDefault();
    this.importBox?.nativeElement?.classList.remove('drag-over');
    const dt = e.dataTransfer as DataTransfer;
    console.log(dt.files);
    const filesValidated = Object.values(dt.files).filter(item => item.type.includes(this.fileAccept));
    if (!filesValidated.length) {
      return this.toastr.error('Apenas .csv podem ser importados!');
    }

    this.files = filesValidated;
  }
}

