import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private counterSubscription: Subscription;
  private pipedObservable;
  private showActiveText = false;

  constructor(private userService: UserService) { }

  ngOnInit() {
      // this.counterSubscription = interval(1000).subscribe(
      //   (counter:number)=>{
      //     console.info(counter);
      //   }
      // );

      const customIntervalObservable = Observable.create(observer => {
        let count = 0;
        setInterval(() => {
          observer.next(count);
          if(count === 19){
            observer.complete();
          }
          if(count > 20){
            observer.error(new Error('Count is > 3'));
          }
          count++;
        }, 500);
      });    

      this.pipedObservable = customIntervalObservable.pipe(
        filter((data:number)=>{return (data+1) % 3 === 0 ? false : true}),
        map((data:number) => {return 'Round: '+ (data + 1)}))

      this.counterSubscription = this.pipedObservable.subscribe(data => {
        console.info(data);
      }, error => {
        console.log(error.message);
        alert('Error ! count > 3');
      }, () => {
        console.info('Completed!');
      });
  }

  ngOnDestroy(){
    this.counterSubscription.unsubscribe();
  }

  onActivate(){
    this.showActiveText = !this.showActiveText;
    this.userService.isActivated.next(this.showActiveText);
  }
}