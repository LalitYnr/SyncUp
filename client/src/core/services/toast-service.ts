import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private createToastContainer() {
    if(!document.getElementById('toast-container')) {
      const toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.className = 'toast toast-bottom toast-end';
      document.body.appendChild(toastContainer);
    }
  }
  
  private createToastElement(message: string, alertClass: string, duration = 5000) {
    this.createToastContainer();
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) { return; }
    const toastElement = document.createElement('div');
    toastElement.classList.add('alert', alertClass, 'shadow-lg');
    toastElement.innerHTML = `
    <span>${message}</span>
    <button class="ml-4 btn btn-sm btn-ghost">x</button>
    `;
    toastElement.querySelector('button')?.addEventListener('click', () => {
      toastContainer.removeChild(toastElement);
    });
    toastContainer.appendChild(toastElement);

    setTimeout(() => {
      if (toastContainer.contains(toastElement)) {
        toastContainer.removeChild(toastElement);
      }
    }, duration);
  }

  success(message: string, duration: number) {
    this.createToastElement(message, 'alert-success', duration);
  }
  error(message: string, duration: number = 5000) {
    this.createToastElement(message, 'alert-error', duration);
  }
  warning(message: string, duration: number = 5000) {
    this.createToastElement(message, 'alert-warning', duration);
  }
  info(message: string, duration: number = 5000) {
    this.createToastElement(message, 'alert-info', duration);
  }

}
