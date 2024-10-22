import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
  @Input() postId: number | undefined;
  
  constructor(private router: Router) { }

  viewPost() {
    this.router?.navigate(['/posts', this.postId]);
  }
}
