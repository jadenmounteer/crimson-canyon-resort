import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-or-edit-entry-modal',
  templateUrl: './add-or-edit-entry-modal.component.html',
  styleUrls: ['./add-or-edit-entry-modal.component.scss'],
})
export class AddOrEditEntryModalComponent implements OnInit {
  @Input() title: string = 'Add New Leader Board Entry 🏋️‍♀️';
  protected loading: boolean = true;
  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}
}
