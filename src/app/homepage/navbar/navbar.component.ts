import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Authorized } from 'src/app/_module/authorized';
import { CartcountService } from 'src/app/service/cartcount.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public authorized: Authorized = new Authorized("", false);
 
  cartCount: any;
    constructor(private authService: LoginService,private router: Router,private cartService:CartcountService) {}
  ngOnInit(): void {
    this.authService.isAuth$.subscribe((value) => {
      this.authorized.Role = value.Role;
      this.authorized.isAuthorized = value.isAuthorized;
    });
    this.checkIfUserLoggedIn();
    this.cartService.getCartItemCount().subscribe((count: any) => this.cartCount = count);
  }
  checkIfUserLoggedIn() {
    if (localStorage.getItem("token") && localStorage.getItem("role")) {
      this.authorized.isAuthorized = true;
      this.authorized.Role = localStorage.getItem("role");

      this.authService.isAuth$.next(this.authorized);
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/mainpage");
  }
}