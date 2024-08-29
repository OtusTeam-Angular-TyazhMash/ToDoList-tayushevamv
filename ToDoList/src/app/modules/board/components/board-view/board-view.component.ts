import { Component, OnInit } from '@angular/core';
import {  map, Observable,  } from 'rxjs';
import { EStatus, IListItem } from 'src/app/models/to-do-list.model';
import { ToDoDataService } from 'src/app/services/to-do-data.service';

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.scss']
})
export class BoardViewComponent implements OnInit{
  readonly status = EStatus;
  listItems$!: Observable<Array<IListItem>>;
  inProgressToDoListItems$!: Observable<Array<IListItem>>;
  completedToDoListItems$!: Observable<Array<IListItem>>;

  constructor(private toDoDataService: ToDoDataService) { }

  ngOnInit(): void {
    this.listItems$ = this.toDoDataService.getItems;
    this.inProgressToDoListItems$ = this.toDoDataService.getItems.pipe(
        map(items => items.filter(item => item.status === EStatus.InProgress)),
    );
    this.completedToDoListItems$ = this.toDoDataService.getItems.pipe(
        map(items => items.filter(item => item.status === EStatus.Complete)),
    );
    this.toDoDataService.returnList();
  }
}
