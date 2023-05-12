import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../post';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewPostModalComponent } from '../add-new-post-modal/add-new-post-modal.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  @Input() posts!: Post[] | null;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  protected addNewPost(): void {
    const modalRef = this.modalService.open(AddNewPostModalComponent);
  }
}
