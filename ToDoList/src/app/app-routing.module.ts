import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { ToDoItemViewComponent } from './components/to-do-item-view/to-do-item-view.component';

const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
    },
    {
        path: 'tasks',
        component: ToDoListComponent,
        children: [
            {
                path: ':id',
                component: ToDoItemViewComponent,
            },
        ],
    },
    {
        path: '**',
        redirectTo: '',
    },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(AppRoutes),
    ],
    exports: [
        RouterModule,
    ],
})
export class AppRoutingModule { }