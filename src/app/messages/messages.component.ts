import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  constructor(public messageService: MessageService) { } //needs to be public to bind to template

  ngOnInit(): void {
  }

}
