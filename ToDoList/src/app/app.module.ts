import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToDoListItemComponent } from './components/to-do-list-item/to-do-list-item.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from './shared/shared.module';
import { ToastComponent } from './shared/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent,
    ToDoListItemComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    SharedModule    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
