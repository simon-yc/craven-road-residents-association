document.addEventListener('DOMContentLoaded', function() {
  const sliders = document.querySelectorAll('.slider');
  
  sliders.forEach(slider => {
      const slides = slider.querySelector('.slides');
      const allSlides = slider.querySelectorAll('.photo-item');
      let index = 0;

      function showSlide(n) {
          if (n >= allSlides.length) index = 0;
          if (n < 0) index = allSlides.length - 1;
          slides.style.transform = `translateX(-${index * 100}%)`;
      }

      slider.querySelector('.prev').addEventListener('click', () => {
          showSlide(--index);
      });

      slider.querySelector('.next').addEventListener('click', () => {
          showSlide(++index);
      });
  });
});
