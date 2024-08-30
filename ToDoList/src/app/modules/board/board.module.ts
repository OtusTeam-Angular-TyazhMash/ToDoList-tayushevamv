import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { BoardRoutingModule } from './board-routing.module';
import { BoardViewComponent } from './components/board-view/board-view.component';
import { BoardItemViewComponent } from './components/board-item-view/board-item-view.component';


@NgModule({
  declarations: [
    BoardComponent,
    BoardViewComponent,
    BoardItemViewComponent
  ],
  imports: [
    CommonModule,
    BoardRoutingModule
  ]
})
export class BoardModule { }
