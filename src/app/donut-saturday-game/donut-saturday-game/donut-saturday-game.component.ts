import { Component, OnInit } from '@angular/core';
import Phaser from 'phaser'; //import Phaser

@Component({
  selector: 'app-donut-saturday-game',
  templateUrl: './donut-saturday-game.component.html',
  styleUrls: ['./donut-saturday-game.component.scss'],
})
export class DonutSaturdayGameComponent implements OnInit {
  //declare phaserGame variable, the ! is needed for it to be valid code in Angular, we just have to make sure we initialize it in ngOnInit
  phaserGame!: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;
  constructor() {
    this.config = {
      type: Phaser.AUTO,
      height: 600,
      width: 800,
      scene: [MainScene],
      parent: 'gameContainer',
      title: 'Donut Saturday',
      backgroundColor: '#2eb5de',
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
}

class MainScene extends Phaser.Scene {
  ground!: Phaser.Physics.Arcade.StaticGroup;
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.image(
      'ground',
      'assets/donut-saturday-game/background/Ground.png'
    );

    this.ground = this.physics.add.staticGroup();
  }

  create() {
    this.ground.create(190, 475, 'ground');
    this.ground.create(350, 475, 'ground');
    this.ground.create(600, 475, 'ground');
    this.ground.create(600, 475, 'ground');
  }
  override update() {}
}
