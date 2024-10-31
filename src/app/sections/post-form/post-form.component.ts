import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import Post from '../../models/Post';
import { PostsServiceService } from '../../services/posts-service.service';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss'
})
export class PostFormComponent implements OnInit {
  public postForm: FormGroup = new FormGroup({});

  @Input() post!: Post;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostsServiceService
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.postForm = this.formBuilder.group({
      title: [this.post.title ?? '', Validators.required],
      description: [this.post.description ?? '', Validators.required],
      image: [this.post.image ?? '', Validators.required],
      category: [this.post.category ?? '', Validators.required]
    })
  }

  public onPostSubmit() {
    this.buildPost();
    console.log(this.post);
    this.postService.upsertPost(this.post).subscribe((res) =>
      console.log('Post updated'));
  }

  public buildPost() {
    this.post.title = this.postForm.value.title;
    this.post.description = this.postForm.value.description;
    this.post.image = this.postForm.value.image;
    this.post.category = this.postForm.value.category;
    this.post.createdAt = this.post.createdAt ?? new Date().toDateString();
    this.post.updatedAt = this.post.createdAt ? new Date().toDateString() : undefined;
    this.post.id = this.post.id ?? crypto.randomUUID();
  }
}
