import {  Component, Input, OnInit } from '@angular/core';
import { Game } from '../models/game.model';
import { GamesService } from '../_services/games.service';

@Component({
  selector: 'app-media-feature',
  templateUrl: './media-feature.component.html',
  styleUrls: ['./media-feature.component.css']
})
export class MediaFeatureComponent implements OnInit {

  constructor(private gameService: GamesService) {}
  @Input() game: Game = 
  {title: "Uther Party", 
  author: "guy",
  description: "classic warcraft 3 game",
  publishDate: {month: "January", day: 1, year: 2005},
  videoSrc: "",
  imgSrc: "" }

  
  gameTitle:string = "Game Name";
  showImage: boolean = false;

  ngOnInit(): void {}

}
