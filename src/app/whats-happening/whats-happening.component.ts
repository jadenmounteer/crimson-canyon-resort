import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { WhatsHappeningService } from './whats-happening.service';

@Component({
  selector: 'app-whats-happening',
  templateUrl: './whats-happening.component.html',
  styleUrls: ['./whats-happening.component.scss'],
})
export class WhatsHappeningComponent implements OnInit {
  protected contentLoaded: boolean = true;
  constructor(
    private afs: AngularFirestore,
    private whatsHappeningService: WhatsHappeningService
  ) {}

  ngOnInit(): void {}
}
