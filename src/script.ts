import './style.css';

import Game from './classes/game';

window.addEventListener('load', () => {
  const canvas = <HTMLCanvasElement>document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 900;
  canvas.height = 500;

  const game = new Game(canvas.width, canvas.height, animate);

  let lastTime = 0;

  function animate(timeStamp: number) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);

    if (!game.gameOver && !game.nextLevel) {
      requestAnimationFrame(animate);
    }
  }
  animate(0);
});
