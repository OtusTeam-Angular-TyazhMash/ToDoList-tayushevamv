import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { IListItem, ICreateItem, EStatus, ISelectListItem } from 'src/app/models/to-do-list.model';
import { ToDoService } from 'src/app/services/to-do.service';
import { EToastType, ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit{

  constructor(private service: ToDoService,
              private toastService: ToastService,
              private activatedRoute: ActivatedRoute
  ) {}

  isLoading: boolean = false;
  listItems: Array<IListItem> = [];
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
    this.service.addItem(item.text, item.description).subscribe({
        next: (res) => {
            this.listItems.push(res);
            this.toastService.showToast(EToastType.success, "Задача добавлена");
        },
        error: () => {
          this.toastService.showToast(EToastType.error, 'Не удалось сохранить');
        },
    });
  }

  deleteItem(id: number): void {
      this.service.deleteItem(id).subscribe({
          next: () => {
              const index = this.listItems.findIndex(item => item.id === id);
              if (index > -1)
                  this.listItems.splice(index, 1);
              this.toastService.showToast(EToastType.success, "Задача удалена");
          },
          error: () => {
            this.toastService.showToast(EToastType.error, 'Не удалось сохранить');
          },
      });
  }

  editItem(item: IListItem): void {
      this.service.editItem(item.id, item.text).subscribe({
          next: (res) => {
              const index = this.listItems.findIndex(findItem => findItem.id === res.id);
              this.listItems[index] = res;
              this.toastService.showToast(EToastType.success, "Внесены изменения");
          },
          error: () => {
            this.toastService.showToast(EToastType.error, 'Не удалось сохранить');
          },
      });
  }
   
  editItemStatus(item: IListItem, status: EStatus): void {
    this.service.editItemStatus(item.id, status).subscribe({
        next: (res) => {
            const index = this.listItems.findIndex(findItem => findItem.id === res.id);
            this.listItems[index] = res;
            this.toastService.showToast(EToastType.success, "Внесены изменения");
        },
        error: () => {
          this.toastService.showToast(EToastType.error, 'Не удалось сохранить');
        },
    });
  }

  getList(): void {
    this.service.getItems()
      .pipe( tap( () => this.isLoading = true))
          .subscribe({
            next: (res) => {
              this.listItems = res;
            },
            error: () => {
              this.toastService.showToast(EToastType.error, 'Не удалось загрузить данные');
            },
            complete: () => this.isLoading = false
          })
  };  

  getFilterList(status: EStatus): void {
    this.service.getFilterItems(status)
      .pipe( tap( () => this.isLoading = true))
        .subscribe({
          next: (res) => {
            this.listItems = res;
          },
          error: () => {
            this.toastService.showToast(EToastType.error, 'Не удалось загрузить данные');
          },
          complete: () => this.isLoading = false
        })
  };

  ngOnInit(): void {
    this.getList();
  }

  onFilter(status: MatSelectChange): void {
    if (status.value === null)
        this.getList()
    else
        this.getFilterList(status.value)
  }

}

