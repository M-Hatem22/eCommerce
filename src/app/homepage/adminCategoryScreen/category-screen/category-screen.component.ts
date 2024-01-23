import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-screen.component.html',
  styleUrls: ['./category-screen.component.css']
})

export class CategoryListComponent implements OnInit {
  categoryList: any[] = [];
  newCategory: any = {
    name: '',
    image: '',
  };

  imageFile: File | null = null;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategoryList();
  }

  loadCategoryList() {
    this.categoryService.getCategories()
      .subscribe(data => {
        this.categoryList = data;
      });
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id)
      .subscribe(() => {
        // After deletion, reload the category list
        this.loadCategoryList();
      });
  }

  updateCategory(id: number) {
    // Implement the logic to update the category using the API
    // You can navigate to a separate update component or use a modal/dialog
  }

  addCategory() {
    // Reset the newCategory object and imageFile when adding a new category
    this.newCategory = { name: '', image: '' };
    this.imageFile = null;
  }

  handleImageFile(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.categoryService.uploadImage(file)
        .subscribe(response => {
            const imageUrl = response.url;
            this.newCategory = {
              ...this.newCategory,
              image: imageUrl
            };
        }, error => {
          console.error('Image upload failed. Error:', error);
        });
    }
  }


  saveCategory() {
    this.categoryService.saveCategory(this.newCategory)
      .subscribe(() => {
        // After saving, reload the category list
        this.loadCategoryList();
      });
  }
}
