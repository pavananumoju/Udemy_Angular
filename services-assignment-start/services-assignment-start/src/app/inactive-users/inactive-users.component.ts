import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit{
  // @Input() users: string[];
   users: string[];
  // @Output() userSetToActive = new EventEmitter<number>();

  constructor(private userService: UserService){

  }

  ngOnInit(){
    this.users = this.userService.getInactiveUsers();
  }

  onSetToActive(id: number) {
    this.userService.onSetToActive(id);
    // this.userSetToActive.emit(id);
  }
}
