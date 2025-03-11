import { Component, inject } from '@angular/core';
import { RoleFormComponent } from "../../_components/role-form/role-form.component";
import { RoleService } from '../../_services/role.service';
import { RoleCreateRequest } from '../../interfaces/role-create-request';

@Component({
  selector: 'app-role',
  imports: [RoleFormComponent],
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent {
  roleService = inject(RoleService);
  errorMessage = '';
  role : RoleCreateRequest = {} as RoleCreateRequest;

  createRole(role : RoleCreateRequest)
  {
    this.roleService.createRole(role).subscribe({
      next : (response : {message : string}) => {
        // 3:11:14
      }
    });
  }
}
