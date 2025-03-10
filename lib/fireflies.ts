export interface FirefliesConfig {
    count: number;      // Cantidad de luciérnagas
    speed: number;      // Velocidad de movimiento
    flicker: boolean;   // Activar parpadeo (true/false)
    colors: string[];   // Lista de colores de las luciérnagas
    sizeRange: [number, number]; // Tamaño mínimo y máximo de cada luciérnaga
    glow: boolean;      // Activar efecto glow
  }
  
  /**
   * Clase que representa una luciérnaga animada con color, tamaño y glow.
   */
  export class Firefly {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    opacityDirection: number;
    canvas: HTMLCanvasElement;
    flicker: boolean;
    color: string;
    glow: boolean;
    flickerSpeed: number;
  
    constructor(canvas: HTMLCanvasElement, config: FirefliesConfig) {
      this.canvas = canvas;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * (config.sizeRange[1] - config.sizeRange[0]) + config.sizeRange[0]; // Tamaño aleatorio
      this.speedX = (Math.random() - 0.5) * config.speed;
      this.speedY = (Math.random() - 0.5) * config.speed;
      this.opacity = 0.1 + Math.random() * 0.1; // **Hacemos las luciérnagas más opacas**
      this.opacityDirection = Math.random() < 0.1 ? .5 : -1; // Dirección de cambio de opacidad
      this.flickerSpeed = 0.002 + Math.random() * 0.004; // **Flicker mucho más suave y lento**
      this.flicker = config.flicker;
      this.color = this.getRandomColor(config.colors);
      this.glow = config.glow;
    }
  
    /**
     * Actualiza la posición y opacidad de la luciérnaga en cada frame.
     */
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
  
      if (this.x > this.canvas.width || this.x < 0) this.speedX = -this.speedX;
      if (this.y > this.canvas.height || this.y < 0) this.speedY = -this.speedY;
  
      // Flicker suave
      if (this.flicker) {
        this.opacity += this.opacityDirection * this.flickerSpeed;
        if (this.opacity > .5 || this.opacity < 0.1) {
          this.opacityDirection *= -1; // Invertir la dirección del flicker
        }
      }
    }
  
    /**
     * Dibuja la luciérnaga en el contexto 2D del canvas.
     */
    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  
      if (this.glow) {
        ctx.shadowBlur = this.size * 5; // **Glow más potente**
        ctx.shadowColor = `rgba(${this.getColorRGB()}, 1)`; // **Glow con más opacidad**
      } else {
        ctx.shadowBlur = 0; // Sin glow
      }
  
      ctx.fillStyle = `rgba(${this.getColorRGB()}, ${this.opacity})`;
      ctx.fill();
    }
  
    /**
     * Obtiene un color aleatorio de la lista de colores proporcionada.
     */
    private getRandomColor(colors: string[]): string {
      return colors[Math.floor(Math.random() * colors.length)];
    }
  
    /**
     * Convierte un color HEX a RGB si es necesario.
     */
    private getColorRGB(): string {
      if (this.color.startsWith("#")) {
        const hex = this.color.replace("#", "");
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r}, ${g}, ${b}`;
      } else if (this.color.startsWith("rgb")) {
        return this.color.replace("rgba(", "").replace("rgb(", "").replace(")", "");
      }
      return this.color;
    }
  }
  