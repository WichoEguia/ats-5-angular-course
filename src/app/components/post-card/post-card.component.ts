import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import Post from '../../models/Post';
import { CommonModule } from '@angular/common';
import { DateComponent } from '../date/date.component';
import { ActionButtonsComponent } from '../action-buttons/action-buttons.component';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [RouterModule, CommonModule, DateComponent, ActionButtonsComponent],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  @Input() post?: Post;
  
  constructor(private router: Router) { }

  viewPost() {
    this.router?.navigate(['/posts', this.post?.id]);
  }
}
