export default class FloatingMessage {
  value: string;
  x: number;
  y: number;
  markedForDeletion: boolean;
  targetX: number;
  targetY: number;
  timer: number;
  constructor(
    value: string,
    x: number,
    y: number,
    targetX: number,
    targetY: number
  ) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.timer = 0;
    this.markedForDeletion = false;
  }

  update(): void {
    this.x += (this.targetX - this.x) * 0.03;
    this.y += (this.targetY - this.y) * 0.03;
    this.timer++;
    if (this.timer > 100) this.markedForDeletion = true;
  }

  draw(context: CanvasRenderingContext2D | null): void {
    if (!context) return;
    context.font = '40px Creepster';
    context.fillStyle = 'white';
    context.fillText(this.value, this.x, this.y);
    context.fillStyle = 'black';
    context.fillText(this.value, this.x + 2, this.y + 2);
  }
}
