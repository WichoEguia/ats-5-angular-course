import { Routes } from '@angular/router';
import { PostListComponent } from './pages/post-list/post-list.component';
import { PostViewComponent } from './pages/post-view/post-view.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "posts",
        pathMatch: "full"
    },
    {
        component: PostListComponent,
        path: "posts"
    },
    {
        component: PostViewComponent,
        path: "posts/:id"
    }
];
