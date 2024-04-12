import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MessagesService } from '../../_services/messages.service';
import { Message } from '../../_models/message';
import { CommonModule } from '@angular/common';
import { TimeagoModule } from 'ngx-timeago';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  standalone: true,
  styleUrls: ['./member-messages.component.css'],
  imports: [CommonModule, TimeagoModule, FormsModule]
})
export class MemberMessagesComponent {
  @ViewChild('MessageForm') messageForm?: NgForm
  @Input() username?: string;
  messageContent = '';
  loading = false;
  constructor(public messageService: MessagesService) {
  }
  sendMessage() {
    this.loading = true;
    if (this.username == null) return;
    this.messageService.sendMessage(this.username, this.messageContent).then(() => {
      this.messageForm?.reset();
    }).finally(() => this.loading = false);
  }
}
