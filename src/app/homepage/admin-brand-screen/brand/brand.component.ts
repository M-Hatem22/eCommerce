import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/service/brand.service.service';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandListComponent implements OnInit {
  brandList: any[] = [];
  newBrand: any = {
    name: '',
    image: '',
    categoryid: null
  };
  categoryList: any[] = [];

  constructor(private brandService: BrandService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadBrandList();
    this.loadCategoryList();
  }

  loadBrandList() {
    this.brandService.getBrands()
      .subscribe(data => {
        this.brandList = data;
      });
  }

  loadCategoryList() {
    this.categoryService.getCategories()
      .subscribe(data => {
        this.categoryList = data;
      });
  }

  deleteBrand(id: number) {
    this.brandService.deleteBrand(id)
      .subscribe(() => {
        // After deletion, reload the brand list
        this.loadBrandList();
      });
  }

  updateBrand(id: number) {
    // Implement the logic to update the brand using the API
    // You can navigate to a separate update component or use a modal/dialog
  }

  addBrand() {
    // Reset the newBrand object when adding a new brand
    this.newBrand = {
      name: '',
      image: '',
      categoryid: null
    };
  }

  handleImageFile(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.categoryService.uploadImage(file)
        .subscribe(response => {
            this.newBrand.image = response.url;
        }, error => {
          // Handle the error case
          console.error('Image upload failed. Error:', error);
        });
    }
  }

  saveBrand() {
    // Assuming you have a service method to save the brand
    this.brandService.saveBrand(this.newBrand)
      .subscribe(() => {
        // After saving, reload the brand list
        this.loadBrandList();
      });
  }
}