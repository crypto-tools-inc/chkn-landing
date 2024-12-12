class Fountain {
  constructor(targetElementId) {
    this.targetElementId = targetElementId;
    this.limit = 100; // Increased limit for continuous generation
    this.particles = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.isMouseDown = false;
    this.height = document.documentElement.clientHeight;
    this.sizes = [15, 20, 25, 35, 45];
    this.variants = ["🔥", "✨", "🌟", "❤️"];

    this.targetElement = document.getElementById(this.targetElementId);

    if (!this.targetElement) {
      console.error(`Target element with ID "${targetElementId}" not found!`);
      return;
    }

    this.addHandlers();
    this.loop();
  }

  loop() {
    // Create multiple particles if mouse is down and below particle limit
    if (this.isMouseDown && this.particles.length < this.limit) {
      // Create multiple particles per frame for a burst effect
      for (let i = 0; i < 3; i++) {
        this.createParticle();
      }
    }

    this.updateParticles();
    requestAnimationFrame(this.loop.bind(this));
  }

  addHandlers() {
    // Track mouse position over the entire document
    document.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    // Mouse down starts particle generation
    this.targetElement.addEventListener("mousedown", (e) => {
      this.isMouseDown = true;
      // Create initial particles on mouse down
      for (let i = 0; i < 5; i++) {
        this.createParticle();
      }
    });

    // Mouse up stops particle generation
    document.addEventListener("mouseup", () => {
      this.isMouseDown = false;
    });

    // Ensure particle generation stops if mouse leaves the document
    document.addEventListener("mouseleave", () => {
      this.isMouseDown = false;
    });
  }

  createParticle() {
    if (this.particles.length >= this.limit) return;

    const size = this.sizes[Math.floor(Math.random() * this.sizes.length)];
    const speedHorz = Math.random() * 10;
    const speedUp = Math.random() * 25;
    const spinVal = Math.random() * 360;
    const spinSpeed = Math.random() * 35 * (Math.random() <= 0.5 ? -1 : 1);
    const direction = Math.random() <= 0.5 ? -1 : 1;

    // Add some randomness to particle spawn location
    const offsetX = (Math.random() - 0.5) * 40;
    const offsetY = (Math.random() - 0.5) * 40;

    const particle = document.createElement("span");
    particle.innerHTML = this.variants[Math.floor(Math.random() * this.variants.length)];
    particle.classList.add("particle");

    particle.setAttribute(
      "style",
      `
      position: fixed;
      font-size: ${size}px;
      left: ${this.mouseX + offsetX - size / 2}px;
      top: ${this.mouseY + offsetY - size / 2}px;
      transform: rotate(${spinVal}deg);
      pointer-events: none;
      z-index: 9999;
      opacity: 0.9;
      `
    );

    document.body.appendChild(particle);

    this.particles.push({
      element: particle,
      size,
      speedHorz,
      speedUp,
      spinVal,
      spinSpeed,
      left: this.mouseX + offsetX - size / 2,
      top: this.mouseY + offsetY - size / 2,
      direction,
      createdAt: Date.now(),
    });
  }

  updateParticles() {
    const currentTime = Date.now();

    this.particles.forEach((p, index) => {
      // Update particle position
      p.left = p.left - p.speedHorz * p.direction;
      p.top = p.top - p.speedUp;

      // Simulate gravity
      p.speedUp = Math.min(p.size, p.speedUp - 1);

      // Update rotation
      p.spinVal = p.spinVal + p.spinSpeed;

      // Remove particles that have fallen below the screen or exist too long
      if (p.top >= this.height + p.size || currentTime - p.createdAt > 2000) {
        p.element.remove();
        this.particles.splice(index, 1);
        return;
      }

      // Update particle style
      p.element.setAttribute(
        "style",
        `
        position: fixed;
        left: ${p.left}px;
        top: ${p.top}px;
        font-size: ${p.size}px;
        transform: rotate(${p.spinVal}deg);
        pointer-events: none;
        z-index: 9999;
        opacity: ${1 - (currentTime - p.createdAt) / 2000};
        `
      );
    });
  }
}

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  window.fountain = new Fountain("reaction-1");
  window.fountain = new Fountain("reaction-2");
});
