import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RolesResponse } from '../../interfaces/roles-response';

@Component({
  selector: 'app-role-list2',
  imports: [
    MatIconModule
  ],
  templateUrl: './role-list2.component.html',
  styleUrl: './role-list2.component.scss'
})
export class RoleList2Component {
  @Input({required : true}) roles! : RolesResponse[] | null;
  @Output() deleteRole : EventEmitter<string> = new EventEmitter<string>();

  delete(id : string)
  {
    this.deleteRole.emit(id);
  }
}
