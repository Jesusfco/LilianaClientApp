import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import "rxjs";
import { Observable } from "rxjs";

import { Url } from './url';
import { Storage } from './storage';

@Injectable()
export class UserService {

  public link: Url = new Url();
  public token: Storage = new Storage();
  
  constructor(private _http: Http) { }

  login(information) {
    return this._http.post(this.link.url + 'login', information)
            .map(data => data.json())
            .toPromise();
  }

  checkAuth() { 

    return this._http.get(this.link.url + 'checkAuth' + this.token.getTokenUrl())
    .map(data => data.json())
    .toPromise();

  }

  getAlbums() { 

    return this._http.get(this.link.url + 'albums' + this.token.getTokenUrl())
            .map(data => data.json())
            .toPromise();

  }

  getPhotos(id) {
    return this._http.get(this.link.url + 'album/' + id + this.token.getTokenUrl())
            .map(data => data.json())
            .toPromise();
  }

  storeSelection(data) {
    
    return this._http.post(this.link.url + 'album/storeSelection' + this.token.getTokenUrl(), data)
            .map(data => data.json())
            .toPromise();

  }

}
