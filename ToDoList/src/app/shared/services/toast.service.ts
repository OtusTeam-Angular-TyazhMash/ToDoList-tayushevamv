import { ApplicationRef, ComponentRef, EmbeddedViewRef, Injectable, createComponent } from '@angular/core';
import { ToastComponent } from '../toast/toast.component';

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
  toastList: Array<IToast> = [];

  constructor(private applicationRef: ApplicationRef) { }

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

  private addToast(type: EToastType, text: string): number|null {
    if (text && type) {
      let newId: number = Math.max(...this.toastList.map((element)=> element.id))+1;
      this.toastList.push(
              {id: newId, text: text, type: type}
          );
      return newId;
    }
    else
      return null;
  }

  private deleteToast(id: number): void {
    const toastIndex = this.toastList.findIndex(findItem => findItem.id === id);
    if (toastIndex > -1)
        this.toastList.splice(toastIndex, 1);
  }
  
  getToastList(): Array<IToast>  {
    return this.toastList;
  }

  showToast(type: EToastType, text: string, duration: number = 3000) {
    let id = this.addToast(type, text);
    if (id!) {
      this.createToastComponent();
      setTimeout(
          () => {
            this.deleteToast(id!);
            if (this.toastList.length === 0)
              this.destroyToastComponent();
          }, duration
      );
    }
  }

}
