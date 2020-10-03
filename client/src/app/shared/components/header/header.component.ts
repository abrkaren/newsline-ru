import { Component, OnInit } from '@angular/core';

declare const gapi: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userName;
  userId;
  isLoggedIn = false;

  constructor(  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('isLoggedIn')){
      this.userName = localStorage.getItem('userName');
      this.userId = localStorage.getItem('userId');
      this.isLoggedIn = true;
    }
  }

  public auth2: any;
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '55705359044-km521s996uc26ut3pk359te1moh5a6q6.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleBtn'));
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        // console.log('..')
        // console.log('Token || ' + googleUser.getAuthResponse().id_token);
        // console.log('ID: ' + profile.getId());
        // console.log('Name: ' + profile.getName());
        // console.log('Image URL: ' + profile.getImageUrl());
        // console.log('Email: ' + profile.getEmail());
        // console.log('..')

        this.userName = profile.getName();
        localStorage.setItem('isLoggedIn', 'Y');
        localStorage.setItem('userId', profile.getId());
        localStorage.setItem('userName', profile.getName());
        setTimeout(()=> {
          window.location.reload();
        }, 100)

      }, (error) => {
          // console.log(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit(){
    setTimeout(()=>{
      this.googleInit();
    },300)
  }

  logout() {
    gapi.auth2.getAuthInstance().disconnect();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setTimeout(()=> {
      window.location.reload();
    }, 100)
  }

}
