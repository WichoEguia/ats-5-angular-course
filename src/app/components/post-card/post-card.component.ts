import { Component, ContentChild, EventEmitter, inject, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Post from '../../models/Post';
import { CommonModule } from '@angular/common';
import { DateComponent } from '../date/date.component';
import { ActionButtonsComponent } from '../action-buttons/action-buttons.component';
import { PostsService } from '../../services/posts-service.service';
import { ModalDismissReasons, NgbModal, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PostFormComponent } from '../../sections/post-form/post-form.component';
import { ModalContainerComponent } from '../modal-container/modal-container.component';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule, 
    DateComponent, 
    ActionButtonsComponent,
    PostFormComponent,
    ModalContainerComponent
  ],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  @Input() post?: Post;

  @Output() deletePostEvent = new EventEmitter<void>();

  @ViewChild('content') content!: TemplateRef<any>;
  @ViewChild(PostFormComponent) postFormComponent?: PostFormComponent;
  
  public modalRef?: NgbModalRef;

  constructor(
    private router: Router, 
    private postService: PostsService,
    private modalService: NgbModal
  ) { }

  viewPost() {
    this.router?.navigate(['/locations', this.post?.id]);
  }

  deletePost() {
    this.postService.deletePost(this.post?.id as string).subscribe((res) => 
      console.log('Post deleted'));
    this.deletePostEvent.emit();
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
