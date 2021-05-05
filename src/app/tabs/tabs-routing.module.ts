import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'todo',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./home/home.module').then((m) => m.HomePageModule),
          },
        ],
      },
      {
        path: 'movie',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./movies/movies.module').then((m) => m.MoviesPageModule),
          },
          {
            path: 'detail/:id',
            loadChildren: () =>
              import('./movies/movie-detail/movie-detail.module').then(
                (m) => m.MovieDetailPageModule
              ),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/tabs/todo',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/todo',
    pathMatch: 'full',
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./movies/movies.module').then((m) => m.MoviesPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
