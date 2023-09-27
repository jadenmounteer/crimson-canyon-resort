export class MainMenu extends Phaser.Scene {
  ground!: Phaser.Physics.Arcade.StaticGroup;
  music: Phaser.Sound.BaseSound | undefined;
  fire: Phaser.GameObjects.Sprite | undefined;

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

    this.load.spritesheet(
      'fire',
      'assets/donut-saturday-game/animations/fire/fire.png',
      { frameWidth: 256, frameHeight: 256 }
    );
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

    this.fire = this.add.sprite(100, 100, 'fire');
    this.fire.setSize(1, 1);
    this.fire.setScale(1.3, 1.3);
  }
}
