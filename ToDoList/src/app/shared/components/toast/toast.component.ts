import { Component } from '@angular/core';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

  constructor(private toastService: ToastService) { }

  get getToastList() {
    return this.toastService.getToastList;
  }

}
