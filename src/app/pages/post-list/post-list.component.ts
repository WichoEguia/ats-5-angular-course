import { Component, OnInit } from '@angular/core';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import Post from '../../models/Post';
import { PostsServiceService } from '../../services/posts-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, PostCardComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit {
  public posts: Post[] = [];

  public constructor(private postsService: PostsServiceService) { }

  ngOnInit() {
    this.postsService.getAllPosts()
      .subscribe((data: any) => {
        this.posts = data;
        console.log(this.posts);
      });
  }  
}
