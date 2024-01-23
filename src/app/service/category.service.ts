import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'https://localhost:7129/api/Categories';
  private imageUploadUrl = 'https://localhost:7129/image';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  updateCategory(id: number, updatedCategory: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, updatedCategory);
  }

  uploadImage(file: File): Observable<ImageUploadResponse> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<ImageUploadResponse>(this.imageUploadUrl, formData);
  }

  saveCategory(newCategory: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, newCategory);
  }
}

interface ImageUploadResponse {
  isSuccess: boolean;
  message: '';
  url: '';
}