import Game from './game';
import Sprite from './sprite';

export default class CollisionAnimation extends Sprite {
  spriteWidth: number;
  spriteHeight: number;
  sizeModifier: number;
  constructor(game: Game, x: number, y: number) {
    super(game);

    this.image = <HTMLImageElement>document.getElementById('collision');
    this.spriteWidth = 100;
    this.spriteHeight = 90;
    this.sizeModifier = Math.random() + 0.5;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
    this.frameX = 0;
    this.maxFrame = 4;
    this.markedForDeletion = false;
    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterfal = 1000 / this.fps;
  }

  draw(contex: CanvasRenderingContext2D | null): void {
    if (!contex) return;
    contex.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update(deltaTime: number): void {
    this.x -= this.game.speed;

    if (this.frameTimer > this.frameInterfal) {
      this.frameX++;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    if (this.frameX > this.maxFrame) this.markedForDeletion = true;
  }
}
