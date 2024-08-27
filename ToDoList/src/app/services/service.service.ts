import { Injectable } from '@angular/core';
import { IListItem } from '../models/to-do-list.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private elements: Array<IListItem> = [ 
      {id: 1, text: 'Купить новый игровой ПК', description: 'description first'}, 
      {id: 2, text: 'Завершить предыдущую задачу', description: ''}, 
      {id: 3, text: 'Создать мой первый Angular-проект', description: 'description third'}
  ];

  get getItems() {
      return this.elements;
  }

  getItem(id: number): IListItem|null {
    const index: number = this.elements.findIndex(item => item.id === id);
    if (index >= 0)
      return this.elements[index];
    else
      return null;
  }

  addItem(text: string, description: string): boolean {
    if (text) {
      let newId: number = Math.max(...this.elements.map((element)=> element.id))+1;
      this.elements.push(
              {id: newId, text: text, description: description}
          );
      return true;
    }
    else  
      return false;
  }

  deleteItem(id: number): boolean {
    const index: number = this.elements.findIndex(item => item.id === id);
    if (index >= 0) {
        this.elements.splice(index, 1);
        return true;
    } else 
      return false;
  }

  editItem(id: number, text: string): boolean {
      const itemIndex = this.elements.findIndex(item => item.id === id);
      if (itemIndex > -1) {
          this.elements[itemIndex].text = text;
          return true;
      } else
          return false;
  }

}
