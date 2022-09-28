import CollisionAnimation from './collisionAnimation';
import Game from './game';
import FloatingMessage from './floatingMessages';
import Sprite from './sprite';

import {
  State,
  Sitting,
  Running,
  Jumping,
  Falling,
  Rolling,
  Diving,
  Hit,
} from './playerStates';

export default class Player extends Sprite {
  speed: number;
  maxSpeed: number;
  vy: number;
  weigth: number;
  states: State[];
  currentState: State;
  energy: number;
  energyTimer: number;
  energyInterval: number;

  constructor(game: Game) {
    super(game);
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.image = <HTMLImageElement>document.getElementById('player');
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 5;
    this.speed = 0;
    this.maxSpeed = 10;
    this.vy = 0;
    this.weigth = 1;
    this.fps = 20;
    this.frameTimer = 0;
    this.energy = 50;
    this.energyTimer = 0;
    this.energyInterval = 500;

    this.frameInterfal = 1000 / this.fps;
    this.states = [
      new Sitting(this.game),
      new Running(this.game),
      new Jumping(this.game),
      new Falling(this.game),
      new Rolling(this.game),
      new Diving(this.game),
      new Hit(this.game),
    ];
    this.currentState = null;
  }

  update(input: string[], deltaTime?: number) {
    this.checkCollisions();
    this.currentState.handleInput(input);
    // energy recovery
    if (this.currentState !== this.states[4]) {
      if (this.energyTimer > this.energyInterval) {
        if (this.energy < 50) this.energy++;
        this.energyTimer = 0;
      } else {
        this.energyTimer += deltaTime;
      }
    }

    // horizontal movement
    if (input.includes('ArrowRight') && this.currentState !== this.states[6])
      this.x += this.maxSpeed;
    else if (
      input.includes('ArrowLeft') &&
      this.currentState !== this.states[6]
    )
      this.x -= this.maxSpeed;
    else this.speed = 0;
    // horizontal boundaries
    if (this.x < 0) this.x = 0;
    if (this.x > this.game.width - this.width)
      this.x = this.game.width - this.width;
    // vertical movement
    this.y += this.vy;
    if (!this.onGround()) this.vy += this.weigth;
    else this.vy = 0;
    // vertical boundaries
    if (this.y > this.game.height - this.height - this.game.groundMargin)
      this.y = this.game.height - this.height - this.game.groundMargin;
    // spite animation
    if (this.frameTimer > this.frameInterfal) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }

  draw(contex: CanvasRenderingContext2D | null, deltaTime?: number) {
    if (!contex) return;
    if (this.game.debug)
      contex.strokeRect(this.x, this.y, this.width, this.height);
    contex.drawImage(
      this.image,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }

  setState(state: number, speed: number) {
    this.currentState = this.states[state];
    this.game.speed = this.game.maxSpeed * speed;
    this.currentState.enter();
  }

  checkCollisions() {
    this.game.enemies.forEach((enemy) => {
      if (
        enemy.x < this.x + this.width &&
        enemy.x + enemy.width > this.x &&
        enemy.y < this.y + this.height &&
        enemy.y + enemy.height > this.y
      ) {
        enemy.markedForDeletion = true;
        this.game.collisions.push(
          new CollisionAnimation(
            this.game,
            enemy.x + enemy.width * 0.5,
            enemy.y + enemy.height * 0.5
          )
        );
        if (
          // hit  enemy
          this.currentState === this.states[4] ||
          this.currentState === this.states[5]
        ) {
          this.game.score += enemy.score;
          this.game.floatingMessages.push(
            new FloatingMessage(`+${enemy.score}`, enemy.x, enemy.y, 150, 50)
          );
          this.energy -= enemy.score;
          if (this.energy <= 0) this.energy = 0;
        } else {
          // hit by enemy
          this.setState(6, 0);
          this.game.lives--;
          if (this.game.lives <= 0) this.game.gameOver = true;
        }
      }
    });
  }
}
