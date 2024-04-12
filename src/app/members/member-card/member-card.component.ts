import { Component, Input } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { PresenceService } from '../../_services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent {
  @Input() member: Member | undefined;
  constructor(private memberService: MembersService,
    private tostr: ToastrService, public presenceService: PresenceService) {

  }
  addLikes(member: Member) {
    this.memberService.addLike(member.username).subscribe({
      next: () => this.tostr.success("you have liked " + member.knownAs)
    })
  }
}
