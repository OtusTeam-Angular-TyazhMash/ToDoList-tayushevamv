import { Component } from '@angular/core';
import { EStatus, IListItem } from 'src/app/models/to-do-list.model';
import { ToDoService } from 'src/app/services/to-do.service';

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.scss']
})
export class BoardViewComponent {
  readonly status = EStatus;
  listItems: IListItem[] = [];
  inProgressToDoListItems: IListItem[] = [];
  completedToDoListItems: IListItem[] = [];

  constructor(private toDoListService: ToDoService) { }

  ngOnInit(): void {
      this.toDoListService.getItems().subscribe(
          (items) => {
              this.listItems = items;
              this.inProgressToDoListItems = items.filter(item => item.status === EStatus.InProgress);
              this.completedToDoListItems = items.filter(item => item.status === EStatus.Complete);
          });
  }
}
