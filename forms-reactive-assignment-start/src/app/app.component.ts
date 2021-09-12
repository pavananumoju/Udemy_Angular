import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectStatuses = ['Stable', 'Critical', 'Finished'];
  projectForm : FormGroup;

  ngOnInit(){ 
    this.projectForm = new FormGroup({
      'projectName' : new FormControl(null, [Validators.required, this.forbiddenProjectNameSync.bind(this)], this.forbiddenProjectNameAsync.bind(this)),
      'projectEmail' : new FormControl(null, [Validators.required, Validators.email]),
      'projectStatus' : new FormControl(['Critical'])
    });
  }

  forbiddenProjectNameSync(control: FormControl): {[s:string]:boolean}{
    if(control.value === 'Test Sync'){
      return {'forbiddenNameSync':true};
    } else{
      return null;
    }
  }

  forbiddenProjectNameAsync(control: FormControl): Promise<any> | Observable<any>{
    const promise = new Promise((resolve, reject)=>{
      setTimeout(() => {
        if(control.value === 'Test Async'){
          resolve ({'forbiddenNameAsync':true});
        } else{
          resolve (null);
        }
      }, 1500);
    });
    return promise;
  }

  onSubmit(){
    console.info(this.projectForm);
  }

}
