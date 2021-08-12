import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/_models/game.model';
import { GamesService } from 'src/app/_services/games.service';

@Component({
  selector: 'app-game-reviews-list-item',
  templateUrl: './game-reviews-list-item.component.html',
  styleUrls: ['./game-reviews-list-item.component.css']
})
export class GameReviewsListItemComponent implements OnInit {
  constructor(private gameService:GamesService) { }
  
  localGamesArr:Game[] = [];
  
  ngOnInit(){
    this.gameService.getGames();
    this.gameService.gameListModified.subscribe((games)=> {
      this.localGamesArr = games;
    });
  }

  onEdit(game: Game){
    this.gameService.editGame(game);
  }

  onNewGame(){
    this.gameService.isEditing = false;
  }
  
  onDelete(game: Game){
    let response = confirm('Are you sure you want to delete game?');
    if(response === true){
      this.gameService.deleteGame(game.id);
    }
  }
}

