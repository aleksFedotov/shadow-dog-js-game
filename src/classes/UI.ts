import Game from './game';

export default class UI {
  game: Game;
  fonstSize: number;
  fontFamily: string;
  image: CanvasImageSource;
  constructor(game: Game) {
    this.game = game;
    this.fonstSize = 30;
    this.fontFamily = 'Creepster';
    this.image = <HTMLImageElement>document.getElementById('live');
  }

  draw(context: CanvasRenderingContext2D | null): void {
    if (!context) return;
    context.save();
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = 'white';
    context.shadowBlur = 0;
    context.font = `${this.fonstSize}px ${this.fontFamily}`;
    context.textAlign = 'left';
    context.fillStyle = this.game.fontColor;
    // score
    context.fillText(`Score: ${this.game.score}`, 20, 50);
    // timer
    context.font = `${this.fonstSize * 0.8}px ${this.fontFamily}`;
    context.fillText(
      `Game time: ${(this.game.time * 0.001).toFixed(1)} seconds`,
      20,
      80
    );
    // energy
    context.save();
    context.font = `${this.fonstSize * 0.8}px ${this.fontFamily}`;
    context.fillStyle = this.game.player.energy <= 20 ? 'red' : 'black';
    context.fillText(`Energy: ${this.game.player.energy}`, 20, 110);
    context.restore();
    // lives
    for (let i = 0; i < this.game.lives; i++) {
      context.drawImage(this.image, 35 * i + 20, 125, 25, 25);
    }

    // instructions
    context.textAlign = 'center';
    context.font = `${this.fonstSize * 0.5}px Heavitas`;
    context.fillText(
      `(W,A,S,D = Move, Space = Roll)`,
      this.game.width * 0.5,
      20
    );
    // game over messages
    if (this.game.gameOver) {
      context.textAlign = 'center';
      context.font = `${this.fonstSize * 2}px ${this.fontFamily}`;

      context.fillText(
        `Well done`,
        this.game.width * 0.5,
        this.game.height * 0.5 - 20
      );
      context.font = `${this.fonstSize * 1}px ${this.fontFamily}`;
      context.fillText(
        `Survival time: ${(this.game.time * 0.001).toFixed(1)} seconds`,
        this.game.width * 0.5,
        this.game.height * 0.5 + 20
      );
      context.fillText(
        `Score: ${this.game.score}`,
        this.game.width * 0.5,
        this.game.height * 0.5 + 50
      );
      context.fillText(
        `Press "Enter" to restart`,
        this.game.width * 0.5,
        this.game.height * 0.5 + 80
      );
    }

    context.restore();
  }
}
