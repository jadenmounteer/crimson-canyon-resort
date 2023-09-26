export class DonutArena extends Phaser.Scene {
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
