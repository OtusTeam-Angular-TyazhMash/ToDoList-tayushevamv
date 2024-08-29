import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListItem, EStatus } from '../models/to-do-list.model';

@Injectable({
  providedIn: 'root'
})
export class ToDoServiceService {

    constructor(private httpClient: HttpClient) { }

    getItems(): Observable<Array<IListItem>> {
      return this.httpClient.get<Array<IListItem>>("http://localhost:3000/to-do-list");
    }

    getFilterItems(status: EStatus): Observable<Array<IListItem>> {
      return this.httpClient.get<Array<IListItem>>(`http://localhost:3000/to-do-list?status=${status}`);
    }

    getItem(id: number): Observable<IListItem> {
      return this.httpClient.get<IListItem>(`http://localhost:3000/to-do-list/${id}`);
    }

  addItem(text: string, description: string): Observable<IListItem> {
    return this.httpClient.post<IListItem>("http://localhost:3000/to-do-list", 
              {text: text, description: description, status: EStatus.InProgress}
          );
  }

  deleteItem(id: number): Observable<void> {
    return this.httpClient.delete<void>(`http://localhost:3000/to-do-list/${id}`);
  }

  editItem(id: number, text: string): Observable<IListItem> {
    return this.httpClient.patch<IListItem>(`http://localhost:3000/to-do-list/${id}`, { text: text });
  }

  editItemStatus(id: number, status: EStatus): Observable<IListItem> {
    return this.httpClient.patch<IListItem>(`http://localhost:3000/to-do-list/${id}`, { status: status });
  }

}
