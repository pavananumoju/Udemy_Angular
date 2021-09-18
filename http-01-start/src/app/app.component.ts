import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './Post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  errorTitle = null;
  errorMessage = null;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postsService.fetchPosts()
    .subscribe(posts =>{
      this.isFetching = false;
      this.loadedPosts = posts;
    }, (error:HttpErrorResponse) => {
      this.isFetching = false;
      this.errorTitle = error.status + ' : '+error.error.error;
      this.errorMessage = error.message;
      console.info(error);
    });
  }

  onCreatePost(postData: Post) {
    // Send Http request
    // console.log(postData);
    this.postsService.createPosts(postData.title, postData.content).subscribe(responseData => {
      this.onFetchPosts();
    })
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPosts()
    .subscribe(posts =>{
      this.isFetching = false;
      this.loadedPosts = posts;
    }, error => {
      this.isFetching = false;
      this.errorTitle = error.status + ' : '+error.error.error;
      this.errorMessage = error.message;
    });
  }

  onClearPosts() {
    // Send Http request
    this.postsService.clearPosts().subscribe(responseData => {
      this.loadedPosts = []
    });
  }

}
