import Game from './game';
import Sprite from './sprite';

class Layer extends Sprite {
  speedModifier: number;
  constructor(
    game: Game,
    width: number,
    height: number,
    speedModifier: number,
    image: HTMLImageElement
  ) {
    super(game);

    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.image = image;
    this.x = 0;
    this.y = 0;
  }

  update(): void {
    if (this.x < -this.width) this.x = 0;
    else this.x -= this.game.speed * this.speedModifier;
  }
  draw(context: CanvasRenderingContext2D | null): void {
    if (!context) return;
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

export default class Background extends Sprite {
  layer1image: CanvasImageSource;
  layer2image: CanvasImageSource;
  layer3image: CanvasImageSource;
  layer4image: CanvasImageSource;
  layer5image: CanvasImageSource;
  backgroundLayers: Layer[];
  layer1: Layer;
  layer2: Layer;
  layer3: Layer;
  layer4: Layer;
  layer5: Layer;

  constructor(game: Game, ...layers: HTMLImageElement[]) {
    super(game);

    this.width = 1667;
    this.height = 500;
    this.layer1image = layers[0];
    this.layer2image = layers[1];
    this.layer3image = layers[2];
    this.layer4image = layers[3];
    this.layer5image = layers[4];
    this.layer1 = new Layer(
      this.game,
      this.width,
      this.height,
      0,
      this.layer1image
    );
    this.layer2 = new Layer(
      this.game,
      this.width,
      this.height,
      0.2,
      this.layer2image
    );
    this.layer3 = new Layer(
      this.game,
      this.width,
      this.height,
      0.4,
      this.layer3image
    );
    this.layer4 = new Layer(
      this.game,
      this.width,
      this.height,
      0.8,
      this.layer4image
    );
    this.layer5 = new Layer(
      this.game,
      this.width,
      this.height,
      1,
      this.layer5image
    );

    this.backgroundLayers = [
      this.layer1,
      this.layer2,
      this.layer3,
      this.layer4,
      this.layer5,
    ];
  }

  update(): void {
    this.backgroundLayers.forEach((layer) => {
      layer.update();
    });
  }

  draw(context: CanvasRenderingContext2D | null): void {
    this.backgroundLayers.forEach((layer) => {
      if (!context) return;
      layer.draw(context);
    });
  }
}
