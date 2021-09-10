import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit{
  // @Input() users: string[];
    users: string[];
  // @Output() userSetToInactive = new EventEmitter<number>();

  constructor(private userService: UserService){

  }

  ngOnInit(){
    this.users = this.userService.getActiveUsers();
  }

  onSetToInactive(id: number) {
    this.userService.onSetToInactive(id);
    // this.userSetToInactive.emit(id);
  }
}
