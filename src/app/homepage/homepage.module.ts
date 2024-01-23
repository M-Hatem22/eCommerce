import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StartpageComponent } from './startpage/startpage.component';
import { RouterModule } from '@angular/router';
import { MainLandingContentComponent } from './main-landing-content/main-landing-content.component';
import { AdminscreenComponent } from './adminscreen/adminscreen.component';
import { CategoryListComponent } from './adminCategoryScreen/category-screen/category-screen.component';
import { BrandListComponent } from './admin-brand-screen/brand/brand.component';
import { FormsModule } from '@angular/forms';
import { ItemsComponent } from './adminItemsScreen/items/items.component';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    StartpageComponent,
    MainLandingContentComponent,
    AdminscreenComponent,
    BrandListComponent,
    CategoryListComponent,
    ItemsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
   
  ],
  exports:[
    FooterComponent,
    NavbarComponent,
    StartpageComponent
  ]
})
export class HomepageModule { }