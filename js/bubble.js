class BubbleEffect {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      bubbleCount: options.bubbleCount || 20,
      minSize: options.minSize || 1,
      maxSize: options.maxSize || 5,
      minSpeed: options.minSpeed || 1,
      maxSpeed: options.maxSpeed || 10,
      minLifespan: options.minLifespan || 2000,
      maxLifespan: options.maxLifespan || 5000,
      frequency: options.frequency || 500,
    };
    this.init();
  }

  init() {
    this.createBubbles();
    setInterval(() => this.createBubbles(), this.options.frequency);
  }

  createBubbles() {
    for (let i = 0; i < this.options.bubbleCount; i++) {
      this.createSingleBubble();
    }
  }

  createSingleBubble() {
    const bubble = document.createElement("div");
    const size = this.randomNumber(this.options.minSize, this.options.maxSize);

    // Randomize bubble color and opacity
    const opacity = this.randomNumber(0.4, 0.8);
    const hue = this.randomNumber(260, 300); // Purple-ish range

    bubble.style.position = "absolute";
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.borderRadius = "50%";
    bubble.style.backgroundColor = `hsla(${hue}, 50%, 80%, ${opacity})`;
    bubble.style.left = `${this.randomNumber(0, this.container.clientWidth)}px`;
    bubble.style.bottom = "0";

    this.container.appendChild(bubble);

    this.animateBubble(bubble, size);
  }

  animateBubble(bubble, size) {
    const speed = this.randomNumber(this.options.minSpeed, this.options.maxSpeed);

    const lifespan = this.randomNumber(this.options.minLifespan, this.options.maxLifespan);

    const animation = bubble.animate(
      [
        {
          transform: "translateY(0)",
          opacity: bubble.style.opacity,
        },
        {
          transform: `translateY(-${this.container.clientHeight * 1.5}px)`,
          opacity: 0,
        },
      ],
      {
        duration: lifespan,
        easing: "linear",
      }
    );

    // Set a timeout to remove the bubble after its lifespan
    const removeTimeout = setTimeout(() => {
      if (this.container.contains(bubble)) {
        this.container.removeChild(bubble);
      }
    }, lifespan);

    animation.onfinish = () => {
      clearTimeout(removeTimeout);
      if (this.container.contains(bubble)) {
        this.container.removeChild(bubble);
      }
    };
  }

  randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
}

// Initialize the bubble effect when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const bubbleContainer = document.getElementById("bubbleContainer");
  new BubbleEffect(bubbleContainer, {
    minLifespan: 2000,
    maxLifespan: 5000,
  });
});
