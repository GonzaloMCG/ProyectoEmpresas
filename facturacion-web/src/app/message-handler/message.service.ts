import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MessageObject } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public $messageSubject = new BehaviorSubject<MessageObject>(new MessageObject());

  constructor() { }

  showError(text: string, duration?: number) {
    const message = new MessageObject();
    message.text = text;
    message.duration = duration ? duration : 3000;
    message.type = 'error';
    this.$messageSubject.next(message);
  }

  showSuccess(text: string, duration?: number) {
    const message = new MessageObject();
    message.text = text;
    message.duration = duration ? duration : 3000;
    message.type = 'success';
    this.$messageSubject.next(message);
  }
}
