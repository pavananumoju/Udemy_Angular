import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  activated: boolean = false;
  activeSub: Subscription;
  constructor(private userService:UserService) {}

  ngOnInit() {
    this.activeSub = this.userService.isActivated.subscribe((isActivated:boolean)=>{
      this.activated = isActivated;
    });
  }

  ngOnDestroy(){
    this.activeSub.unsubscribe();
  }

}
