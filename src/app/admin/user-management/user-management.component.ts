import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { UserModel } from '../../_models/userModel';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from '../../modals/roles-modal/roles-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: UserModel[] = [];
  bsModalRef: BsModalRef<RolesModalComponent> = new BsModalRef<RolesModalComponent>();
  availableRoles = ['Admin', 'Modarator', 'Member'];
  constructor(private adminService: AdminService, private modalService: BsModalService) {

  }
  ngOnInit(): void {
    this.getUsersWithRoles();
 
    }
  getUsersWithRoles() {
    this.adminService.getUsersWithRoles().subscribe({
      next: users => {this.users = users;
       console.log('users', this.users)}
    })
  
  }
  
  openRolesModal(user: UserModel) {
    console.log('user from management', user);
    const config = {
      class: 'modal-dialog-centerd',
      initialState: {
        username: user.username,
        availableRoles: this.availableRoles,
        selectedRoles: [...user.roles]

      }
    }
    console.log('config', config);
    this.bsModalRef = this.modalService.show(RolesModalComponent, config);
    this.bsModalRef.onHide?.subscribe({
      next: () => {
        const selectedRoles = this.bsModalRef.content?.selectedRoles;
        if (!this.arrayEqual(selectedRoles!, user.roles)) {
          this.adminService.updateUserRoles(user.username, selectedRoles!).subscribe({
            next: roles => user.roles = roles
          });
        }
      }
    })
   
 
  }
  private arrayEqual(arr1: any[], arr2: any[]) {
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
  }
}
