import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BacklogComponent } from './backlog.component';
import { BacklogRoutingModule } from './backlog-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { ToDoItemViewComponent } from './components/to-do-item-view/to-do-item-view.component';
import { ToDoListItemComponent } from './components/to-do-list-item/to-do-list-item.component';
import { ToDoItemCreateComponent } from './components/to-do-item-create/to-do-item-create.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    BacklogComponent,
    ToDoListComponent,
    ToDoItemViewComponent,
    ToDoItemCreateComponent,
    ToDoListItemComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BacklogRoutingModule
  ]
})
export class BacklogModule { }
