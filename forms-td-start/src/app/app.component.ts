import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signUpForm: NgForm;
  defaultSelectVal = 'pet';
  answer = ''
  genders = ['male', 'female'];
  userDataObj = {
    username : ''
  }
  isFormSubmitted:boolean = false;

  suggestUserName() {
    const suggestedName = 'Superuser';
    this.signUpForm.form.patchValue({
      userData:{
        username: suggestedName
      }
    });
  }

  onSubmit(){
    console.info(this.signUpForm);
    this.isFormSubmitted = true;
    this.userDataObj.username = this.signUpForm.value.userData.username;
    this.signUpForm.reset();
  }
}
