import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToDoListItemComponent } from './components/to-do-list-item/to-do-list-item.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { SharedModule } from './shared/shared.module';
import { CreateItemComponent } from './components/to-do-create-item/to-do-create-item.component';
import { HttpClientModule } from '@angular/common/http';
import { ToDoItemViewComponent } from './components/to-do-item-view/to-do-item-view.component';
import { AppRoutingModule } from './app-routing.module';
import { ToastComponent } from './shared/components/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    ToDoListItemComponent,
    ToastComponent,
    CreateItemComponent,
    ToDoItemViewComponent,    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule        
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
