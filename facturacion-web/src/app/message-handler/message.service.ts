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
    console.log('message: ');
    console.log(message);
    if (!message) {
      console.log('entre1');
      return 'Mensaje inseperado!';
    }

    if (typeof message === 'string') {
      console.log('entre2');
      return message;
    }

    if ((message) instanceof Array) {
      console.log('entre3');
      return this.getMessage(message[0].msg);
    }

    if ((message) instanceof Object) {
      console.log('entre4');
      return this.getMessage(message.errors || message.error || message.message || message.messages);
    }
  }
}
