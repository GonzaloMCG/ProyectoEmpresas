import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from './message.service';
import { MessageObject } from './message.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-message-handler',
  templateUrl: './message-handler.component.html',
  styleUrls: ['./message-handler.component.scss'],
})
export class MessageHandlerComponent implements OnInit, OnDestroy {
  message: MessageObject;
  subscription: Subscription;
  visible = false;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.subscription = this.messageService.$messageSubject
      .pipe(filter(messageObject => !!messageObject.text))
      .subscribe(value => {
        this.message = value;
        this.visible = true;
        setTimeout(() => this.visible = false, value.duration);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  close() {
    this.visible = false;
  }
}
