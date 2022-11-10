import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ContactListService } from 'src/app/services/contact-list.service';
import { ReponseWrapper } from 'src/app/models/response-api-default';
import { catchError, map,  throwError } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'dsw-modal-import',
  templateUrl: './modal-import.component.html',
  styleUrls: ['./modal-import.component.scss']
})
export class ModalImportComponent implements OnInit, AfterViewInit {
  
  @ViewChild('fileUpload') fileUpload: ElementRef<HTMLInputElement>;
  @ViewChild('importBox') importBox: ElementRef<HTMLDivElement>;
  files: File[] = [];
  fileAccept = 'text/csv';
  fileReader = new FileReader();

  constructor(
    private toastr: ToastrService,
    private contactListService: ContactListService,
    public activeModal: NgbActiveModal
  ) { }

  ngAfterViewInit(): void {
    this.fileUpload.nativeElement.addEventListener('change', this.onSelectFile.bind(this))

    this.importBox.nativeElement.addEventListener("dragenter", this.dragenter.bind(this));
    this.importBox.nativeElement.addEventListener("dragover", this.dragover.bind(this));
    this.importBox.nativeElement.addEventListener("dragleave", this.dragleave.bind(this));
    this.importBox.nativeElement.addEventListener("drop", this.drop.bind(this));

  }
  ngOnInit(): void {
  }

  sendFile() {
    const formData = new FormData();

    this.files.forEach(file => {
      formData.append('file', file);

      this.contactListService.ImportListOrders(formData)
      .pipe(map(e => e))
      .pipe<ReponseWrapper>(catchError<any, any>(e => {
        this.toastr.error('Não foi possivel importar o arquivo, entre em contato com suporte.');
        return e;
      }))
      .subscribe(res => {
        this.toastr.success('Arquivo importado com sucesso');
        this.resetImport();
      });
    });
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

    const filesValidated = Object.values(dt.files).filter(item => this.fileAccept.includes(item.type))
    if (!filesValidated.length) {
      return this.toastr.error('Apenas .csv podem ser importados!');
    }

    this.files = filesValidated;
  }

  close() {
    this.activeModal.close();
  }
}
