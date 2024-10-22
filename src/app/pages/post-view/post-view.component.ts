import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Post from '../../models/Post';
import { PostsServiceService as PostsService } from '../../services/posts-service.service';
import { CommonModule } from '@angular/common';
import { PostFormComponent } from '../../sections/post-form/post-form.component';

@Component({
  selector: 'app-post-view',
  standalone: true,
  imports: [CommonModule, PostFormComponent],
  templateUrl: './post-view.component.html',
  styleUrls: [
    './post-view.component.scss',
  ]
})
export class PostViewComponent implements OnInit {
  public post?: Post;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService
  ) { }

  ngOnInit() {
    let postId = this.route.snapshot.paramMap.get('id');
    if (!postId) {
      this.router.navigateByUrl('/posts');
    }
    this.postsService.getPost(postId as string)
      .subscribe((data: any) => this.post = data)
  }
}
