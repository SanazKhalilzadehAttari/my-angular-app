import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { PresenceService } from '../../_services/presence.service';
import { AccountService } from '../../_services/account.service';
import { UserModel } from '../../_models/userModel';
import { take } from 'rxjs';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  standalone: true,
  styleUrls: ['./member-detail.component.css'],
  imports: [CommonModule, TabsModule, GalleryModule, TimeagoModule, MemberMessagesComponent]
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  member: Member = {} as Member;
  images: GalleryItem[] = [];
  @ViewChild('memberTabs',{ static: true }) memberTabs?: TabsetComponent;
  activeTab?: TabDirective;
  messages: Message[] = [];
  user?: UserModel;

  constructor(private accountService: AccountService, private route: ActivatedRoute,
    private messageService: MessagesService, public presenceService:PresenceService
  ) {
    accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) this.user = user;
      }
    })
  }
  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
    }
  ngOnInit(): void {
    this.route.data.subscribe({
      next: data => this.member = data['member']
    })
  //  this.loadMember();
  }
  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === "Messages" && this.user) {
      this.loadMessages();
      this.messageService.createHubConnection(this.user, this.member.username);
      this.route.queryParams.subscribe({
        next: params => {
          console.log('params', params);
          params['tab'] && this.selectTab(params['tab'])
        }
      })
      this.getImages();
    } else {
      this.messageService.stopHubConnection();
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
