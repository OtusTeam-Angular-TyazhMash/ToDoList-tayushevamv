import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EStatus, ICreateItem, IListItem } from '../models/to-do-list.model';
import { EToastType, ToastService } from '../shared/services/toast.service';
import { ToDoService } from './to-do.service';

@Injectable({
    providedIn: 'root',
})
export class ToDoDataService {
    private listItems$: BehaviorSubject<Array<IListItem>> =
        new BehaviorSubject<Array<IListItem>>([]);

    constructor(private toDoService: ToDoService,
        private toastService: ToastService) { }

    get getItems(): Observable<Array<IListItem>> {
        return this.listItems$.asObservable();
    }

    returnList(): void {
        this.toDoService.getItems().subscribe({
            next: receivedItems => {
                this.listItems$.next(receivedItems);
            },
            error: () => {
                this.listItems$.next([]);
            },
        });
    }

    addItem(formData: ICreateItem): void {
        this.toDoService.addItem(formData.text, formData.description).subscribe({
            next: (addedToDoListItem) => {
                this.listItems$.next([...this.listItems$.value, addedToDoListItem]);
                this.toastService.showToast(EToastType.success, "Задача добавлена");
            },
            error: () => {
                this.toastService.showToast(EToastType.error, 'Не удалось сохранить');
            },
        });
    }

    deleteItem(itemId: number): void {
        this.toDoService.deleteItem(itemId).subscribe({
            next: () => {
                const deletedItemIndex = this.listItems$.value.findIndex(item => item.id === itemId);
                if (deletedItemIndex > -1)
                    this.listItems$.value.splice(deletedItemIndex, 1)
                this.toastService.showToast(EToastType.success, "Задача удалена");
            },
            error: () => {
                this.toastService.showToast(EToastType.error, 'Не удалось удалить');
            },
        });
    }

    editItem(itemId: number, title: string): void {
        this.toDoService.editItem(itemId, title).subscribe({
            next: (editedToDoListItem) => {
                const deprecatedItemIndex = this.listItems$.value.findIndex(item => item.id === editedToDoListItem.id);
                this.listItems$.value[deprecatedItemIndex] = editedToDoListItem;
                this.toastService.showToast(EToastType.success, "Задача изменена");
            },
            error: () => {
                this.toastService.showToast(EToastType.error, 'Не удалось сохранить');
            },
        });
    }

    editItemStatus(itemId: number, itemStatus: EStatus): void {
        this.toDoService.editItemStatus(itemId, itemStatus).subscribe({
            next: (editedToDoListItem) => {
                const deprecatedItemIndex = this.listItems$.value.findIndex(item => item.id === editedToDoListItem.id);
                this.listItems$.value[deprecatedItemIndex] = editedToDoListItem;
                this.toastService.showToast(EToastType.success, "Статус изменен");
            },
            error: () => {
                this.toastService.showToast(EToastType.error, 'Не удалось сохранить');
            },
        });
    }
}
