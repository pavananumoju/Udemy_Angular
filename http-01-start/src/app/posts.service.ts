import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { Post } from "./Post.model";

@Injectable({
    providedIn: 'root'
})
export class PostsService{

    constructor(private http: HttpClient){}

    createPosts(title:string, content:string){
        const postData: Post = {title: title, content: content}
        return this.http
        .post<{name: string}>('https://angular-shopping-e3010-default-rtdb.firebaseio.com/posts.json', 
        postData,
        {
          observe: 'response'
        }
        );
    }

    fetchPosts(){
      let searchParams = new HttpParams();
      searchParams = searchParams.append('print','pretty');
      searchParams = searchParams.append('custom','prop');
        return this.http
        .get<{[key:string]: Post}>('https://angular-shopping-e3010-default-rtdb.firebaseio.com/posts.json',{
          headers: new HttpHeaders({'customHeader':'Hello'}),
          // params: new HttpParams().set('print','pretty')
          params: searchParams,
          responseType: 'json' //'text'
        })
        .pipe(map(responseData => {
          const postsArray: Post[] = [];
          for(const key in responseData){
            if(responseData.hasOwnProperty(key)){
              postsArray.push({ ...responseData[key], id:key})
            }
          } return postsArray;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
        );
    }

    clearPosts(){
      return this.http.delete('https://angular-shopping-e3010-default-rtdb.firebaseio.com/posts.json',
      {
        observe: 'events',
        responseType: 'text'
      }
      ).pipe(tap(event => {
        console.info(event);
        if(event.type === HttpEventType.Sent){
          // console.info()
        }
        if(event.type === HttpEventType.Response){
          console.info(event.body)
        }
      }));
    }

}