import Player from './player';
import InputHandler from './input';
import Background from './background';
import {
  Enemy,
  Spinner,
  ZombyHand,
  WalkingZombie,
  Bat2,
  Plant,
  SmallSpider,
  Fly,
  Digger,
  Worm,
  BigSpider,
} from './enemies';
import UI from './UI';
import { Particle } from './particles';
import CollisionAnimation from './collisionAnimation';
import FloatingMessage from './floatingMessages';

import { Level, ForestLevel, CityLevel } from './levels';

export default class Game {
  width: number;
  height: number;
  player: Player;
  background: Background;
  input: InputHandler;
  groundMargin: number;
  speed: number;
  maxSpeed: number;
  enemies: Enemy[];
  particles: Particle[];
  collisions: CollisionAnimation[];
  floatingMessages: FloatingMessage[];
  enemyTimer: number;
  enemyInterval: number;

  debug: boolean;
  score: number;
  winningScore: number;
  fontColor: string;
  UI: UI;
  maxParticles: number;
  time: number;
  maxTime: number;
  gameOver: boolean;
  lives: number;
  currentLevel: number;
  levels: Level[];
  nextLevel: boolean;
  animate: (num: number) => void;
  constructor(width: number, height: number, animate: (num: number) => void) {
    this.width = width;
    this.height = height;
    this.groundMargin = 50;
    this.speed = 0;
    this.maxSpeed = 3;
    this.levels = [new ForestLevel(this), new CityLevel(this)];
    this.currentLevel = 0;
    this.animate = animate;
    this.background = new Background(this, ...this.levels[1].background);
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.UI = new UI(this);
    this.enemyTimer = 0;
    this.enemyInterval = 1000;
    this.enemies = [];

    this.particles = [];
    this.collisions = [];
    this.floatingMessages = [];
    this.maxParticles = 50;
    this.debug = false;
    this.score = 0;
    this.winningScore = 40;
    this.fontColor = 'black';
    this.time = 0;
    this.maxTime = 30000;
    this.gameOver = false;
    this.lives = 5;
    this.player.currentState = this.player.states[0];
    this.player.currentState.enter();
    this.nextLevel = false;
  }

  update(deltaTime: number) {
    this.time += deltaTime;

    this.background.update();
    this.player.update(this.input.keys, deltaTime);
    // handle enemies
    if (this.enemyTimer > this.enemyInterval) {
      this.addEnemy();

      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }

    // handling enemy interval

    if (this.time > 30000) {
      this.enemyInterval = 800;
    } else if (this.time > 30000 && this.time < 60000) {
      this.enemyInterval = 600;
    } else if (this.time > 60000 && this.time < 90000) {
      this.enemyInterval = 400;
    } else if (this.time > 90000 && this.time < 120000) {
      this.enemyInterval = 100;
    }
    this.enemies.forEach((enemy) => {
      enemy.update(deltaTime);
      if (enemy.markedForDeletion)
        this.enemies.splice(this.enemies.indexOf(enemy), 1);
    });
    // handle score messages
    this.floatingMessages.forEach((msg, ind) => {
      msg.update();
    });
    // handle particles
    this.particles.forEach((particle, ind) => {
      particle.update();
    });
    if (this.particles.length > this.maxParticles) {
      this.particles.length = this.maxParticles;
    }
    // handle collisons sprites
    this.collisions.forEach((collision, ind) => {
      collision.update(deltaTime);
    });
    this.floatingMessages = this.floatingMessages.filter(
      (msg) => !msg.markedForDeletion
    );
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
    this.particles = this.particles.filter(
      (partice) => !partice.markedForDeletion
    );
    this.collisions = this.collisions.filter(
      (collision) => !collision.markedForDeletion
    );
  }

  draw(contex: CanvasRenderingContext2D | null) {
    if (!contex) return;
    this.background.draw(contex);
    this.player.draw(contex);
    this.enemies.forEach((enemy) => {
      enemy.draw(contex);
    });
    this.floatingMessages.forEach((msg, ind) => {
      msg.draw(contex);
    });
    this.particles.forEach((particle) => {
      particle.draw(contex);
    });

    this.collisions.forEach((collision) => {
      collision.draw(contex);
    });
    this.UI.draw(contex);
  }

  moveTonextLevel(): void {
    if (this.currentLevel === 1) this.currentLevel = 1;
    else this.currentLevel++;

    this.background = new Background(
      this,
      ...this.levels[this.currentLevel].background
    );
  }
  addEnemy(): void {
    if (this.speed > 0 && Math.random() < 0.3) {
      this.addFirstGroup();
    } else if (this.speed > 0 && Math.random() >= 0.3 && Math.random() < 0.6) {
      this.addSecondGroup();
    } else if (this.speed > 0 && Math.random() >= 0.6) {
      this.addThirdGroup();
    }

    this.addFlyingEnemy();

    if (Math.random() < 0.2) {
      this.enemies.push(new WalkingZombie(this));
    }
  }
  addFirstGroup(): void {
    this.enemies.push(new WalkingZombie(this));

    if (this.time > 90000) {
      this.enemies.push(new ZombyHand(this));
    }
  }
  addSecondGroup(): void {
    this.enemies.push(new Digger(this));

    if (this.time > 60000) {
      this.enemies.push(new Worm(this));
    }
    if (this.time > 90000) {
      this.enemies.push(new BigSpider(this));
    }
  }

  addThirdGroup(): void {
    this.enemies.push(new SmallSpider(this));
    if (this.time > 60000) {
      this.enemies.push(new Plant(this));
    }
    if (this.time > 90000) {
      this.enemies.push(new Spinner(this));
    }
  }

  addFlyingEnemy(): void {
    this.enemies.push(new Fly(this));
    if (this.time > 60000) {
      this.enemies.push(new Bat2(this));
    }
  }

  gameRestart(): void {
    this.gameOver = false;
    this.enemies = [];
    this.player.currentState = this.player.states[0];
    this.player.currentState.enter();
    this.score = 0;
    this.time = 0;
    this.lives = 5;
    this.player.x = 0;
    this.player.y = this.height - this.player.height - this.groundMargin;
    this.speed = 0;
    this.animate(0);
    this.player.energy = 50;
  }
}
