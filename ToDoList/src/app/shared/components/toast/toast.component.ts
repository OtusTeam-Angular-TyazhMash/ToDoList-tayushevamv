import { Component } from '@angular/core';
import { IToast, ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

  constructor(private toastService: ToastService) { }

  getToastList(): Array<IToast> {
    return this.toastService.getToastList();
  }

}
