import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '../storage';

import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('focus') private elementRef: ElementRef;
  
  @Output() login = new EventEmitter();

  public ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
  }

  public data: any = {
    email: '',
    password: ''
  };

  public form = {
    email: 0,
    password: 0,
    credentials: 0,
    form: true,
  };

  sendingData: boolean = false;

  storage: Storage =  new Storage();

  constructor(private _http:  UserService, private router: Router) { }

  ngOnInit() {
    this.ngAfterViewInit();
  }
  accesar() {

    this.restoreValidation();
    this.validateMail();
    this.validatePassword();

    if(this.form.form == false)  return; 

    this.sendingData = true;

    this._http.login(this.data).then(
      data => {
        this.storage.storageToken(data.token);
        this.storage.storageUserData(data.user);
        this.router.navigate(['/myAlbums']);
        localStorage.setItem('login', '1');
      },
      error => {

        if(error.status == 401) {
          this.form.credentials = 1;
        }
        
        console.log(error);
      }
    ).then(
      () => this.sendingData = false
    );
  }

  validateMail(){

    this.form.email = 0;
    this.data.email = this.data.email.replace(/\s+$/, '');

    if(this.data.email == '') {
      this.form.email = 1;
      this.form.form = false;
    }    
  }

  validatePassword(){
    this.form.password = 0;
    this.data.password = this.data.password.replace(/\s+$/, '');

    if(this.data.password == '') {
      this.form.password = 1;
      this.form.form = false;
    }
  }

  restoreValidation() {

    this.form = {
      email: 0,
      password: 0,
      form: true,
      credentials: 0,
    };

  }
  

}
