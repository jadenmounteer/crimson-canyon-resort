export class MainMenu extends Phaser.Scene {
  ground!: Phaser.Physics.Arcade.StaticGroup;
  music: Phaser.Sound.BaseSound | undefined;
  fire: Phaser.GameObjects.Sprite | undefined;

  constructor() {
    super({ key: 'MainMenu' });
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

    const startGameButton = this.add
      .image(500 - 16, 16, 'start-button', 0)
      .setOrigin(1, 0)
      .setInteractive();

    startGameButton.setScale(0.5);

    startGameButton.on(
      'pointerup',
      () => {
        this.scene.start('CharacterSelection');
      },
      this
    );

    this.createAnimations();

    this.fire = this.add.sprite(95, 650, 'fire');
    this.fire.setSize(4, 4);
    this.fire.setScale(3, 3);

    // Play the animation
    this.fire.anims.play('flicker', true);
  }

  private createAnimations(): void {
    // See this video for more on how to create animations in Phaser 3.
    // https://www.youtube.com/watch?v=ElAmJj8Tfo8
    this.anims.create({
      key: 'flicker',
      frames: this.anims.generateFrameNumbers('fire', { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1,
    });
  }
}
