// HTML5 CANVAS ATMOSPHERIC PARTICLE ENGINE
export class BackgroundCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.theme = 'archive';
        
        this.resize();
        window.addEventListener('resize', () => this.resize());
        this.initParticles();
        this.animate();
    }

    resize() {
        if (!this.canvas || !this.canvas.parentElement) return;
        this.canvas.width = this.canvas.parentElement.clientWidth;
        this.canvas.height = this.canvas.parentElement.clientHeight;
    }

    initParticles() {
        this.particles = [];
        const count = Math.floor((this.canvas.width * this.canvas.height) / 12000);
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2.5 + 0.5,
                speedY: Math.random() * -0.6 - 0.2,
                speedX: (Math.random() - 0.5) * 0.4,
                alpha: Math.random() * 0.7 + 0.3
            });
        }
    }

    setTheme(theme) {
        this.theme = theme;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let color = '0, 240, 255';
        if (this.theme === 'void') color = '157, 78, 221';
        if (this.theme === 'boss') color = '255, 42, 109';

        this.particles.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;

            if (p.y < 0) p.y = this.canvas.height;
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${color}, ${p.alpha})`;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}
