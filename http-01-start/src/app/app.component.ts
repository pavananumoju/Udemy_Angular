import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './Post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    // console.log(postData);
    this.http
      .post<{name: string}>('https://angular-shopping-e3010-default-rtdb.firebaseio.com/posts.json', postData)
      .subscribe(responseData => {
        console.info(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts(){
    this.isFetching = true;
    this.http
    .get<{[key:string]: Post}>('https://angular-shopping-e3010-default-rtdb.firebaseio.com/posts.json')
    .pipe(map(responseData => {
      const postsArray: Post[] = [];
      for(const key in responseData){
        if(responseData.hasOwnProperty(key)){
          postsArray.push({ ...responseData[key], id:key})
        }
      } return postsArray;
    }))
    .subscribe(posts =>{
      // console.info(posts);
      this.isFetching = false;
      this.loadedPosts = posts;
    });
  }
}
