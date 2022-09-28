import Game from './game';
import Sprite from './sprite';

export class Particle extends Sprite {
  speedX: number;
  speedY: number;
  size: number;
  color: string;
  constructor(game: Game) {
    super(game);

    this.markedForDeletion = false;
  }

  update() {
    this.x -= this.speedX + this.game.speed;
    this.y -= this.speedY;
    this.size *= 0.95;
    if (this.size < 0.5) this.markedForDeletion = true;
  }

  draw(context: CanvasRenderingContext2D | null): void {}
}

// ---------------------------------------Dust-----------------------------------------

export class Dust extends Particle {
  constructor(game: Game, x: number, y: number) {
    super(game);
    this.x = x;
    this.y = y;
    this.size = Math.random() * 10 + 10;
    this.speedX = Math.random();
    this.speedY = Math.random();
    this.color = 'rgba(0,0,0,0.2)';
  }

  draw(context: CanvasRenderingContext2D): void {
    if (!context) return;
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    context.fillStyle = this.color;
    context.fill();
  }
}

// ---------------------------------------Splash-----------------------------------------
export class Splash extends Particle {
  gravity: number;
  constructor(game: Game, x: number, y: number) {
    super(game);
    this.size = Math.random() * 100 + 100;
    this.x = x - this.size * 0.4;
    this.y = y - this.size * 0.5;
    this.speedX = Math.random() * 6 - 4;
    this.speedY = Math.random() * 2 + 1;
    this.gravity = 0;
    this.image = <HTMLImageElement>document.getElementById('fire');
  }

  update(): void {
    super.update();
    this.gravity += 0.1;
    this.y += this.gravity;
  }

  draw(context: CanvasRenderingContext2D): void {
    context.drawImage(this.image, this.x, this.y, this.size, this.size);
  }
}

// ---------------------------------------Fire-----------------------------------------
export class Fire extends Particle {
  angle: number;
  va: number;
  constructor(game: Game, x: number, y: number) {
    super(game);
    this.image = <HTMLImageElement>document.getElementById('fire');
    this.x = x;
    this.y = y;
    this.size = Math.random() * 100 + 50;
    this.speedX = 1;
    this.speedY = 1;
    this.angle = 0;
    this.va = Math.random() * 0.2 - 0.1;
  }

  update(): void {
    super.update();
    this.angle += this.va;
    this.x += Math.sin(this.angle * 10);
  }

  draw(context: CanvasRenderingContext2D): void {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.drawImage(
      this.image,
      -this.size * 0.5,
      -this.size * 0.5,
      this.size,
      this.size
    );
    context.restore();
  }
}
