import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginError: boolean = false;
  constructor(private route: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {
    const email: string = form.value.email, password: string = form.value.password;
    this.auth.loginUser(email, password).then(
      () => {
        if (this.auth.loginError != '') {
          this.loginError = true;
        } else {
          this.loginError = false;
        }
      }
    );
  }

}
