import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";

export class LoggingInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler){
        console.info('Outgoing Request: ');
        console.info(req.headers);
        console.info(req.url);
        return next.handle(req).pipe(tap(event => {
            if(event.type === HttpEventType.Response){
                console.info('Incoming Response');
                console.info(event.body);
            }
        }));
    }
}