import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // loadedFeatuer = 'login';

  constructor() { }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyBcCWQe7JMdbxB4VnHdp4EQAsiYhqE4iNI",
      authDomain: "sbbu-qec.firebaseapp.com",
    })
  }

  // onNavigate(featuer: string) {
  //   this.loadedFeatuer = featuer;
  // }

}
