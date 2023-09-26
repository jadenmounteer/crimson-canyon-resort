import { Component, OnDestroy, OnInit } from '@angular/core';
import Phaser from 'phaser'; //import Phaser

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
  ngOnDestroy(): void {
    this.phaserGame.destroy(true);
  }
}

class MainMenu extends Phaser.Scene {
  ground!: Phaser.Physics.Arcade.StaticGroup;
  music: Phaser.Sound.BaseSound | undefined;
  constructor() {
    super({ key: 'MainMenu' });
  }

  private toggleFullScreen(): void {
    if (this.scale.isFullscreen) {
      this.scale.stopFullscreen();
    } else {
      this.scale.startFullscreen();
    }
  }

  preload() {
    this.load.audio('donut-saturday-soundtrack', [
      'assets/donut-saturday-game/audio/dodgeball_mixdown.m4a',
    ]);

    this.load.image(
      'ground',
      'assets/donut-saturday-game/background/Ground.png'
    );
    this.load.spritesheet('fullscreen', 'assets/images/fullscreen.png', {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.image(
      'start-button',
      'assets/donut-saturday-game/start-button.png'
    );

    this.ground = this.physics.add.staticGroup();
  }

  create() {
    this.music?.destroy();
    this.music = this.sound.add('donut-saturday-soundtrack');

    this.music.play();

    const fullScreenButton = this.add
      .image(800 - 16, 16, 'fullscreen', 0)
      .setOrigin(1, 0)
      .setInteractive();

    const startGameButton = this.add
      .image(500 - 16, 16, 'start-button', 0)
      .setOrigin(1, 0)
      .setInteractive();

    startGameButton.setScale(0.5);

    fullScreenButton.on(
      'pointerup',
      () => {
        this.toggleFullScreen();
      },
      this
    );

    startGameButton.on(
      'pointerup',
      () => {
        this.scene.start('CharacterSelection');
      },
      this
    );
  }
}

class CharacterSelection extends Phaser.Scene {
  characterChosen: string = '';
  ground!: Phaser.Physics.Arcade.StaticGroup;
  constructor() {
    super({ key: 'CharacterSelection' });
  }

  preload() {
    this.load.image(
      'ground',
      'assets/donut-saturday-game/background/Ground.png'
    );

    this.ground = this.physics.add.staticGroup();
  }

  create() {
    // this.ground.create(190, 475, 'ground');
  }
  override update() {
    this.characterChosen = 'grandpa';
    const button = this.add
      .image(800 - 16, 16, 'ground', 0)
      .setOrigin(1, 0)
      .setInteractive();

    button.on(
      'pointerup',
      () => {
        this.scene.start('DonutArena', {
          characterChosen: this.characterChosen,
        });
      },
      this
    );
  }
}

class DonutArena extends Phaser.Scene {
  character: string = '';
  ground!: Phaser.Physics.Arcade.StaticGroup;
  constructor() {
    super({ key: 'DonutArena' });
  }

  init(data: any) {
    this.character = data.characterChosen;
  }

  preload() {
    this.load.image(
      'ground',
      'assets/donut-saturday-game/background/Ground.png'
    );

    this.ground = this.physics.add.staticGroup();
  }

  create() {
    console.log(this.character);
    // this.ground.create(190, 475, 'ground');
  }
  override update() {
    this.character = 'grandpa';
    const button = this.add
      .image(500 - 16, 16, 'ground', 0)
      .setOrigin(1, 0)
      .setInteractive();

    button.on(
      'pointerup',
      () => {
        this.scene.start('MainMenu');
      },
      this
    );
  }
}
