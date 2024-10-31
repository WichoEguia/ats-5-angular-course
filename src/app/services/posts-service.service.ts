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

  public getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`);
  }

  public getPost(postId: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${postId}`);
  }

  public deletePost(postId: string): Observable<Post> {
    return this.http.delete<Post>(`${this.baseUrl}/posts/${postId}`);
  }
}
