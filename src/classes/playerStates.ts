import Game from './game';
import { Dust, Fire, Splash } from './particles';
const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  ROLLING: 4,
  DIVING: 5,
  HIT: 6,
};

export class State {
  state: string;
  game: Game;
  constructor(state: string, game: Game) {
    this.state = state;
    this.game = game;
  }

  enter(): void {}
  handleInput(input: string[]): void {}
}

// ---------------------------------------Sitting-----------------------------------------
export class Sitting extends State {
  constructor(game: Game) {
    super('SITTING', game);
  }

  enter(): void {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 4;
    this.game.player.frameY = 5;
  }

  handleInput(input: string[]): void {
    // this.game.player.energy += 3;
    // if (this.game.player.energy >= 100) this.game.player.energy = 100;
    if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
      this.game.player.setState(states.RUNNING, 1);
    } else if (input.includes('Control') && this.game.player.energy > 0) {
      this.game.player.setState(states.ROLLING, 2);
    }
  }
}

// ---------------------------------------Running-----------------------------------------
export class Running extends State {
  constructor(game: Game) {
    super('RUNNING', game);
    this.game = game;
  }

  enter(): void {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 8;
    this.game.player.frameY = 3;
  }

  handleInput(input: string[]): void {
    this.game.particles.unshift(
      new Dust(
        this.game,
        this.game.player.x + this.game.player.width * 0.6,
        this.game.player.y + this.game.player.height
      )
    );
    // this.game.player.energy++;
    // if (this.game.player.energy >= 100) this.game.player.energy = 100;
    if (input.includes('ArrowDown')) {
      this.game.player.setState(states.SITTING, 0);
    } else if (input.includes('ArrowUp')) {
      this.game.player.setState(states.JUMPING, 1);
    } else if (input.includes('Control') && this.game.player.energy > 0) {
      this.game.player.setState(states.ROLLING, 2);
    }
  }
}

// ---------------------------------------Jumping-----------------------------------------
export class Jumping extends State {
  constructor(game: Game) {
    super('JUMPING', game);
    this.game = game;
  }

  enter(): void {
    if (this.game.player.onGround()) this.game.player.vy -= 30;
    this.game.player.frameX = 0;

    this.game.player.maxFrame = 6;
    this.game.player.frameY = 1;
  }

  handleInput(input: string[]): void {
    if (this.game.player.vy > 0) {
      this.game.player.setState(states.FALLING, 1);
    } else if (input.includes('Control')) {
      this.game.player.setState(states.ROLLING, 2);
    } else if (input.includes('ArrowDown')) {
      this.game.player.setState(states.DIVING, 0);
    }
  }
}

// ---------------------------------------Falling-----------------------------------------
export class Falling extends State {
  constructor(game: Game) {
    super('FALLING', game);
    this.game = game;
  }

  enter(): void {
    if (this.game.player.onGround()) this.game.player.vy -= 27;
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 2;
  }

  handleInput(input: string[]): void {
    if (this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1);
    } else if (input.includes('ArrowDown')) {
      this.game.player.setState(states.DIVING, 0);
    }
  }
}
// ---------------------------------------Rolling-----------------------------------------
export class Rolling extends State {
  constructor(game: Game) {
    super('ROLLING', game);
    this.game = game;
  }

  enter(): void {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 6;
  }

  handleInput(input: string[]): void {
    this.game.particles.unshift(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height * 0.5
      )
    );

    if (!input.includes('Control') && this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1);
    } else if (!input.includes('Control') && !this.game.player.onGround()) {
      this.game.player.setState(states.FALLING, 1);
    } else if (
      input.includes('ArrowUp') &&
      input.includes('Control') &&
      this.game.player.onGround()
    ) {
      this.game.player.vy -= 27;
    } else if (input.includes('ArrowDown') && !this.game.player.onGround()) {
      this.game.player.setState(states.DIVING, 0);
    } else if (this.game.player.energy <= 0) {
      this.game.player.setState(states.RUNNING, 1);
    }
  }
}
// ---------------------------------------Diving-----------------------------------------
export class Diving extends State {
  constructor(game: Game) {
    super('DIVING', game);
    this.game = game;
  }

  enter(): void {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 6;
    this.game.player.frameY = 6;
    this.game.player.vy = 15;
  }

  handleInput(input: string[]): void {
    this.game.particles.unshift(
      new Fire(
        this.game,
        this.game.player.x + this.game.player.width * 0.5,
        this.game.player.y + this.game.player.height * 0.5
      )
    );
    if (this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1);
      for (let i = 0; i < 30; i++) {
        this.game.particles.unshift(
          new Splash(
            this.game,
            this.game.player.x + this.game.player.width * 0.5,
            this.game.player.y + this.game.player.height
          )
        );
      }
    } else if (input.includes('Control') && this.game.player.onGround()) {
      this.game.player.setState(states.ROLLING, 2);
    }
  }
}
// ---------------------------------------Hit-----------------------------------------
export class Hit extends State {
  constructor(game: Game) {
    super('HIT', game);
    this.game = game;
  }

  enter(): void {
    this.game.player.frameX = 0;
    this.game.player.maxFrame = 10;
    this.game.player.frameY = 4;
  }

  handleInput(input: string[]): void {
    if (this.game.player.frameX >= 10 && this.game.player.onGround()) {
      this.game.player.setState(states.RUNNING, 1);
    } else if (this.game.player.frameX >= 10 && !this.game.player.onGround()) {
      this.game.player.setState(states.FALLING, 2);
    }
  }
}
