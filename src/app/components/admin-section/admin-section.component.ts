import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddOrEditPostModalComponent } from 'src/app/announcements/add-new-post-modal/add-or-edit-post-modal.component';

@Component({
  selector: 'app-admin-section',
  templateUrl: './admin-section.component.html',
  styleUrls: ['./admin-section.component.scss'],
})
export class AdminSectionComponent implements OnInit {
  protected contentLoaded: boolean = false;

  constructor(protected router: Router, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.contentLoaded = true;
  }

  protected surprise(): void {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
  }

  protected navigateToInstagram(): void {
    window.open('https://www.instagram.com/', '_blank');
  }
  protected addNewPost(): void {
    const modalRef = this.modalService.open(AddOrEditPostModalComponent);

    modalRef.result.then((result) => {
      if (result === 'success') {
        // this.addedNewPost.emit();
      }
    });
  }
}
