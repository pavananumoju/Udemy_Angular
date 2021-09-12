import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') formObj : NgForm;
  levelSelect = ['Basic', 'Advanced', 'Pro'];
  defaultSelectVal = 'Basic';
  userData = {
    email : '',
    level: ''
  }

  onSubmit(){
    console.info(this.formObj.value);
    this.userData.email = this.formObj.value.email;
    this.userData.level = this.formObj.value.level;
  }

}
