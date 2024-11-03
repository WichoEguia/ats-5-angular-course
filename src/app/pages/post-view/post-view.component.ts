import { Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Post from '../../models/Post';
import { PostsService as PostsService } from '../../services/posts-service.service';
import { CommonModule } from '@angular/common';
import { PostFormComponent } from '../../sections/post-form/post-form.component';
import { DateComponent } from '../../components/date/date.component';
import { ActionButtonsComponent } from '../../components/action-buttons/action-buttons.component';
import { ModalContainerComponent } from '../../components/modal-container/modal-container.component';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post-view',
  standalone: true,
  imports: [
    CommonModule, 
    PostFormComponent, 
    DateComponent, 
    ActionButtonsComponent,
    ModalContainerComponent,
    PostFormComponent
  ],
  templateUrl: './post-view.component.html',
  styleUrls: [
    './post-view.component.scss',
  ]
})
export class PostViewComponent implements OnInit {
  public post?: Post;
  public modalRef?: NgbModalRef;

  @Output() deletePostEvent = new EventEmitter<void>();

  @ViewChild('content') content!: TemplateRef<any>;
  @ViewChild(PostFormComponent) postFormComponent?: PostFormComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostsService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    let postId = this.route.snapshot.paramMap.get('id');
    if (!postId) {
      this.router.navigateByUrl('/posts');
    }
    this.postService.getPost(postId as string)
      .subscribe((data: any) => this.post = data)
  }

  deletePost() {
    this.postService.deletePost(this.post?.id as string)
      .subscribe((res) => {
        console.log('Post deleted');
        this.router.navigate(['/']);
      });
  }

  editPost() {
    console.log(this.post?.id);
    this.modalRef = this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title', centered: true });
    this.modalRef.result.then(
      (result) => {
        console.log(`Closed with: ${result}`);        
      },
      (reason) => {
        console.log(`Dismissed ${this.getDismissReason(reason)}`);
      },
    ).finally(() => {
      this.postFormComponent = undefined;
    });
  }

  private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}

  public triggerSubmit() {
    this.postFormComponent?.onPostSubmit('update');
  }
}
