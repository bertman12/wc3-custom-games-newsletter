import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { GameReviewComponent } from './game-review/game-review.component';
import { GameReviewsListComponent } from './game-reviews-list/game-reviews-list.component';

const routes: Routes = [
  {path: "login", component: LoginComponent },
  {path:"", component: HomeComponent}, //home-landing-page
  {path:"game-reviews-list", component: GameReviewsListComponent}, //list of all games
  {path:"game-reviews-list/:id", component: GameReviewComponent}, // load review by id
  {path:"game-reviews-list/create/:id", component: GameReviewComponent}, //edit review by id
  {path:"game-reviews-list/edit/:id", component: GameReviewComponent}, //edit review by id
  {path:"game-reviews-list/delete/:id", component: GameReviewComponent}, //delete review by id
  {path:"register", component: RegisterComponent},


  {path:"**", redirectTo: '', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
