import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Post from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostsServiceService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  public getAllPosts() {
    return this.http.get(`${this.baseUrl}/posts`);
  }

  public getPost(postId: string) {
    return this.http.get(`${this.baseUrl}/posts/${postId}`);
  }
}
