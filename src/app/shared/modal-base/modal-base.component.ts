import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'dsw-modal-base',
  templateUrl: './modal-base.component.html',
  styleUrls: ['./modal-base.component.scss']
})
export class ModalBaseComponent implements OnInit {
  @Input() showModal: boolean = false;
  @Output() closeModal = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  
}
