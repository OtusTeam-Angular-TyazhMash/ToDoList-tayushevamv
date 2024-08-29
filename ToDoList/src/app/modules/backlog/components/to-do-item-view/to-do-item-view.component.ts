import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, map } from 'rxjs';
import { ToDoDataService } from 'src/app/services/to-do-data.service';

@Component({
  selector: 'app-to-do-item-view',
  templateUrl: './to-do-item-view.component.html',
  styleUrls: ['./to-do-item-view.component.scss']
})
export class ToDoItemViewComponent implements OnInit, OnDestroy{
  itemDescription!: string;
  componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  constructor(private activatedRoute: ActivatedRoute,
      private dataService: ToDoDataService) { }

  ngOnDestroy(): void {
      this.componentDestroyed$.next(true);
      this.componentDestroyed$.complete();
  }

  ngOnInit(): void {
      this.activatedRoute.params.pipe(takeUntil(this.componentDestroyed$)).subscribe((params) => {
          this.dataService.getItems.pipe(
                takeUntil(this.componentDestroyed$),
                map(items => items.find(item => item.id === +params["id"])),
            ).subscribe(item => {
                if (item)
                    this.itemDescription = item.description;
            });
      });
  }

}
