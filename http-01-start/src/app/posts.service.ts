import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { Post } from "./Post.model";

@Injectable({
    providedIn: 'root'
})
export class PostsService{

    constructor(private http: HttpClient){}

    createPosts(title:string, content:string){
        const postData: Post = {title: title, content: content}
        return this.http
        .post<{name: string}>('https://angular-shopping-e3010-default-rtdb.firebaseio.com/posts.json', postData);
    }

    fetchPosts(){
        return this.http
        .get<{[key:string]: Post}>('https://angular-shopping-e3010-default-rtdb.firebaseio.com/posts.json')
        .pipe(map(responseData => {
          const postsArray: Post[] = [];
          for(const key in responseData){
            if(responseData.hasOwnProperty(key)){
              postsArray.push({ ...responseData[key], id:key})
            }
          } return postsArray;
        }));
    }

    clearPosts(){
      return this.http.delete('https://angular-shopping-e3010-default-rtdb.firebaseio.com/posts.json');
    }

}