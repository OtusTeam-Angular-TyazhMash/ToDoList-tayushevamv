import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { IListItem, ICreateItem, EStatus, ISelectListItem } from 'src/app/models/to-do-list.model';
import { ToDoDataService } from 'src/app/services/to-do-data.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit{

  constructor(private dataService: ToDoDataService,
              private activatedRoute: ActivatedRoute
  ) {}

  isLoading: boolean = false;
  listItems$!: Observable<Array<IListItem>>;
  newValue: string = '';
  newDescription: string = '';
  readonly statusList: ISelectListItem[] = [
          {key: null, value: 'All'},
          {key: EStatus.InProgress, value: EStatus.InProgress},
          {key: EStatus.Complete, value: EStatus.Complete}
        ];

  public get getItemIdFromRoute(): number | null {
      return this.activatedRoute.snapshot.children.length === 0 ?
          null : +this.activatedRoute.snapshot.children[0].params['id'];
  }

  addItem(item: ICreateItem) : void {
    this.dataService.addItem(item);
  }

  deleteItem(id: number): void {
      this.dataService.deleteItem(id);
  }

  editItem(item: IListItem): void {
      this.dataService.editItem(item.id, item.text);
  }
   
  editItemStatus(item: IListItem, status: EStatus): void {
    this.dataService.editItemStatus(item.id, status);
  }

  ngOnInit(): void {
    this.listItems$ = this.dataService.getItems;
    this.dataService.returnList();
  }

  onFilter(status: MatSelectChange): void {
    if (status.value === null)
        this.dataService.getItems
    else
        this.dataService.getItems.pipe(
          map(items => items.filter(item => item.status === status.value))
        )
  }

}

