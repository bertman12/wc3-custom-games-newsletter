import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MediaFeatureComponent } from './media-feature/media-feature.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent },
  // {path: '**', redirectTo: '/', pathMatch: 'full'},
  {path: '**', component: HomeComponent},
  {path:"", component: HomeComponent}, //home-landing-page
  // {path:"login", component: AppComponent}, //login
  //{path:"game-review", component: GameReviewComponent}, //review
  {path:"media", component: MediaFeatureComponent}, //media-feature-component
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
