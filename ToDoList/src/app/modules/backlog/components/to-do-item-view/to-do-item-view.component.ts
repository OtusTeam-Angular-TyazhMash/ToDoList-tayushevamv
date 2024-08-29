import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ToDoService } from 'src/app/services/to-do.service';
import { EToastType, ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-to-do-item-view',
  templateUrl: './to-do-item-view.component.html',
  styleUrls: ['./to-do-item-view.component.scss']
})
export class ToDoItemViewComponent {
  itemDescription!: string;
  componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(private activatedRoute: ActivatedRoute,
      private toastService: ToastService,
      private service: ToDoService) { }

  ngOnDestroy(): void {
      this.componentDestroyed$.next(true);
      this.componentDestroyed$.complete();
  }

  ngOnInit(): void {
      this.activatedRoute.params.pipe(takeUntil(this.componentDestroyed$)).subscribe((params) => {
          this.service.getItem(params["id"]).subscribe({
              next: (toDoListItem) => {
                  this.itemDescription = toDoListItem.description;
              },
              error: (err: HttpErrorResponse) => {
                this.toastService.showToast(EToastType.error, 'Не удалось загрузить данные ' + err.message);
              },
          });
      });
  }

}
