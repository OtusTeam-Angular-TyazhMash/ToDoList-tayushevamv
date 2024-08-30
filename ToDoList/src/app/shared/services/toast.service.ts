import { ApplicationRef, ComponentRef, EmbeddedViewRef, Injectable, createComponent } from '@angular/core';
import { BehaviorSubject, delay, map, take } from 'rxjs';
import { ToastComponent } from '../components/toast/toast.component';

export const enum EToastType {
  info = "Сообщение",
  error= "Ошибка",
  warning= "Предупреждение",
  success= "Успех",
}
export interface IToast {
  id: number,
  type: EToastType;
  text: string;
};

@Injectable({
  providedIn: 'root'
})

export class ToastService {
  private componentRef: ComponentRef<ToastComponent> | null = null;
  private toastList$: BehaviorSubject<Array<IToast>> = new BehaviorSubject<Array<IToast>>([]);

  constructor(private applicationRef: ApplicationRef) { }

  get getToastList() {
    return this.toastList$.asObservable().pipe(
        map(items => items),
    );
  }

  private createToastComponent(): void {
    if (this.componentRef === null) {
        this.componentRef = createComponent(
            ToastComponent, {
            environmentInjector: this.applicationRef.injector,
        });
        this.applicationRef.attachView(this.componentRef.hostView)
        const domElement = (this.componentRef.hostView as EmbeddedViewRef<HTMLElement>).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElement);
    }
  }

  private destroyToastComponent(): void {
      if (this.componentRef !== null) {
          this.applicationRef.detachView(this.componentRef.hostView);
          this.componentRef.destroy();
          this.componentRef = null;
      }
  }

  private addToast(type: EToastType, text: string): IToast|null {
    if (text && type) {
      let newId: number = Math.max(...this.toastList$.value.map((element)=> element.id))+1;
      let toast: IToast = {id: newId, text: text, type: type};
      return toast;
    }
    else
      return null;
  }

  private deleteToast(id: number): void {
    const toastIndex = this.toastList$.value.findIndex(findItem => findItem.id === id);
    if (toastIndex > -1)
        this.toastList$.value.splice(toastIndex, 1);
  }

  showToast(type: EToastType, text: string, duration: number = 3000) {
    let toast = this.addToast(type, text);
    if (toast!) {
      this.createToastComponent();
      this.toastList$.next([...this.toastList$.value, toast]);
      this.toastList$.pipe(
          delay(duration),
          take(1),
      ).subscribe(() => {
          this.deleteToast(toast!.id);
          if (this.toastList$.value.length === 0)
              this.destroyToastComponent();
      });
    }
  }

}
