import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPage } from './pages/admin-page/admin-page';
import { MainPage } from './pages/main-page/main-page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
  },
  {
    path: 'admin',
    component: AdminPage,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
