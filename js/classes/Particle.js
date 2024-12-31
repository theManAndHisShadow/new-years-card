/**
 * Represents a single particle in the firework explosion.
 */
class Particle {
    /**
     * Create an instance of 'Particle' class.
     * @param {Number} x - Current x-coordinate of the particle.
     * @param {Number} y - Current y-coordinate of the particle.
     * @param {string} color - Color of the particle.
     * @param {number} angle - Movement angle in radians.
     * @param {number} speed - Movement speed.
     * @param {number} life - Lifespan of the particle in frames;
     */
    constructor(x, y, color, angle, speed, life) {
        this.x = x;                 
        this.y = y;                  
        this.color = color;          
        this.angle = angle;          
        this.speed = speed;          
        this.life = life;            
        this.size = 2;              // Initial size of the particle.

        this.parent = null;         // Reference to the rendering context (Firework instance).
    }



    /**
     * Updates the particle's position and size.
     */
    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.life -= 1; // Decrease lifespan.
        this.size = Math.max(0, this.size - 0.05); // Gradually shrink the particle.
    }



    /**
     * Links the particle to a parent rendering context.
     * @param {CanvasRenderingContext2D} link to rendering context
     */
    appendTo(parent) {
        if (parent && parent !== null) {
            this.parent = parent;
        } else {
            console.error('Link to parent is incorrect! Check parent reference value', parent);
        }
    }



    /**
     * Renders the particle on the canvas.
     */
    render() {
        if (this.parent) {
            this.parent.renderer.beginPath();
            this.parent.renderer.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            this.parent.renderer.fillStyle = this.color;
            this.parent.renderer.fill();
        } else {
            console.warn('Current particle has no link to parent', this.parent);
        }
    }
}