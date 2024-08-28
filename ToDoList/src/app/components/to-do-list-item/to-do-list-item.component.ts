import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IListItem } from 'src/app/models/to-do-list.model';

@Component({
  selector: 'app-to-do-list-item',
  templateUrl: './to-do-list-item.component.html',
  styleUrls: ['./to-do-list-item.component.scss']
})
export class ToDoListItemComponent {
  @Input() listItem!: IListItem;
  @Output() deleteItemEvent = new EventEmitter<number>();
  @Output() editItemEvent = new EventEmitter<IListItem>();

  isEdit: boolean = false;

  deleteItem(): void {
    this.deleteItemEvent.emit(this.listItem.id);
  }

  editItem(): void {
    this.editItemEvent.emit(this.listItem);
    this.isEdit = false;
  }

}
