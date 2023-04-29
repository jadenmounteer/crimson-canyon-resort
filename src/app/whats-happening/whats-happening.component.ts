import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-whats-happening',
  templateUrl: './whats-happening.component.html',
  styleUrls: ['./whats-happening.component.scss'],
})
export class WhatsHappeningComponent implements OnInit {
  protected contentLoaded: boolean = true;
  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  protected uploadFile(event: any) {
    const file: File = event.target.files[0];
  }

  ngOnInit(): void {}
}
