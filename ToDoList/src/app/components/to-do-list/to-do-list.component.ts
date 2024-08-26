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
  elements: Array<IListItem> = [ {id: 1, text: 'By a new gaming laptop'}, 
                                  {id: 2, text: 'Complete previous task'}, 
                                  {id: 3, text: 'Create some angular app'}
                                ];

  addItem() : void {
    if (this.newValue) {
      let newId: number = Math.max(...this.elements.map((element)=> element.id))+1;
      this.elements.push(
              {id: newId, text: this.newValue}
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

}

