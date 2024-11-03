import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import Post from '../../models/Post';
import { PostsService } from '../../services/posts-service.service';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../../sections/navigation/navigation.component';
import { NavItemComponent } from '../../sections/nav-item/nav-item.component';
import { Observable } from 'rxjs';
import { ModalContainerComponent } from '../../components/modal-container/modal-container.component';
import { PostFormComponent } from '../../sections/post-form/post-form.component';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import PostCategory from '../../models/PostCategory';

interface Tab {
  id: PostCategory,
  name: string,
  isActive: boolean,
  isDisabled: boolean
};

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
  public postsObserver!: Observable<Post[]>;
  public posts: Post[] = [];
  public modalRef?: NgbModalRef;
  public tabs: Tab[] = [];
  public hide: boolean = true;

  @ViewChild('content') content!: TemplateRef<any>;
  @ViewChild(PostFormComponent) postFormComponent?: PostFormComponent;

  public constructor(
    private postService: PostsService, 
    private modalService: NgbModal
  ) {
    this.tabs = [
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
        id: "lifestyle",
        name: "Lifestyle",
        isActive: false,
        isDisabled: false
      },
      {
        id: "meme",
        name: "Hidden knowledge",
        isActive: false,
        isDisabled: true
      },
    ];
  }

  ngOnInit() {
    this.loadPosts();
  }

  public loadPosts() {
    const category = this.getSelectedTab();
    this.postsObserver = this.postService.getPostsByCategory(category);
  }

  private getSelectedTab(): PostCategory {
    return this.tabs
      .filter((t: Tab) => t.isActive)
      .map((t: Tab) => t.id)[0] as PostCategory;
  }

  public changeTab(tabId: string) {
    this.tabs = this.tabs.map((tab: Tab) => {
      tab.isActive = false
      if (tab.id === tabId)
        tab.isActive = true;
      return tab;
    });
    this.loadPosts();
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

  public triggerSubmit() {
    this.postFormComponent?.onPostSubmit('create');
  }

  public showTheTruth() {
    const idx = this.tabs.findIndex((t) => t.id === 'meme');
    this.tabs[idx].isDisabled = true;
    this.hide = false;
  }

  public hideTheTruth() {
    const idx = this.tabs.findIndex((t) => t.id === 'meme');
    this.tabs[idx].isDisabled = false;
    this.hide = true;
  }

  public isNormalSection() {
    const tab = this.getSelectedTab();
    return (tab !== 'meme');
  }
}
