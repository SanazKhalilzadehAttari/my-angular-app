import { Component, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TabDirective, TabsModule, TabsetComponent } from 'ngx-bootstrap/tabs';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TimeagoModule } from 'ngx-timeago';
import { MemberMessagesComponent } from '../member-messages/member-messages.component';
import { MessagesService } from '../../_services/messages.service';
import { Message } from '../../_models/message';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  standalone: true,
  styleUrls: ['./member-detail.component.css'],
  imports: [CommonModule, TabsModule, GalleryModule, TimeagoModule, MemberMessagesComponent]
})
export class MemberDetailComponent implements OnInit {
  member: Member = {} as Member;
  images: GalleryItem[] = [];
  @ViewChild('memberTabs',{ static: true }) memberTabs?: TabsetComponent;
  activeTab?: TabDirective;
  messages: Message[] = [];

  constructor(private memberService: MembersService, private route: ActivatedRoute,
    private messageService: MessagesService
  ) {

  }
  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => this.member = data['member']
    })
  //  this.loadMember();
  }
  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === "Messages") {
      this.loadMessages();
      this.route.queryParams.subscribe({
        next: params => {
          console.log('params', params);
          params['tab'] && this.selectTab(params['tab'])
        }
      })
      this.getImages();
    }
  }
  selectTab(heading: string) {
    if (this.memberTabs) {
      this.memberTabs.tabs.find(x => x.heading === heading)!.active = true;
    }
  }
  loadMessages() {
    if (this.member) {
      this.messageService.getMessageThreads(this.member.username).subscribe({
        next: messages => this.messages = messages
      })
    }
  }
  
  getImages() {
    if (!this.member) return;
    //if (this.member.photos.length == 0) { return; }
    for (const photo of this.member.photos) {
      this.images.push(new ImageItem({ src: photo.url, thumb: photo.url }))
    }
  }
}
