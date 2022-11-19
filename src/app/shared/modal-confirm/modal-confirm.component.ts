import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ContactListService } from 'src/app/services/contact-list.service';
import { ReponseWrapper } from 'src/app/models/response-api-default';
import { catchError, map,  throwError } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'dsw-modal-Confirm',
  templateUrl: './modal-Confirm.component.html',
  styleUrls: ['./modal-Confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {

  @Input() data;
  constructor(
    public activeModal: NgbActiveModal
  ) { }


  ngOnInit(): void {
  }

  close(sendData) {
    this.activeModal.close(sendData);
  }
}
