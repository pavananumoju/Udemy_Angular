import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class UserService{
    // isActivated = new EventEmitter<boolean>();
    isActivated = new Subject<boolean>();
}