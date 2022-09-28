import Game from './game';
import Sprite from './sprite';

export class Enemy extends Sprite {
  fps: number;
  frameTimer: number;
  frameInterfal: number;
  speedX: number;
  speedY: number;
  score: number;
  constructor(game: Game) {
    super(game);
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterfal = 1000 / this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = false;
  }

  update(deltaTime: number): void {
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;
    if (this.frameTimer > this.frameInterfal) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }

    // check if off screen
    if (this.x + this.width < 0) this.markedForDeletion = true;
  }
  draw(context: CanvasRenderingContext2D | null): void {
    if (!context) return;
    if (this.game.debug)
      context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.width * this.frameX,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export class FlyingEnemy extends Enemy {
  angle: number;
  va: number;
  constructor(game: Game) {
    super(game);
    this.x = this.game.width + Math.random() * this.game.width * 0.5;
    this.y = Math.random() * this.game.height * 0.5;
    this.speedX = Math.random() + 1;
    this.speedY = 0;
    this.angle = 0;
    this.va = Math.random() * 0.1 + 0.1;
  }

  update(deltaTime: number): void {
    super.update(deltaTime);
    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }
}

export class HoverEnemy extends Enemy {
  constructor(game: Game) {
    super(game);
    this.x = this.game.width + Math.random() * game.width * 0.5;
    this.y = Math.random() * this.game.height * 0.5;
    this.speedX = Math.random() + 1;
    this.speedY = 0;
    this.fps = 40;
  }

  update(deltaTime: number): void {
    this.x -= Math.random() * 7 - 3.5 + this.game.speed;
    this.y += Math.random() * 7 - 3.5;
    if (this.frameTimer > this.frameInterfal) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }
}

export class GroundEnemy extends Enemy {
  constructor(game: Game) {
    super(game);

    this.speedX = 0;
    this.speedY = 0;
  }
}

export class ClimbingEnemy extends Enemy {
  constructor(game: Game) {
    super(game);

    this.x = this.game.width;
    this.y = Math.random() * this.game.height * 0.5;
    this.speedX = 0;
    this.speedY = Math.random() > 0.5 ? 1 : -1;
  }

  update(deltaTime: number): void {
    super.update(deltaTime);
    if (this.y > this.game.height - this.height - this.game.groundMargin)
      this.speedY *= -1;
    if (this.y < -this.height) this.markedForDeletion = true;
  }

  draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.moveTo(this.x + this.width / 2, 0);
    context.lineTo(this.x + this.width / 2, this.y + this.height / 2);
    context.stroke();
    super.draw(context);
  }
}

class WalkingEnemy extends Enemy {
  constructor(game: Game) {
    super(game);
    this.x = this.game.width;
    this.speedX = Math.random() + 1;
    this.speedY = 0;
  }
}

export class TeleportingEnemy extends Enemy {
  newX: number;
  newY: number;
  teleportTimer: number;
  teleportInterval: number;
  constructor(game: Game) {
    super(game);
    this.x = this.game.width + Math.random() * this.game.width * 0.5;
    this.y = Math.random() * this.game.height * 0.5;

    this.teleportInterval = Math.floor(Math.random() * 100 + 50);
  }

  update(deltaTime: number): void {
    if (this.teleportTimer > this.teleportInterval) {
      this.newX = Math.random() * (this.game.width - this.width);
      this.newY = Math.random() * (this.game.height - this.height);

      this.teleportTimer = 0;
    } else {
      this.teleportTimer++;
    }

    let dx = this.x - this.newX;
    let dy = this.y - this.newY;
    this.x -= dx / 70;
    this.y -= dy / 70;

    this.teleportTimer++;
    if (this.frameTimer > this.frameInterfal) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }
}

export class Fly extends FlyingEnemy {
  constructor(game: Game) {
    super(game);
    this.image = <HTMLImageElement>document.getElementById('fly');
    this.width = 60;
    this.height = 44;
    this.maxFrame = 5;
    this.score = 1;
  }
}
export class Bat1 extends HoverEnemy {
  constructor(game: Game) {
    super(game);
    this.image = <HTMLImageElement>document.getElementById('bat_1');
    this.width = 83.1;
    this.height = 44;
    this.maxFrame = 5;
    this.score = 1;
  }
}
export class Bat2 extends FlyingEnemy {
  constructor(game: Game) {
    super(game);
    this.image = <HTMLImageElement>document.getElementById('bat_2');
    this.width = 59.5;
    this.height = 42;
    this.maxFrame = 7;
    this.score = 1;
  }
}
export class Bat3 extends FlyingEnemy {
  constructor(game: Game) {
    super(game);
    this.image = <HTMLImageElement>document.getElementById('bat_3');
    this.width = 66.5;
    this.height = 47;
    this.maxFrame = 5;
    this.score = 1;
  }
}

export class Spinner extends TeleportingEnemy {
  constructor(game: Game) {
    super(game);
    this.image = <HTMLImageElement>document.getElementById('spinner');
    this.width = 53.2;
    this.height = 53;
    this.newX = Math.random() * (this.game.width - this.width);
    this.newY = Math.random() * (this.game.height - this.height);
    this.maxFrame = 8;
    this.score = 2;
    this.teleportTimer = 0;
  }
}

export class Plant extends GroundEnemy {
  constructor(game: Game) {
    super(game);
    this.image = <HTMLImageElement>document.getElementById('plant');
    this.width = 60;
    this.height = 87;
    this.maxFrame = 1;
    this.score = 2;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.groundMargin;
  }
}

export class ZombyHand extends GroundEnemy {
  constructor(game: Game) {
    super(game);
    this.image = <HTMLImageElement>document.getElementById('zomby_hand');
    this.width = 55.75;
    this.height = 80;
    this.maxFrame = 7;
    this.score = 2;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.groundMargin;
  }
}
export class Digger extends GroundEnemy {
  constructor(game: Game) {
    super(game);
    this.image = <HTMLImageElement>document.getElementById('digger');
    this.width = 130;
    this.height = 89;
    this.maxFrame = 7;
    this.score = 2;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.groundMargin;
  }
}

export class BigSpider extends ClimbingEnemy {
  constructor(game: Game) {
    super(game);
    this.image = <HTMLImageElement>document.getElementById('spider');
    this.width = 120;
    this.height = 144;
    this.maxFrame = 5;
    this.score = 3;
  }
}

export class SmallSpider extends ClimbingEnemy {
  constructor(game: Game) {
    super(game);
    this.image = <HTMLImageElement>document.getElementById('small_spider');
    this.width = 77;
    this.height = 44;
    this.maxFrame = 5;
    this.score = 3;
  }
}

export class Worm extends WalkingEnemy {
  constructor(game: Game) {
    super(game);
    this.width = 80;
    this.height = 60;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.image = <HTMLImageElement>document.getElementById('worm');
    this.maxFrame = 5;
    this.score = 2;
  }
}

export class WalkingZombie extends WalkingEnemy {
  constructor(game: Game) {
    super(game);
    this.width = 85;
    this.height = 120;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.image = <HTMLImageElement>document.getElementById('walking_zombie');
    this.maxFrame = 7;
    this.score = 2;
  }
}

const classes = {
  Fly,
  Bat1,
  Bat3,
  Bat2,
  Spinner,
  Digger,
  ZombyHand,
  Plant,
  BigSpider,
  SmallSpider,
  Worm,
  WalkingZombie,
};

export class NewEnemy {
  constructor(className: string, game: Game) {
    // @ts-ignore
    return new classes[className](game);
  }
}
