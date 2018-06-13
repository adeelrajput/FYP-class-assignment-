import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http'
import { ServerService } from '../../server.service'
import { AuthService } from '../auth.service'
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  roles: string[] = ['student', 'admin'];
  role: string = this.roles[0];
  batches: string[] = [];
  rollNos: string[] = [];
  emailError: string = '';
  passwordError: string = '';
  rollNoError: string = '';
  constructor(private serveData: ServerService, private auth: AuthService) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.serveData.getData('Batches')
      .subscribe(
        (response) => {
          this.batches = response.json();
          // console.log('Batches are fetched...', this.batches);
        },
        (error) => {
          console.log(error)
        }
      );
    this.serveData.getData('rollNos').subscribe(
      (response) => { this.rollNos = Object.values(response); console.log('Roll Nos:', this.rollNos) },
      (error) => console.log(error)
    )

  }


  onSignup(form: NgForm) {
    let userInfo = form.value;
    this.emailError = '';
    this.passwordError = '';
    this.rollNoError = '';
    delete userInfo.terms;
    let length = this.rollNos.length - 1;
    if (this.role == 'student') {
      userInfo.rollNo = userInfo.batch + userInfo.number;
      userInfo.role = 'student';
      for (let i = 0; i <= length; i++) {
        if (this.rollNos[i] == userInfo.rollNo) {
          console.log('Roll No already exists');
          this.rollNoError = 'Roll No already exists!';
        } else if (this.rollNos[i] != userInfo.rollNo) {
          console.log('Signing up student');
          this.auth.signupUser(userInfo).then(
            () => {
              if (this.auth.emailError == 'auth/email-already-in-use') {
                this.emailError = 'This email address is already in use by another account!';
              } else if (this.auth.emailError == 'auth/weak-password') {
                this.passwordError = 'Password should be at least 6 characters long';
              } else {
                this.emailError = '';
              }
            }
          );
        }
      }
    } else if (this.role == 'admin') {
      userInfo.role = 'admin';
      this.auth.signupUser(userInfo).then(
        () => {
          console.log('Signing up admin')
          if (this.auth.emailError == 'auth/email-already-in-use') {
            this.emailError = 'The email address is already in use by another account.';
          } else if (this.auth.emailError == 'auth/weak-password') {
            this.passwordError = 'Password should be at least 6 characters';
          } else {
            this.emailError = '';
          }
        }
      );
    }
    form.reset();
  }
}
