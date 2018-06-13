import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import * as firebase from 'firebase'

@Injectable()
export class ServerService {

  constructor(private http: Http, ) { }

  storeData(url, servers: string) {
    return this.http.post('https://sbbu-qec.firebaseio.com/' + url + '.json', servers);
  }

  getData(url) {
    return this.http.get('https://sbbu-qec.firebaseio.com/' + url + '.json');
  }

  getOnce(url: string) {
    return firebase.database().ref(url).once('value');
  }



}

