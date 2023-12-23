import { Component, Input, OnInit } from '@angular/core';
import { PostComment } from '../post';
import { IconService } from 'src/app/services/icon.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-comments-area',
  templateUrl: './comments-area.component.html',
  styleUrls: ['./comments-area.component.scss'],
})
export class CommentsAreaComponent implements OnInit {
  @Input() comments: PostComment[] | undefined = [];

  constructor(public icon: IconService) {}

  ngOnInit(): void {}
}
