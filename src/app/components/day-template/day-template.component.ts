import { Component, Input, OnInit } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-day-template',
  templateUrl: './day-template.component.html',
  styleUrls: ['./day-template.component.scss'],
})
export class DayTemplateComponent implements OnInit {
  @Input() disabled: boolean = false;
  @Input() selected: boolean = false;
  @Input() date!: NgbDate;

  constructor() {}

  ngOnInit(): void {}
}
