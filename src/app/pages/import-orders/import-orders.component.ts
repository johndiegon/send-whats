import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, map,  throwError } from 'rxjs';
import {  ReportFile } from 'src/app/models/HistoryInputFile';
import { ReponseWrapper } from 'src/app/models/response-api-default';
import { ContactListService } from 'src/app/services/contact-list.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalImportComponent } from './modal-import/modal-import.component';
declare const google: any;

@Component({
  selector: 'dsw-import-orders',
  templateUrl: './import-orders.component.html',
  styleUrls: ['./import-orders.component.scss']
})
export class ImportOrdersComponent implements OnInit {
  historyInputFile: ReportFile[];
  historyInputFileBkp: ReportFile[];
  nameFileSearch = '';
  loading = false;

  pageSize = 20;
  page = 1;
  pages: any = [];

  constructor(
    private toastr: ToastrService,
    private contactListService: ContactListService,
    private modalService: NgbModal
  ) { }


  ngOnInit() {
    this.loading = true;
    this.contactListService.getHistory()
    .pipe(catchError(error => {
      this.toastr.error('Não foi possivel encontrar a lista de contatos');
      this.loading = false;
      return throwError(() => new Error(error.message));
    }))
    .subscribe(res => {
      // debugger
      this.historyInputFileBkp = res.reportFile;
      this.historyInputFile = res.reportFile;
      const maxPage = Math.ceil(this.historyInputFileBkp.length / this.pageSize);
      for (let i = 0; i < maxPage; i++) {
        this.pages.push(i + 1);
      }
      // this.pagination(1);
      console.log(this.historyInputFile);
      this.loading = false;
    });

  }

  pagination(page: number) {
    this.page = page;
    this.historyInputFile = JSON.parse(JSON.stringify(this.historyInputFileBkp));
    this.historyInputFile = this.historyInputFile.slice(page * this.pageSize - this.pageSize, page * this.pageSize);
  }
  // searchFile() {
  //   console.log(this.nameFileSearch);
  // }
  assignCopy() {
    this.historyInputFile = Object.assign([], this.historyInputFileBkp);
  }
  searchFile(value) {
    console.log(value);
    console.log(this.nameFileSearch);
    if (!this.nameFileSearch) {
        this.assignCopy();
    } // when nothing has typed
    this.historyInputFile = Object.assign([], this.historyInputFileBkp).filter(
      item => item.fileName?.toLowerCase().indexOf(this.nameFileSearch.toLowerCase()) > -1
    );
  }


  openModal() {
    this.modalService.open(ModalImportComponent, { windowClass : 'modal-md', ariaLabelledBy: 'modal-basic-title' });
  }
}

