import { Injectable } from "@angular/core";

@Injectable()
export class CounterService{

    counter:number = 0;

    logActivity(activity:string){
        this.counter = this.counter + 1;
        console.info('Activity - '+activity+', count - '+this.counter);
    }
}