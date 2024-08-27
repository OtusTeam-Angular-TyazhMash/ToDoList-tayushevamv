import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { EStatus, IListItem } from 'src/app/models/to-do-list.model';

@Component({
  selector: 'app-to-do-list-item',
  templateUrl: './to-do-list-item.component.html',
  styleUrls: ['./to-do-list-item.component.scss']
})
export class ToDoListItemComponent {
  @Input() listItem!: IListItem;
  @Output() deleteItemEvent = new EventEmitter<number>();
  @Output() editItemEvent = new EventEmitter<IListItem>();
  @Output() editItemStatusEvent = new EventEmitter<EStatus>();

  isEdit: boolean = false;
  readonly statusList = EStatus;

  deleteItem(): void {
    this.deleteItemEvent.emit(this.listItem.id);
  }

  editItem(): void {
    this.editItemEvent.emit(this.listItem);
    this.isEdit = false;
  }

  statusChange(matCheckboxChange: MatCheckboxChange): void {
    this.editItemStatusEvent.emit(matCheckboxChange.checked ? EStatus.Complete : EStatus.InProgress);
  }

}
