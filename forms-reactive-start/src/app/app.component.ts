import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  signUpForm: FormGroup;

  genders = ['male', 'female'];

  ngOnInit(){
    this.signUpForm = new FormGroup({
      'userData' : new FormGroup({
        'username' : new FormControl(null, Validators.required),
        'email' : new FormControl(null, [Validators.email, Validators.required])
      }),
      'gender' : new FormControl('male')
    });
  }

  onSubmit(){
    console.info(this.signUpForm);
  }
}
