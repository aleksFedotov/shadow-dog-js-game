import Game from './game';

export class Level {
  background: HTMLImageElement[];

  game: Game;
  constructor(game: Game) {
    this.game = game;
  }

  addEnemy(): void {}
}

export class ForestLevel extends Level {
  constructor(game: Game) {
    super(game);
    this.background = [
      <HTMLImageElement>document.getElementById('layer1'),
      <HTMLImageElement>document.getElementById('layer2'),
      <HTMLImageElement>document.getElementById('layer3'),
      <HTMLImageElement>document.getElementById('layer4'),
      <HTMLImageElement>document.getElementById('layer5'),
    ];
  }
}

export class CityLevel extends Level {
  constructor(game: Game) {
    super(game);
    this.background = [
      <HTMLImageElement>document.getElementById('layer1-city'),
      <HTMLImageElement>document.getElementById('layer2-city'),
      <HTMLImageElement>document.getElementById('layer3-city'),
      <HTMLImageElement>document.getElementById('layer4-city'),
      <HTMLImageElement>document.getElementById('layer5-city'),
    ];
  }
}
