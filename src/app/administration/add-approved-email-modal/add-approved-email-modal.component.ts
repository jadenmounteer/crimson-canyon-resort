import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-approved-email-modal',
  templateUrl: './add-approved-email-modal.component.html',
  styleUrls: ['./add-approved-email-modal.component.scss'],
})
export class AddApprovedEmailModalComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
