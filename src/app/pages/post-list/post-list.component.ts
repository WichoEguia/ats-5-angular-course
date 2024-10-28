import { Component, OnInit } from '@angular/core';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import Post from '../../models/Post';
import { PostsServiceService } from '../../services/posts-service.service';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../../sections/navigation/navigation.component';
import { NavItemComponent } from '../../sections/nav-item/nav-item.component';
import { map } from 'rxjs';

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
  imports: [CommonModule, PostCardComponent, NavigationComponent, NavItemComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss'
})
export class PostListComponent implements OnInit {
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
  ]

  public constructor(private postsService: PostsServiceService) { }

  ngOnInit() {
    this.loadPosts();
  }

  private loadPosts() {
    this.postsService.getAllPosts()
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
}
