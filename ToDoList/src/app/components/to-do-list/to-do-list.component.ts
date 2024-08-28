import { Component, OnInit } from '@angular/core';
import { IListItem } from 'src/app/models/to-do-list.model';
import { ServiceService } from 'src/app/services/service.service';
import { EToastType, ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent implements OnInit{

  constructor(private service: ServiceService,
              private toastService: ToastService
  ) {}

  isLoading: boolean = true;
  newValue: string = '';
  newDescription: string = '';
  selectedItemId!: number|null;

  addItem() : void {
    this.service.addItem(this.newValue, this.newDescription);
    this.toastService.showToast(EToastType.success, "Задача добавлена");
  }

  deleteItem(id: number): void {
    this.service.deleteItem(id);
    this.selectedItemId = null;
    this.toastService.showToast(EToastType.success, "Задача удалена");
  }

  editItem(item: IListItem) {
    this.service.editItem(item.id, item.text);
    this.toastService.showToast(EToastType.success, "Внесены изменения");
  }

  getList(): IListItem[] {
    return this.service.getItems;
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
    return this.service.getItem(this.selectedItemId!)!.description;
  }

}

