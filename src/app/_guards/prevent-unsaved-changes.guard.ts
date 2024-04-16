import { CanActivateFn, CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { inject } from '@angular/core';
import { ConfirmService } from '../_services/confirm.service';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component) => {
  const confirmationService = inject(ConfirmService);
  if (component.editForm?.dirty) {
    return confirmationService.confirm();
  }
  return true;
};
