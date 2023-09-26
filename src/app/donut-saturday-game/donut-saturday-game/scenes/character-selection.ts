export class CharacterSelection extends Phaser.Scene {
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
