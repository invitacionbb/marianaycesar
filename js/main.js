const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  const windowHeight = window.innerHeight;

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < windowHeight - 90) {
      element.classList.add("is-visible");
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

const backgroundMusic = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicButton");
const audioPlayButton = document.getElementById("audioPlayButton");
const heroInviteButton = document.querySelector(".hero .primary-button");

const updateMusicButtons = (isPlaying) => {
  if (musicButton) {
    musicButton.classList.toggle("is-playing", isPlaying);
    musicButton.textContent = isPlaying ? "❚❚" : "♫";
  }

  if (audioPlayButton) {
    audioPlayButton.classList.toggle("is-playing", isPlaying);

    const audioText = audioPlayButton.querySelector(".audio-text");

    if (audioText) {
      audioText.textContent = isPlaying ? "Pausar música" : "Reproducir música";
    }
  }
};

const playMusic = async () => {
  if (!backgroundMusic) return;

  try {
    await backgroundMusic.play();
    updateMusicButtons(true);
  } catch (error) {
    updateMusicButtons(false);
  }
};

const toggleMusic = async () => {
  if (!backgroundMusic) return;

  if (backgroundMusic.paused) {
    await playMusic();
  } else {
    backgroundMusic.pause();
    updateMusicButtons(false);
  }
};

if (musicButton) {
  musicButton.addEventListener("click", toggleMusic);
}

if (audioPlayButton) {
  audioPlayButton.addEventListener("click", toggleMusic);
}

if (heroInviteButton) {
  heroInviteButton.addEventListener("click", () => {
    playMusic();
  });
}
const galleryTrack = document.getElementById("galleryTrack");
const galleryDots = document.querySelectorAll(".gallery-dot");

let currentGallerySlide = 0;

const updateGallery = (index) => {
  if (!galleryTrack || !galleryDots.length) return;

  currentGallerySlide = index;

  galleryTrack.style.transform = `translateX(-${currentGallerySlide * 100}%)`;

  galleryDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === currentGallerySlide);
  });
};

galleryDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    updateGallery(index);
  });
});

setInterval(() => {
  if (!galleryTrack || !galleryDots.length) return;

  const nextSlide = (currentGallerySlide + 1) % galleryDots.length;
  updateGallery(nextSlide);
}, 4200);