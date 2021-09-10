import { Injectable } from "@angular/core";
import { CounterService } from "./counter.service";

@Injectable()
export class UserService{
    activeUsers = ['Max', 'Anna'];
    inactiveUsers = ['Chris', 'Manu'];
    user:string;
    constructor(private counterService: CounterService){

    }

    getActiveUsers(){
        return this.activeUsers;
    }

    getInactiveUsers(){
        return this.inactiveUsers;
    }

    onSetToInactive(id: number) {
        this.user = this.activeUsers[id];
        this.inactiveUsers.push(this.user);
        this.activeUsers.splice(id, 1);
        this.counterService.logActivity(this.user+' SetToInactive');

    }

    onSetToActive(id: number) {
        this.user = this.inactiveUsers[id];
        this.activeUsers.push(this.inactiveUsers[id]);
        this.inactiveUsers.splice(id, 1);
        this.counterService.logActivity(this.user+' SetToActive');
    }


}