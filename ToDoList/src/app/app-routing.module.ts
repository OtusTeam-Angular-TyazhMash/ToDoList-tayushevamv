import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ToDoListComponent } from './modules/backlog/components/to-do-list/to-do-list.component';
import { ToDoItemViewComponent } from './modules/backlog/components/to-do-item-view/to-do-item-view.component';

const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'backlog',
        pathMatch: 'full',
    },
    {
        path: 'backlog',
        loadChildren: () => import('./modules/backlog/backlog.module')
            .then(m => m.BacklogModule),
    },
    {
        path: 'board',
        loadChildren: () => import('./modules/board/board.module')
            .then(m => m.BoardModule),
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