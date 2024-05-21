import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

type listElement = {id: number, text: string};
let elements: Array<listElement>;

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent {

 elements = [ {id: 1, text: 'By a new gaming laptop'}, 
              {id: 2, text: 'Complete previous task'}, 
              {id: 3, text: 'Create some angular app'}
            ];
}

