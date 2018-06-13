import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http'
import { ServerService } from '../server.service'
import { AuthService } from '../anth/auth.service'
import * as firebase from 'firebase'
import { Router } from '@angular/router'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  adminPanel: boolean = true;
  userInfo: string[] = []
  role: string = ''
  userName: string = 'User'
  constructor(private serverData: ServerService, private auth: AuthService, private router:Router) { }
  ngOnInit() {
    this.checkUser()
  }

  checkUser() {
    setInterval(
      () => {
        if (localStorage.getItem('user') != null) {
          let user: any = JSON.parse(localStorage.getItem('user'));
          this.userName = user.name;
          this.role = user.role;
          console.log('check User',this.role,this.userName)
        }
      }, 1000);
  }

  logout(){
    console.log('Logout called');
    firebase.auth().signOut().then(
      (response)=>{
        console.log('Logout successful', response);
        localStorage.clear();
        this.role=''
        this.userName = 'User'
        this.router.navigate(['/login'])
      },(error) => {
        console.log('Error in loging out', error)
      }
    );
  }

}
