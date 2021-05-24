import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageObject } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public $messageSubject = new BehaviorSubject<MessageObject>(new MessageObject());

  constructor() { }

  showError(text: any, duration?: number) {
    const message = new MessageObject();
    message.text = this.getMessage(text);;
    message.duration = duration ? duration : 3000;
    message.type = 'error';
    this.$messageSubject.next(message);
  }

  showSuccess(text: any, duration?: number) {
    const message = new MessageObject();
    message.text = this.getMessage(text);
    message.duration = duration ? duration : 3000;
    message.type = 'success';
    this.$messageSubject.next(message);
  }

  private getMessage(message: any): string {
    if (!message) {
      return 'Mensaje inseperado!';
    }

    if (typeof message === 'string') {
      return message;
    }

    if ((message) instanceof Array) {
      return this.getMessage(message[0].msg);
    }

    if ((message) instanceof Object) {
      if (message.error == 'Unauthorized') {
        return 'No tiene permisos para acceder o su sesión expiro, por favor loguearse.';
      }
      return this.getMessage(message.errors || message.error || message.message || message.messages);
    }
  }
}
