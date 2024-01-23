// items.service.ts
import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private apiUrl = 'https://localhost:7129/api/Items';
  private excelUrl = 'https://localhost:7129';
  private imageUploadUrl = 'https://localhost:7129/image';

  constructor(private http: HttpClient) {}

  getItems(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  uploadImage(file: File): Observable<ImageUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<ImageUploadResponse>(this.imageUploadUrl, formData);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  updateItem(id: number, updatedCategory: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedCategory);
  }


  saveItem(newCategory: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newCategory);
  }

  uploadExcel(excelFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('excelFile', excelFile, excelFile.name);

     
     
    // to send Authorization header when implemented
    // headers.append('Authorization', 'Bearer ' + AuthToken);
    this.http.post(`${this.excelUrl}/excel`, formData);
    return this.http.post(`${this.excelUrl}/api/files`, formData);
  }

  downloadExcel(): Observable<Blob> {
    const headers = new HttpHeaders({
      'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      // Uncomment the next line if you need to send authorization headers
      // 'Authorization': 'Bearer ' + yourAuthToken,
    });

    return this.http.get(`${this.excelUrl}/api/Files/api/getAllItemsExcell`, { responseType: 'blob', headers });
  }
}

interface ImageUploadResponse {
  isSuccess: boolean;
  message: '';
  url: '';
}