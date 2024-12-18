import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import Post from '../../models/Post';
import { PostsService } from '../../services/posts-service.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.scss'
})
export class PostFormComponent implements OnInit {
  public postForm: FormGroup = new FormGroup({});

  @Input() post?: Post;

  @Output() createdPostEvent = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostsService
  ) {}

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.postForm = this.formBuilder.group({
      title: [this.post?.title ?? '', Validators.required],
      description: [this.post?.description ?? '', Validators.required],
      image: [this.post?.image ?? '', Validators.required],
      category: [this.post?.category ?? '', Validators.required]
    })
  }

  public onPostSubmit(type: 'create' | 'update') {
    this.buildPost();
    switch (type) {
      case 'create':
        this.postService.createPost(this.post as Post)
          .subscribe((res) => {
            console.log('Post created');
            swal("All Good!", "Post created succesfully!", "success");
          })
        this.createdPostEvent.emit();
        break;
      case 'update':
        this.postService.updatePost(this.post as Post)
          .subscribe((res) => {
            console.log('Post updated');
            swal("All Good!", "Post updated succesfully!", "success");
          });
        break;
    }
  }

  public buildPost() {
    if (!this.post) {
      this.post = {} as Post;
    }
    (this.post as Post).title = this.postForm.value.title;
    (this.post as Post).description = this.postForm.value.description;
    (this.post as Post).image = this.postForm.value.image;
    (this.post as Post).category = this.postForm.value.category;
    (this.post as Post).updatedAt = this.post?.createdAt ? new Date().toDateString() : undefined;
    (this.post as Post).createdAt = this.post?.createdAt ?? new Date().toDateString();
    (this.post as Post).id = this.post?.id ?? crypto.randomUUID();
    console.log(this.post);
  }
}
