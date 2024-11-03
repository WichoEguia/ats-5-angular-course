import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import Post from '../../models/Post';
import { PostsServiceService } from '../../services/posts-service.service';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../../sections/navigation/navigation.component';
import { NavItemComponent } from '../../sections/nav-item/nav-item.component';
import { map } from 'rxjs';
import { ModalContainerComponent } from '../../components/modal-container/modal-container.component';
import { PostFormComponent } from '../../sections/post-form/post-form.component';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

interface Tab {
  id: string,
  name: string,
  isActive: boolean,
  isDisabled: boolean
};

type Category = { [key: string]: Post[] }

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    CommonModule, 
    PostCardComponent, 
    NavigationComponent, 
    NavItemComponent, 
    ModalContainerComponent, 
    PostFormComponent
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit {
  @ViewChild('content') content!: TemplateRef<any>;
  @ViewChild(PostFormComponent) postFormComponent?: PostFormComponent;
  
  private categories?: Category;
  public posts: Post[] = [];
  public tabs: Tab[] = [
    {
      id: "real",
      name: "Places",
      isActive: true,
      isDisabled: false
    },
    {
      id: "fiction",
      name: "Fictional places",
      isActive: false,
      isDisabled: false
    },
    {
      id: "meme",
      name: "Lifestyle",
      isActive: false,
      isDisabled: false
    },
    {
      id: "hknowledge",
      name: "Hidden knowledge",
      isActive: false,
      isDisabled: true
    },
  ];
  public modalRef?: NgbModalRef;

  public constructor(
    private postService: PostsServiceService, 
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.loadPosts();
  }

  private loadPosts() {
    this.postService.getAllPosts()
      .pipe(
        map((posts: Post[]) =>
          posts.reduce((grouped, post) => {
            (grouped[post.category] = grouped[post.category] || []).push(post);
            return grouped;
          }, {} as { [key: string]: Post[] })
        )
      )
      .subscribe((data: any) => {
        this.categories = data;
        console.log(this.categories);
        const category = this.getSelectedTab();
        if (this.categories) {
          this.posts = this.categories[category] || [];
        }
      });
  }

  private getSelectedTab(): string {
    return this.tabs
      .filter((t: Tab) => t.isActive)
      .map((t: Tab) => t.id)[0];
  }

  public changeTab(tabId: string) {
    this.tabs = this.tabs.map((tab: Tab) => {
      tab.isActive = false
      if (tab.id === tabId)
        tab.isActive = true;
      return tab;
    });
    const category = this.getSelectedTab();
    if (this.categories) {
      this.posts = this.categories[category] || [];
    }
  }

  public createPost()  {
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

  public triggerSubmit(type: 'create' | 'update') {
    this.postFormComponent?.onPostSubmit(type);
  }
}
