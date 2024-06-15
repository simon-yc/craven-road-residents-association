document.addEventListener('DOMContentLoaded', function() {
    // Function to create an image element
    function createImageElement(src, alt, description) {
        const photoItem = document.createElement('div');
        photoItem.classList.add('photo-item', 'slide');

        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;

        photoItem.appendChild(img);

        if (description) {
            const descriptionDiv = document.createElement('div');
            descriptionDiv.classList.add('photo-description');
            descriptionDiv.innerText = description;
            photoItem.appendChild(descriptionDiv);
        }

        return photoItem;
    }

    // Load images dynamically and initialize sliders
    const sliders = document.querySelectorAll('.slider');

    sliders.forEach(slider => {
        const basePath = slider.getAttribute('data-base-path');
        const imageNames = JSON.parse(slider.getAttribute('data-image-names'));
        const imageDescriptions = JSON.parse(slider.getAttribute('data-image-descriptions'));

        if (!basePath || !imageNames || !imageDescriptions) {
            console.error('basePath, imageNames, or imageDescriptions is not defined for slider');
            return;
        }

        const slidesContainer = slider.querySelector('.slides');

        // Add the images to the slides container
        imageNames.forEach((imageName, index) => {
            const imgSrc = basePath + imageName;
            const altText = 'photo ' + (index + 1);
            const description = imageDescriptions[index] || null;

            const photoItem = createImageElement(imgSrc, altText, description);
            slidesContainer.appendChild(photoItem);
        });

        const allSlides = slider.querySelectorAll('.photo-item');
        let index = 0;

        function showSlide(n) {
            if (n >= allSlides.length) index = 0;
            if (n < 0) index = allSlides.length - 1;
            slidesContainer.style.transform = `translateX(-${index * 100}%)`;
        }

        slider.querySelector('.prev').addEventListener('click', () => {
            showSlide(--index);
        });

        slider.querySelector('.next').addEventListener('click', () => {
            showSlide(++index);
        });
    });
});
