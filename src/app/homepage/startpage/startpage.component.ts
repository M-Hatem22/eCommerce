import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Authorized } from 'src/app/_module/authorized';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent implements OnInit {
  public authorized: Authorized = new Authorized("", false);
  public showButton = false;

  constructor(private authService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAuth$.subscribe((value) => {
      this.authorized.isAuthorized = value.isAuthorized;
      this.checkIfUserLoggedIn();
    });
  }

  checkIfUserLoggedIn() {
    if (localStorage.getItem("token")) {
      this.authorized.isAuthorized = true;
    }
    this.showButton = !this.authorized.isAuthorized;
  }

}