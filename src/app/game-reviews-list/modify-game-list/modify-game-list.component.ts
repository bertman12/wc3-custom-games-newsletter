import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { GamesService } from 'src/app/_services/games.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-modify-game-list',
  templateUrl: './modify-game-list.component.html',
  styleUrls: ['./modify-game-list.component.css']
})
export class ModifyGameListComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private gameService: GamesService) { }
    
    ngOnInit(): void {
      this.gameService.editingGame.subscribe(
        (game) => {
          this.gameForm.patchValue(game);
          this.featureDescriptions.clear();
          this.featureImages.clear();
          for(let x = 0; x < game.featureImages.length; x++){
            this.featureDescriptions.push(this.formBuilder.control(game.featureDescriptions[x]));
            this.featureImages.push(this.formBuilder.control(game.featureImages[x]));
          }
      })
    }
    
    gameForm = this.formBuilder.group({
      id: [],
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      featureDescriptions: this.formBuilder.array([['', [Validators.required, Validators.minLength(1)]]],[ Validators.required, Validators.minLength(1)]),
      featureImages: this.formBuilder.array([['', [ Validators.required, Validators.minLength(1)]]],[ Validators.required, Validators.minLength(1)]),
      genre: ['', Validators.required],
      version: ['', Validators.required],
      rating: [''], //this will be calculated
      publishDate: this.formBuilder.group({
        month: ['', Validators.required],
        day: ['', [Validators.required, Validators.max(32)]],
        year: ['', [Validators.required, Validators.max(2021)]],
      }),
      videoSrc: ['',Validators.required],
      imgSrc: ['',Validators.required]
    })
    
    //instantiating form array class properties
    get featureDescriptions(){
      return this.gameForm.get('featureDescriptions') as FormArray;
    }
    get featureImages(){
      return this.gameForm.get('featureImages') as FormArray;
    }
    
    addFeature(){
      this.featureImages.push(this.formBuilder.control('',[Validators.required, Validators.minLength(1)]));
      this.featureDescriptions.push(this.formBuilder.control('',[Validators.required, Validators.minLength(1)]));
      this.featureImages.updateValueAndValidity();
      this.featureDescriptions.updateValueAndValidity();
    }
    removeFeature(index:number){
      this.featureImages.removeAt(index);
      this.featureDescriptions.removeAt(index);
    }
    
    onSubmit(){
      console.warn(this.gameForm.value);
      if(this.gameService.isEditing){
        this.gameService.submitEditedGame(this.gameForm.value);
      }
      else{
        this.gameService.addGame(this.gameForm.value);
      }
    }
    
    onClearForm(){
      this.gameForm.reset();
      this.featureDescriptions.clear();
      this.featureImages.clear();
    }
    // when this component in instantiated from the edit button we will use .setValue method to grab the game object data and input it in there to make it easier to edit the list item
  }
  
  
  
  // without form array
  // gameForm = this.formBuilder.group({
    //   id: [0],
    //   title: ['', Validators.required],
    //   author: [''],
    //   description: [''],
    //   featureDescriptions: [''],
    //   featureImages: [''],
    //   genre: [''],
    //   version: [''],
//   rating: [''],
//   publishDate: this.formBuilder.group({
//     month: [''],
//     day: [''],
//     year: [''],
//   }),
//   videoSrc: [''],
//   imgSrc: ['']
// })