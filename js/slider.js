document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelector('.slides');
    const allSlides = document.querySelectorAll('.slide');
    let index = 0;
  
    function showSlide(n) {
      if (n >= allSlides.length) index = 0;
      if (n < 0) index = allSlides.length - 1;
      slides.style.transform = `translateX(-${index * 100}%)`;
    }
  
    document.querySelector('.prev').addEventListener('click', () => {
      showSlide(--index);
    });
  
    document.querySelector('.next').addEventListener('click', () => {
      showSlide(++index);
    });
  });
  