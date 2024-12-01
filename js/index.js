// Array of image URLs (replace with your actual image paths)
const messageImages = ["img/slide-1-dark.png", "img/slide-2-dark.png", "img/slide-3-dark.png"];

const messagesContainer = document.getElementById("messagesContainer");
let currentImageIndex = 0;

function createMessageElement(imageUrl) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");

  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = "Chat Message";
  img.classList.add("img-fluid");

  messageDiv.appendChild(img);
  return messageDiv;
}

function addNewMessage() {
  // Create and add new message
  const newMessage = createMessageElement(messageImages[currentImageIndex]);
  messagesContainer.appendChild(newMessage);

  // Trigger reflow to enable transition
  void newMessage.offsetWidth;

  // Add visible class to animate with delay
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      newMessage.classList.add("visible");

      // Scroll to bottom
      // Scroll the container to the bottom to show the newly added message
      messagesContainer.scrollTop = messagesContainer.scrollHeight - messagesContainer.clientHeight;
    });
  });

  // Update index for next iteration
  currentImageIndex = (currentImageIndex + 1) % messageImages.length;
}
// Initial setup
addNewMessage();

// Add messages every 3 seconds
setInterval(addNewMessage, 2000);
