import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-new-post-modal',
  templateUrl: './add-new-post-modal.component.html',
  styleUrls: ['./add-new-post-modal.component.scss'],
})
export class AddNewPostModalComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
