import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-floating-hearts',
  standalone: true,
  template: `<canvas #heartsCanvas class="hearts-canvas"></canvas>`,
  styles: [`
    .hearts-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9999; /* Luôn hiển thị trên cùng */
      pointer-events: none; /* Không chặn tương tác */
    }
  `]
})
export class FloatingHeartsComponent implements OnInit {
  @ViewChild('heartsCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private hearts: Heart[] = [];
  private canvas!: HTMLCanvasElement;
  private canvasWidth!: number;
  private canvasHeight!: number;
  private heartSpawnRate!: number; // Tốc độ sinh trái tim (phù hợp với màn hình)

  ngOnInit() {
    this.setupCanvas();
    this.updateSpawnRate();
    this.animate();
    this.generateHeartsAutomatically();
  }

  @HostListener('window:resize') onResize() {
    this.setupCanvas();
    this.updateSpawnRate();
  }

  setupCanvas() {
    this.canvas = this.canvasRef.nativeElement;
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
    this.ctx = this.canvas.getContext('2d')!;
  }

  updateSpawnRate() {
    // Điều chỉnh tốc độ sinh trái tim theo kích thước màn hình
    if (this.canvasWidth < 600) {
      this.heartSpawnRate = 700; // Mobile: ít trái tim hơn
    } else {
      this.heartSpawnRate = 400; // Desktop: nhiều trái tim hơn
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.hearts.forEach((heart, index) => {
      heart.update();
      heart.draw(this.ctx);
      if (heart.alpha <= 0 || heart.y > this.canvasHeight) {
        this.hearts.splice(index, 1);
      }
    });
  }

  generateHeartsAutomatically() {
    setInterval(() => {
      const x = Math.random() * this.canvasWidth;
      const y = -20;
      this.hearts.push(new Heart(x, y, this.canvasWidth));
    }, this.heartSpawnRate);
  }
}

class Heart {
  x: number;
  y: number;
  size: number;
  speedY: number;
  alpha: number;
  color: string;
  oscillation: number;

  constructor(x: number, y: number, screenWidth: number) {
    this.x = x;
    this.y = y;
    this.size = screenWidth < 600 ? Math.random() * 15 + 5 : Math.random() * 20 + 10; // Mobile nhỏ hơn
    this.speedY = Math.random() * 1.5 + 0.5; // Chậm hơn để nhìn đẹp
    this.alpha = 1;
    this.color = `hsl(${Math.random() * 360}, 100%, 60%)`; // Màu ngẫu nhiên
    this.oscillation = Math.random() * 4 - 2;
  }

  update() {
    this.y += this.speedY;
    this.x += this.oscillation;
    this.alpha -= 0.002; // Tồn tại lâu hơn
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();

    const s = this.size / 4;
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x - s, this.y - s * 2, this.x - s * 3, this.y + s, this.x, this.y + s * 3);
    ctx.bezierCurveTo(this.x + s * 3, this.y + s, this.x + s, this.y - s * 2, this.x, this.y);

    ctx.fill();
    ctx.restore();
  }
}
