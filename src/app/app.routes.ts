import { Routes } from '@angular/router';
import { PostListComponent } from './pages/post-list/post-list.component';
import { PostViewComponent } from './pages/post-view/post-view.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "locations",
        pathMatch: "full"
    },
    {
        component: PostListComponent,
        path: "locations"
    },
    {
        component: PostViewComponent,
        path: "locations/:id"
    }
];
