import Game from './game';

export default class InputHandler {
  keys: string[];
  game: Game;
  constructor(game: Game) {
    this.keys = [];
    this.game = game;

    window.addEventListener('keydown', (e) => {
      console.log(e.key);
      if (
        (e.key === 's' ||
          e.key === 'w' ||
          e.key === 'a' ||
          e.key === 'd' ||
          e.key === ' ') &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
      } else if (e.key === 'Enter' && this.game.gameOver)
        this.game.gameRestart();
    });
    window.addEventListener('keyup', (e) => {
      if (
        e.key === 's' ||
        e.key === 'w' ||
        e.key === 'a' ||
        e.key === 'd' ||
        e.key === ' '
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
