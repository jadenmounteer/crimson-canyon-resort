import { Component, OnDestroy, OnInit } from '@angular/core';
import Phaser from 'phaser'; //import Phaser
import { CharacterSelection } from './scenes/character-selection';
import { MainMenu } from './scenes/main-menu';
import { DonutArena } from './scenes/donut-arena';

@Component({
  selector: 'app-donut-saturday-game',
  templateUrl: './donut-saturday-game.component.html',
  styleUrls: ['./donut-saturday-game.component.scss'],
})
export class DonutSaturdayGameComponent implements OnInit, OnDestroy {
  //declare phaserGame variable, the ! is needed for it to be valid code in Angular, we just have to make sure we initialize it in ngOnInit
  phaserGame!: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  constructor() {
    this.config = {
      type: Phaser.AUTO,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      scene: [MainMenu, CharacterSelection, DonutArena],
      parent: 'gameContainer',
      title: 'Donut Saturday',
      backgroundColor: 'black',

      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
          gravity: { y: 300 },
        },
      },
    };
  }

  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
  }
  ngOnDestroy(): void {
    this.phaserGame.destroy(true);
  }
}
