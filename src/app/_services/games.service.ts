import { Injectable, Output, EventEmitter, OnInit } from '@angular/core';
import { Game } from '../models/game.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GamesService implements OnInit{

  // gameList: Game[] = [
    
  //   {
  //   id: 0,  
  //   title: "Uther Party", 
  //   author: "TheZizz",
  //   description: "Play a variety of randomly selected mini-games against your opponents.\
  //    A highly appraised warcraft classic, this custom game has been a benchmark for other\
  //    content creators when it comes to interesting and fun gameplay.",
  //   featureDescriptions: ['FeatureDesc1','FeatureDesc2','FeatureDesc3',],
  //   featureImages: ['../../assets/Warcraft-III-generic-image-half-size.png','../../arthas-evil-hr-flipped.jpg','../../orc-hr.jpg'],
  //   genre: 'Mini Games',
  //   version: '10.0',
  //   rating: '5',
  //   publishDate: {month: "September", day: 4, year: 2009},
  //   videoSrc: "../../assets/Action 7-3-2021 3-09-01 PM.mp4",
  //   imgSrc: "../../assets/Warcraft-III-generic-image-half-size.png" },
  //   {
  //   id: 1,
  //   title: "Castle Fight", 
  //   author: "Sunus",
  //   description: "You and your team must pick the correct composition of units to counter the enemy team's army.\
  //   You also have access to multiple races, each offering their own unique pros and cons. The goal is to \
  //   overwhelm the enemy team with your army before they do you.",
  //   featureDescriptions: ['FeatureDesc1','FeatureDesc2','FeatureDesc3'],
  //   featureImages: ['../../assets/Warcraft-III-generic-image-half-size.png','../../arthas-evil-hr-flipped.jpg','../../orc-hr.jpg'],
  //   genre: 'Strategy',
  //   version: '2.0.40',
  //   rating: '5',
  //   publishDate: {month: "September", day: 27, year: 2020},
  //   videoSrc: "../../assets/Action 7-3-2021 3-09-01 PM.mp4",
  //   imgSrc: "../../assets/Warcraft-III-generic-image-half-size.png" },
  //   {
  //   id: 2,  
  //   title: "Legion Tower Defense", 
  //   author: "Lisk",
  //   description: "This game is a mix between a tower defense and a wave defense.\
  //   You control a builder that has to build non controllable units to defend your king.\
  //   Your resources are limited so you can strategize to save for more expensive units while\
  //   being weak for the current round and securing the next rounds, or if you fear losing\
  //   you can build cheaper units to get by. The game has gained so much popularity that it\
  //   was remade and sold on Steam as Legion Tower Defense 2.",
  //   featureDescriptions: ['FeatureDesc1','FeatureDesc2','FeatureDesc3'],
  //   featureImages: ['../../assets/Warcraft-III-generic-image-half-size.png','../../arthas-evil-hr-flipped.jpg','../../orc-hr.jpg'],
  //   genre: 'Tower Defense/Wave Defense',
  //   version: '3.41',
  //   rating: '4',
  //   publishDate: {month: "January", day: 1, year: 2009},
  //   videoSrc: "../../assets/Action 7-3-2021 3-09-01 PM.mp4",
  //   imgSrc: "../../assets/Warcraft-III-generic-image-half-size.png" },
  //   {
  //   id: 3,  
  //   title: "Dota All-stars", 
  //   author: "Icefrog and others",
  //   description: 
  //   "A classic custom game mode that has been around even before warcraft 3 originating from a Starcraft custom game called Aeon of Strife\
  //   .Dota All-Stars started as a custom game made and updated by several creators which eventually led to the popular MOBA genre\
  //   giving birth to new MOBA games like League of Legends, Heroes of the Storm, and Dota 2.",
  //   featureDescriptions: ['FeatureDesc1','FeatureDesc2','FeatureDesc3'],
  //   featureImages: ['../../assets/Warcraft-III-generic-image-half-size.png','../../arthas-evil-hr-flipped.jpg','../../orc-hr.jpg'],
  //   genre: 'MOBA',
  //   version: '6.88',
  //   rating: '5',
  //   publishDate: {month: "January", day: 1, year: 2005},
  //   videoSrc: "../../assets/Action 7-3-2021 3-09-01 PM.mp4",
  //   imgSrc: "../../assets/Warcraft-III-generic-image-half-size.png" },
  //   {
  //   id: 4,  
  //   title: "Footman Frenzy", 
  //   author: "miRaculix",
  //   description: "A brawl between 4 teams and their armies led by a unique hero of the player's choice\
  //   to sway the battle in their team's favour. The objective is to wipe out the enemy teams and be the last\
  //   team standing.",
  //   featureDescriptions: ['FeatureDesc1','FeatureDesc2','FeatureDesc3'],
  //   featureImages: ['../../assets/Warcraft-III-generic-image-half-size.png','../../arthas-evil-hr-flipped.jpg','../../orc-hr.jpg'],
  //   genre: 'Brawl Arena',
  //   version: '5.7.2',
  //   rating: '5',
  //   publishDate: {month: "May", day: 24, year: 2021},
  //   videoSrc: "../../assets/Action 7-3-2021 3-09-01 PM.mp4",
  //   imgSrc: "../../assets/Warcraft-III-generic-image-half-size.png" },
  //   {
  //   id: 5,  
  //   title: "Warcraft Battle Royale", 
  //   author: "Nudl",
  //   description: "A warcraft themed battle royale map, featuring the same scheme as other battle royales,\
  //   such as an enclosing circle of death as time goes on; but now in the warcraft engine. You can choose from\
  //   a tavern of heroes for your survivor. Throughout the game you will be able to kill enemy encampments and recruit\
  //   your own mercenaries. There is a wide range of mercenaries for you to hire so choose carefully and defeat your\
  //   fellow enemy players.",
  //   featureDescriptions: ['FeatureDesc1','FeatureDesc2','FeatureDesc3'],
  //   featureImages: ['../../assets/Warcraft-III-generic-image-half-size.png','../../arthas-evil-hr-flipped.jpg','../../orc-hr.jpg'],
  //   genre: 'Battle Royale',
  //   version: '2.00.21',
  //   rating: '5',
  //   publishDate: {month: "July", day: 9, year: 2021},
  //   videoSrc: "../../assets/Action 7-3-2021 3-09-01 PM.mp4",
  //   imgSrc: "../../assets/Warcraft-III-generic-image-half-size.png" },
  //   {
  //   id: 6,  
  //   title: "Island Defense", 
  //   author: "IAmDragon & Remixer",
  //   description: "Island Defense is a survival tower defense game where you can choose to be a naga, demon or other races.\
  //   Each race offers there own unique qualities which you must use to try and survive until the 45 minute timer ends. All the\
  //   while a rampaging island titan is trying to kill your and your allies.",
  //   featureDescriptions: ['FeatureDesc1','FeatureDesc2','FeatureDesc3'],
  //   featureImages: ['../../assets/Warcraft-III-generic-image-half-size.png','../../arthas-evil-hr-flipped.jpg','../../orc-hr.jpg'],
  //   genre: 'Timed Survival/Tower Defense',
  //   version: '4.12e',
  //   rating: '5',
  //   publishDate: {month: "September", day: 7, year: 2020},
  //   videoSrc: "../../assets/Action 7-3-2021 3-09-01 PM.mp4",
  //   imgSrc: "../../assets/Warcraft-III-generic-image-half-size.png" },
  //   {
  //   id: 7,  
  //   title: "Island Troll Tribes", 
  //   author: "Quazz",
  //   description: "Island troll tribes is a team survival game. You and your allies must survive the wilderness by finding food and stay safe from\
  //   the weather by building a shelter. You must also fight for resources against 2 other teams on their own islands. You also get to choose a specialization\
  //   for your hero to suit your team's needs as well as being able to build a huge variety of items by combining smaller items.",
  //   featureDescriptions: ['FeatureDesc1','FeatureDesc2','FeatureDesc3'],
  //   featureImages: ['../../assets/Warcraft-III-generic-image-half-size.png','../../arthas-evil-hr-flipped.jpg','../../orc-hr.jpg'],
  //   genre: 'Survival',
  //   version: '3.10b',
  //   rating: '5',
  //   publishDate: {month: "April", day: 3, year: 2021},
  //   videoSrc: "../../assets/Action 7-3-2021 3-09-01 PM.mp4",
  //   imgSrc: "../../assets/Warcraft-III-generic-image-half-size.png" },
  //   {
  //   id: 8,  
  //   title: "Sheep Tag", 
  //   author: "guy",
  //   description: "classic warcraft 3 game",
  //   featureDescriptions: ['FeatureDesc1','FeatureDesc2','FeatureDesc3'],
  //   featureImages: ['../../assets/Warcraft-III-generic-image-half-size.png','../../arthas-evil-hr-flipped.jpg','../../orc-hr.jpg'],
  //   genre: 'MOBA',
  //   version: '6.88',
  //   rating: '5',
  //   publishDate: {month: "January", day: 1, year: 2005},
  //   videoSrc: "../../assets/Action 7-3-2021 3-09-01 PM.mp4",
  //   imgSrc: "../../assets/Warcraft-III-generic-image-half-size.png" },
  // ];  
  @Output() gameListModified = new EventEmitter<null>();
  @Output() editingGame = new EventEmitter<Game>();
  isEditing: boolean = false;
  private gamesUrl = 'api/gameListDB';

  constructor(private http: HttpClient) { }
  numberOfGames: number = 0;

  ngOnInit(){
    this.http.get<number>('api/length').subscribe((length)=>{
      this.numberOfGames = length;
    });
    console.log('Were inside the init function in the game service.!')
  }

  printer(){
    console.log("What is the Games URL", this.gamesUrl);
    console.log("What is the get observable(--this.http.get<Game[]>(this.gamesUrl)--) from httpclient", this.http.get<Game[]>(this.gamesUrl));
    console.log("What is the this.http", this.http);
  }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.gamesUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  createGame(Game: Game): Observable<Game> {
    console.log('Creating a game', Game);
    Game.id = this.numberOfGames - 1;
    return this.http.post<Game>(this.gamesUrl, Game).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    )
  }

  editGame(Game: Game): Observable<any> {
    return this.http.put(this.gamesUrl + Game.id, Game);
  }

  deleteGame(id: number): Observable<any> {
    return this.http.delete(this.gamesUrl + id);
  }

  getSelectedGame(id: number) {
    return this.getGames().pipe(map((data:Game[])=>{
      data[id];
    }));
  }


  //Service Functions not using api

  // getGames():Game[]{
  //   return this.gameList.slice();
  // }

  // addGame(game:Game){
  //   game.id = this.gameList.length;
  //   game.videoSrc = "../../assets/Action 7-3-2021 3-09-01 PM.mp4";
  //   game.imgSrc = "../../assets/Warcraft-III-generic-image-half-size.png";
  //   console.log(game);
  //   this.gameList.push(game);
  //   this.gameListModified.emit();
  // }

  // deleteGame(game:Game){
  //   this.gameList.forEach(
  //     (obj, index) => {
  //       if (obj.title === game.title){
  //         this.gameList.splice(index, 1);
  //       }
  //     });
  //     //when setting up api, always increment id do not reassign id
  //   this.gameList.forEach(
  //     (obj, index) => {
  //       obj.id = index;
  //     }
  //   );
  //   this.gameListModified.emit();
  // }
  
  // editGame(game:Game){
  //   this.isEditing = true;
  //   this.editingGame.emit(game);

  // }

  // submitEditedGame(game:Game){
  //   this.gameList[game.id] = game;
  //   this.isEditing = false;
  //   this.gameListModified.emit();
  // }



}
