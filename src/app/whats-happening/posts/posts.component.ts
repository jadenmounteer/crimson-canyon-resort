import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../post';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddNewPostModalComponent } from '../add-new-post-modal/add-new-post-modal.component';
import { Observable } from 'rxjs';
import { AdministrationService } from 'src/app/services/administration.service';
import { AuthService } from 'src/app/components/auth/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  @Input() posts!: Post[] | null;
  @Output() addedNewPost: EventEmitter<any> = new EventEmitter();
  protected currentUserIsAdmin$!: Observable<boolean>;
  // protected userId: number;

  constructor(
    private modalService: NgbModal,
    private adminService: AdministrationService,
    protected authService: AuthService
  ) {}

  ngOnInit(): void {
    this.grabCurrentUserAdminStatus();
  }

  protected addNewPost(): void {
    const modalRef = this.modalService.open(AddNewPostModalComponent);

    modalRef.result.then((result) => {
      if (result === 'success') {
        this.addedNewPost.emit();
      }
    });
  }

  private grabCurrentUserAdminStatus() {
    if (this.authService.userId) {
      this.currentUserIsAdmin$ = this.adminService.checkIfUserIsAdmin(
        this.authService.userId
      );
    }
  }
}
