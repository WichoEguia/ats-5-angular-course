import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import Post from '../../models/Post';

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

  constructor(private formBuilder: FormBuilder) {}

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

  public onPostSubmit() {
    console.log(this.postForm?.value);
  }
}
