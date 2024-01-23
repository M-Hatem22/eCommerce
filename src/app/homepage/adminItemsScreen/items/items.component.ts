import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/service/items.service';
import { BrandService } from 'src/app/service/brand.service.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  items: any[] = [];
  newItem: any = {
    name: '',
    image: '',
    description:'',
    price:0,
    quantityInInventory:0,
    brandId:0
  };
  newBrandId: number | null = null; // To store the selected brandId
  newItemImage: File | null = null;
  brands: any[] = []; // To store the list of brands
  excelFile: File | null = null;

  constructor(private itemsService: ItemsService , private brandsService: BrandService,) {}

  ngOnInit(): void {
    this.itemsService.getItems().subscribe(
      data => this.items = data,
      error => console.error('Error fetching items:', error)
    );

    this.brandsService.getBrands().subscribe(
      data => this.brands = data,
      error => console.error('Error fetching brands:', error)
    );
  }
  loadItemsList() {
    this.itemsService.getItems()
      .subscribe(data => {
        this.items = data;
      });
  }

  addBrandId(brandId: number): void {
    this.newBrandId = brandId;
  }

  handleImageFile(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.itemsService.uploadImage(file)
        .subscribe(response => {
            const imageUrl = response.url;
            this.newItem = {
              ...this.newItem,
              image: imageUrl
            };
        }, error => {
          console.error('Image upload failed. Error:', error);
        });
    }
  }

  saveItem(): void {
    
      
          this.itemsService.saveItem(this.newItem).subscribe(
            response => {
              console.log('Item added successfully:', response);
              this.loadItemsList();
              // Refresh the item list or perform any other action
            },
            error => console.error('Error adding item:', error)
          );
        
    
  }

  handleExcelFile(event: any): void {
    const fileList: FileList | null = event.target.files;

    if (fileList && fileList.length > 0) {
      this.excelFile = fileList[0];
    } else {
      this.excelFile = null;
    }
  }

  uploadExcel(): void {
    if (this.excelFile) {
      this.itemsService.uploadExcel(this.excelFile).subscribe(
        response => {
          console.log('Excel uploaded successfully:', response);
          this.loadItemsList(); // Reload the items after uploading Excel
        },
        error => console.error('Error uploading Excel:', error)
      );
    }else{console.log("no file");}
  }

  downloadExcel(): void {
    this.itemsService.downloadExcel().subscribe(
      (response) => {
        // Create a Blob from the response
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Create a link element to trigger the download
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'items.csv';

        // Append the link to the document and trigger the click event
        document.body.appendChild(link);
        link.click();

        // Clean up by removing the link element
        document.body.removeChild(link);
      },
      (error) => {
        // Handle error
        console.error('Excel download error', error);
      }
    );
  }
}