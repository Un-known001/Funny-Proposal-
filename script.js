const wrapper = document.getElementById("wrapper");
const question = document.getElementById("question");
const gif = document.getElementById("gif");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const heartsContainer = document.getElementById("hearts-container");

// Texts to cycle through when "No" is hovered
const noBtnTexts = [
  "Are you sure?",
  "Think about it one more time!",
  "Don't break my heart! 💔",
  "C'mon, please say yes!",
  "You're breaking my heart!😭",
  "Last chance... Just say yes!",
  "Please! Please! Please!🥺"
];

let clickCount = 0;
let yesBtnScale = 1;

// Function to move the "No" button and update things
const moveNoButton = () => {
  // 1. Make the button fixed so it jumps across the whole screen
  noBtn.style.position = "fixed";

  // 2. Change the text of the "No" button
  noBtn.innerText = noBtnTexts[clickCount % noBtnTexts.length];
  clickCount++;

  // 3. Make the "Yes" button bigger
  yesBtnScale += 0.2; // Grows by 20% each time
  yesBtn.style.transform = `scale(${yesBtnScale})`;

  // 4. Move the "No" button to a random position
  const noBtnRect = noBtn.getBoundingClientRect();
  const maxX = window.innerWidth - noBtnRect.width;
  const maxY = window.innerHeight - noBtnRect.height;

  // Added padding so it doesn't get stuck on the edge
  const randomX = Math.floor(Math.random() * (maxX - 40)) + 20;
  const randomY = Math.floor(Math.random() * (maxY - 40)) + 20;

  noBtn.style.left = randomX + "px";
  noBtn.style.top = randomY + "px";
};

// Listen for mouse hover (Desktops)
noBtn.addEventListener("mouseover", moveNoButton);
// Listen for touch (Mobile phones)
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault(); // Prevents accidental clicks on mobile
  moveNoButton();
});

// When they finally click "Yes"
yesBtn.addEventListener("click", () => {
  question.innerHTML = "Yay! Let's start our family ";
  gif.src = "https://media2.giphy.com/media/v1.Y2lkPTZjMDliOTUyaWdmZTI3c3EzcDAzaHI2NnN6bDJzZWFsc3BwMjRnYTN3cnozeHF0eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Nii2FhtCqITxT6uHnE/giphy.gif"; 
  
  // Hide the buttons
  yesBtn.style.display = "none";
  noBtn.style.display = "none";

  // Speed up the background hearts for celebration
  setInterval(createHeart, 50);
});

// Function to create floating background hearts
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "❤️";
  
  // Random horizontal position
  heart.style.left = Math.random() * 100 + "vw";
  // Random animation duration
  heart.style.animationDuration = Math.random() * 2 + 3 + "s";
  
  heartsContainer.appendChild(heart);
  
  // Remove heart after it floats up to save memory
  setTimeout(() => {
    heart.remove();
  }, 5000);
}

// Start creating normal background hearts every 300ms
setInterval(createHeart, 300);
