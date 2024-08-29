import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IListItem, EStatus } from '../models/to-do-list.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

    private url = "http://localhost:3000/to-do-list";

    constructor(private httpClient: HttpClient) { }

    getItems(): Observable<Array<IListItem>> {
      return this.httpClient.get<Array<IListItem>>(this.url);
    }

    getFilterItems(status: EStatus): Observable<Array<IListItem>> {
      return this.httpClient.get<Array<IListItem>>(this.url + "?status=" + status);
    }

    getItem(id: number): Observable<IListItem> {
      return this.httpClient.get<IListItem>(this.url+ "/" + id);
    }

  addItem(text: string, description: string): Observable<IListItem> {
    return this.httpClient.post<IListItem>(this.url, 
              {text: text, description: description, status: EStatus.InProgress}
          );
  }

  deleteItem(id: number): Observable<void> {
    return this.httpClient.delete<void>(this.url + "/" + id);
  }

  editItem(id: number, text: string): Observable<IListItem> {
    return this.httpClient.patch<IListItem>(this.url + "/" + id, { text: text });
  }

  editItemStatus(id: number, status: EStatus): Observable<IListItem> {
    return this.httpClient.patch<IListItem>(this.url + "/" + id, { status: status.valueOf });
  }

}
