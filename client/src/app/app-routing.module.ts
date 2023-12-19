import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'follower-following/:id',
    loadChildren: () => import('./pages/follower-following/follower-following.module').then( m => m.FollowerFollowingPageModule)
  },
  {
    path: 'showposts/:id',
    loadChildren: () => import('./pages/showposts/showposts.module').then( m => m.ShowpostsPageModule)
  },
  {
    path: 'editprofile/:id',
    loadChildren: () => import('./pages/editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
  {
    path: 'settings/:id',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'youractivity/:id',
    loadChildren: () => import('./pages/youractivity/youractivity.module').then( m => m.YouractivityPageModule)
  },
  {
    path: 'archive/:id',
    loadChildren: () => import('./pages/archive/archive.module').then( m => m.ArchivePageModule)
  },
  {
    path: 'closefriends/:id',
    loadChildren: () => import('./pages/closefriends/closefriends.module').then( m => m.ClosefriendsPageModule)
  },
  {
    path: 'saved/:id',
    loadChildren: () => import('./pages/saved/saved.module').then( m => m.SavedPageModule)
  },
  {
    path: 'showsingleprofile/:id',
    loadChildren: () => import('./pages/showsingleprofile/showsingleprofile.module').then( m => m.ShowsingleprofilePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
