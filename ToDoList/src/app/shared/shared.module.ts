import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { TooltipDirective } from './tooltip.directive';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    ButtonComponent,
    TooltipDirective,
    TooltipComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ButtonComponent,
    TooltipDirective,
    LoadingSpinnerComponent
  ]
})
export class SharedModule { }
