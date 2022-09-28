import Game from './game';
export default class Sprite {
  game: Game;
  width: number;
  height: number;
  x: number;
  y: number;
  image: CanvasImageSource;
  frameX: number;
  frameY: number;
  maxFrame: number;
  fps: number;
  frameTimer: number;
  frameInterfal: number;
  markedForDeletion: boolean;
  constructor(game: Game) {
    this.game = game;
  }
}
