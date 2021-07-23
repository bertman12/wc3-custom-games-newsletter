import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { MediaFeatureComponent } from './media-feature/media-feature.component';
import { GameReviewComponent } from './game-review/game-review.component';
import { PlayVideoDirective } from './custom-directives/play-video.directive';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { GamesService } from './_services/games.service';
import { GameReviewsListComponent } from './game-reviews-list/game-reviews-list.component';
import { GameReviewsListItemComponent } from './game-reviews-list/game-reviews-list-item/game-reviews-list-item.component';
import { ExpandOptionsDirective } from './custom-directives/expand-options.directive';

import { UserService } from './_services/user.service';
import { CommentService } from './_services/comment.service';
import { AuthService } from './_services/auth.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { GameCommentComponent } from './game-review/game-comment/game-comment.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    MediaFeatureComponent,
    GameReviewComponent,
    PlayVideoDirective,
    RegisterComponent,
    GameReviewsListComponent,
    GameReviewsListItemComponent,
    ExpandOptionsDirective,
    GameCommentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    [HttpClientModule],
    NoopAnimationsModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [
    GamesService,
    AuthService,
    UserService,
    CommentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
