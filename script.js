
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId)
 
    toggle.addEventListener('click', () =>{
       
        nav.classList.toggle('show-menu')
 
        
        toggle.classList.toggle('show-icon')
    })
 }
 
 showMenu('nav-toggle','nav-menu')
 


 document.addEventListener('DOMContentLoaded', function() {
    var toggles = document.querySelectorAll('.toggle');
    var descriptions = document.querySelectorAll('.description');
    var carouselImages = document.querySelector('.carousel-images');
    var images = document.querySelectorAll('.carousel-images img');
    var prevButton = document.querySelector('.prev');
    var nextButton = document.querySelector('.next');
    var opportunityText = document.getElementById('opportunity-text');

    // Content for each section
    var sectionContent = [
        { id: 'opportunity-management' },
        { id: 'products-quotations', text: 'Products & Quotations description for image 2 goes here.' },
        { id: 'sales-orders-invoices', text: 'Sales Orders & Invoices description for image 3 goes here.' }
    ];

    var currentIndex = 0;
    var intervalTime = 2000; // 2 seconds

    function showDescription(targetId) {
        descriptions.forEach(function(description) {
            if (description.id === targetId) {
                description.style.display = 'block';
            } else {
                description.style.display = 'none';
            }
        });
    }

    toggles.forEach(function(toggle) {
        toggle.addEventListener('click', function() {
            var targetId = this.getAttribute('data-target');
            showDescription(targetId);
            clearInterval(autoSlide); // Stop the auto-slide when a manual toggle is clicked
        });
    }); 

    function updateCarousel() {
        var offset = -currentIndex * 100; 
        carouselImages.style.transform = 'translateX(' + offset + '%)'; 
        showDescription(sectionContent[currentIndex].id);
        opportunityText.textContent = sectionContent[currentIndex].text;
    }

    function nextSlide() {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    }

    nextButton.addEventListener('click', function() {
        nextSlide();
        clearInterval(autoSlide); 
    });

    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        updateCarousel();
        clearInterval(autoSlide); 
    });

    
    var autoSlide = setInterval(nextSlide, intervalTime);

    
    updateCarousel();
});


var nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    carousel = document.querySelector('.carousel'),
    list = document.querySelector('.list'), 
    item = document.querySelectorAll('.item'),
    runningTime = document.querySelector('.carousel .timeRunning') 

let timeRunning = 5000 
let timeAutoNext = 5000

nextBtn.onclick = function(){
    showSlider('next')
}

prevBtn.onclick = function(){
    showSlider('prev')
}

let runTimeOut 

let runNextAuto = setTimeout(() => {
    nextBtn.click()
}, timeAutoNext)


function resetTimeAnimation() {
    runningTime.style.animation = 'none'
    runningTime.offsetHeight /* trigger reflow */
    runningTime.style.animation = null 
    runningTime.style.animation = 'runningTime 5s linear 1 forwards'
}


function showSlider(type) {
    let sliderItemsDom = list.querySelectorAll('.carousel .list .item')
    if(type === 'next'){
        list.appendChild(sliderItemsDom[0])
        carousel.classList.add('next')
    } else{
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1])
        carousel.classList.add('prev')
    }

    clearTimeout(runTimeOut)

    runTimeOut = setTimeout( () => {
        carousel.classList.remove('next')
        carousel.classList.remove('prev')
    }, timeRunning)


    clearTimeout(runNextAuto)
    runNextAuto = setTimeout(() => {
        nextBtn.click()
    }, timeAutoNext)

    resetTimeAnimation() // Reset the running time animation
}

// Start the initial animation 
resetTimeAnimation()