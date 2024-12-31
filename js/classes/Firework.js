/**
 * Represents a firework, including its launch and explosion behavior.
 */
class Firework {
    /**
     * Create an instance of 'Firework' class.
     * @param {number} params.blastPower - Number of particles in the explosion.
     * @param {number} params.blastRadius - Maximum radius for particle spread.
     * @param {String[]} params.colors - Array of colors for the particles.
     * @param {object} params.launchPoint - Starting point of the charge.
     * @param {number} params.chargeSpeed - Speed of the charge movement.
     * @param {object} params.blastPoint - Target point where the charge explodes.
     */
    constructor(params) {
        // Configuration for the blast (explosion).
        this.blast = {
            colors: params.colors,                          
            power: params.blastPower,                        
            radius: params.blastRadius || 50,               
            particles: [],                                  // Array to hold active particles.

            isStarted: false,                               // Flag indicating if the explosion has started.
            isDone: false,                                  // Flag indicating if the explosion is complete.
        };

        // Configuration for the charge (pre-explosion projectile).
        this.charge = {
            x: params.launchPoint.x,                        // Initial x-coordinate of the charge.
            y: params.launchPoint.y,                        // Initial y-coordinate of the charge.
            size: 4,                                        // Size of the charge.
            color: 'white',                                 // Color of the charge.
            speed: params.chargeSpeed,                       
            launchPoint: params.launchPoint,                 
            blastPoint: params.blastPoint,                   

            isLaunched: false,                              // Flag indicating if the charge has launched.
        };

        this.parent = null;                                 // Reference to the rendering context.
    }



    /**
     * Links the firework to a parent rendering context.
     * @argument {CanvasRenderingContext2D} - Rendering context.
     */
    appendTo(parent) {
        if (parent && parent !== null) {
            this.parent = parent;
        } else {
            console.error('Link to parent is incorrect! Check parent reference value', parent);
        }
    }



    /**
     * Creates an explosion at a given position.
     * @param {number} x - The x-coordinate of the explosion.
     * @param {number} y - The y-coordinate of the explosion.
     */
    createExplosionAt(x, y) {
        const numberOfParticles = this.blast.power;

        for (let i = 0; i < numberOfParticles; i++) {
            const angle = Math.random() * Math.PI * 2;                   // Random angle in radians.
            const speed = Math.random() * this.blast.radius * 0.1 + 1;   // Speed influenced by blast radius.
            const colors = this.blast.colors;
            const color = colors[Math.floor(Math.random() * colors.length)];

            const particle = new Particle(
                x,
                y, 
                color, 
                angle, 
                speed, 
                Math.random() * 60 + 60  // Particle lifespan.
            ); 
            this.blast.particles.push(particle);

            // Attach particle to the parent context.
            particle.appendTo(this.parent); 
        }
    }



    /**
     * Renders the charge as it moves toward the blast point.
     */
    renderCharge() {
        const context = this.parent.renderer;

        context.beginPath();
        context.arc(this.charge.x, this.charge.y, this.charge.size, 0, Math.PI * 2);
        context.fillStyle = this.charge.color;
        context.fill();
    }



    /**
     * Launches the firework, rendering the charge and triggering the explosion.
     */
    launch() {
        if (this.parent) {
            // If the charge has not yet exploded.
            if (!this.charge.isLaunched) {
                // Move the charge toward the target (blast point).
                this.charge.x += (this.charge.blastPoint.x - this.charge.x) * 0.05;
                this.charge.y += (this.charge.blastPoint.y - this.charge.y) * 0.05;

                // Check if the charge has reached the blast point.
                if (
                    Math.abs(this.charge.x - this.charge.blastPoint.x) < 5 &&
                    Math.abs(this.charge.y - this.charge.blastPoint.y) < 5
                ) {
                    this.charge.isLaunched = true; // Mark the charge as exploded.
                    this.createExplosionAt(
                        this.charge.blastPoint.x,
                        this.charge.blastPoint.y
                    );
                }

                // Render the moving charge.
                this.renderCharge();
            } else {
                // Render the explosion particles.
                this.blast.particles.forEach((particle, index) => {
                    particle.update(); // Update particle position and state.
                    particle.render(); // Render the particle.
                    if (particle.life <= 0) {
                        // Remove particle if its life has ended.
                        this.blast.particles.splice(index, 1);
                    }
                });
            }
        } else {
            console.warn('Current firework has no link to parent', this.parent);
        }
    }
}
