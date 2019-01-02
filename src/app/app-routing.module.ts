import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WishlistDetailsComponent} from './wishlist-details/wishlist-details.component';
import {WishlistFormComponent} from './wishlist-form/wishlist-form.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'wishlistDetails', component:WishlistDetailsComponent},
  {path:'addItemToWishlist', component:WishlistFormComponent},
  {path:'home', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
