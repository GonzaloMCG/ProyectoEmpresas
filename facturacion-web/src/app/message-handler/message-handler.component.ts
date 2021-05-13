import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from './message.service';
import { MessageObject } from './message.model';

@Component({
  selector: 'app-message-handler',
  templateUrl: './message-handler.component.html',
  styleUrls: ['./message-handler.component.scss'],
})
export class MessageHandlerComponent implements OnInit, OnDestroy {
  message: MessageObject;
  subscription: Subscription;
  visible = false;

  constructor(public messageService: MessageService) { }

  ngOnInit() {
    this.subscription = this.messageService.$messageSubject
      .subscribe(value => {
        this.visible = true;
        this.message = value;
        setTimeout(() => this.visible = false, this.message.duration);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  close() {
    this.visible = false;
  }
}
