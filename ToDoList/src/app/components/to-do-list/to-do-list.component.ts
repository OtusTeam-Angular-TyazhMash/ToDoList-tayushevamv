import { compileDeclareInjectableFromMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { IListItem } from 'src/app/models/to-do-list.model';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit{

  isLoading: boolean = true;
  newValue: string = '';
  newDescription: string = '';
  elements: Array<IListItem> = [ {id: 1, text: 'By a new gaming laptop', description: 'description first'}, 
                                  {id: 2, text: 'Complete previous task', description: ''}, 
                                  {id: 3, text: 'Create some angular app', description: 'description third'}
                                ];
  selectedItemId!: number;

  addItem() : void {
    if (this.newValue) {
      let newId: number = Math.max(...this.elements.map((element)=> element.id))+1;
      this.elements.push(
              {id: newId, text: this.newValue, description: this.newDescription}
          );
    }
  }

  deleteItem(id: number): void {
    const index: number = this.elements.findIndex(item => item.id === id);
    if (index >= 0)
        this.elements.splice(index, 1);
  }

  ngOnInit(): void {
    setTimeout(
        () => this.isLoading = false, 500
      );
  }

  onClickItem(id: number): void {
    this.selectedItemId = id;
  }

  getDescription(): string {
    const index: number = this.elements.findIndex(item => item.id === this.selectedItemId);
    if (index >= 0)
      return this.elements[index].description;
    else
      return '';
  }

}

