import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { IconService } from 'src/app/services/icon.service';

@Component({
  selector: 'app-book-visit',
  templateUrl: './book-visit.component.html',
  styleUrls: ['./book-visit.component.scss'],
})
export class BookVisitComponent implements OnInit {
  public arrivalDate: Date | undefined;
  public departureDate: Date | undefined;

  constructor(public icon: IconService, private router: Router) {}

  ngOnInit(): void {}

  public onSubmit(form: NgForm) {
    console.log(form.value.arrivalDate);
    this.router.navigate(['trip-confirmation-page']);
  }
}
