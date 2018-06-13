import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import * as firebase from 'firebase'
import { Token } from '@angular/compiler';
import { ServerService } from '../server.service'
import { Router } from '@angular/router'

@Injectable()
export class AuthService {
    token: string
    userData: string[] = []
    role: string = ''
    uid: string = '';
    emailError: any;
    loginError: string = '';
    constructor(private http: Http, private serverData: ServerService, private router: Router) { }

    signupUser(userInfo) {
        console.log('signup user info', userInfo);
        const email = userInfo.email, password = userInfo.password;
        delete userInfo.password;
        return firebase.auth().createUserWithEmailAndPassword(email, password).then(
            (success) => {
                this.uid = success.user.uid;
                console.log('uid', success.user.uid)
                this.storeUserInfo(this.uid, userInfo);
            },
            (error) => {
                if (error != undefined && error != null) {
                    let err = error.code;
                    this.emailError = err;
                    console.log(error);
                }
            }
        )
    }

    storeUserInfo(uid, userInfo) {
        console.log('UserInfo before storing: ', userInfo);
        if (userInfo.role == 'student') {
            let rn: any = {};
            rn[this.uid] = userInfo.rollNo;
            this.serverData.storeData('user/' + this.uid, userInfo)
                .subscribe(
                    (response) => console.log(response),
                    (error) => console.log(error)
                )
            console.log(rn);
            this.serverData.storeData('rollNo/', rn)
                .subscribe(
                    (response) => console.log(response),
                    (error) => console.log(error)
                )
        } else if (userInfo.role == 'admin') {
            console.log('Your are a admin, your role is: ', userInfo.role);
            this.serverData.storeData('user/' + this.uid, userInfo)
                .subscribe(
                    (response) => console.log(response),
                    (error) => console.log(error)
                )
        }
        this.router.navigate(['/login'])
    }

    loginUser(email: string, password: string) {
        console.log('Login service called...');
        return firebase.auth().signInWithEmailAndPassword(email, password).then(
            (response) => {
                this.uid = firebase.auth().currentUser.uid;
                console.log('Token', this.uid)
                let url: string = 'user/' + this.uid;
                this.serverData.getData(url)
                    .subscribe(
                        (response) => {
                            this.userData = response.json();
                            let key = Object.keys(this.userData);
                            localStorage.setItem('user', JSON.stringify(this.userData[key[0]]));
                            this.router.navigate(['/']);
                        },
                        (error) => {
                            console.log(error)
                        }
                    );

            },
        )
    }
}

