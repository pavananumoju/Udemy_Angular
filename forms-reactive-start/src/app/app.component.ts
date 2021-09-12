import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  signUpForm: FormGroup;
  forbiddenUserNames = ['Chris', 'Anna'];
  genders = ['male', 'female'];

  ngOnInit(){
    this.signUpForm = new FormGroup({
      'userData' : new FormGroup({
        'username' : new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email' : new FormControl(null, [Validators.email, Validators.required], this.forbiddenEmails)
      }),
      'gender' : new FormControl('male'),
      'hobbies' : new FormArray([])
    });
  }

  onSubmit(){
    console.info(this.signUpForm);
  }

  addHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control)
  }

  getControls() {
    return (<FormArray>this.signUpForm.get('hobbies')).controls;
  }

  forbiddenNames(control: FormControl): {[s:string]:boolean}{
    if(this.forbiddenUserNames.indexOf(control.value) !== -1){
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable <any> {
    const promise = new Promise((resolve, reject)=>{
      setTimeout(() => {
        if(control.value === 'test@test.com'){
          resolve({'forbiddenEmail':true});
        }else{
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

}
