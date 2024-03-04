gsap.registerPlugin(ScrollTrigger);


gsap.to('.gallery-title', {
    scrollTrigger: {
        trigger: '.gallery-title',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onLeave: () => document.querySelector('header').classList.add('fixed-header')
    },
    opacity: 0
});

gsap.from('.gallery-description', {
    scrollTrigger: {
        trigger: '.gallery-description',
        start: 'top 80%',
        end: 'bottom bottom',
        scrub: true, 
    },
    opacity: 0,
    ease: 'power2.inOut',
    duration: 2
});

gsap.to('header', {
    scrollTrigger: {
        trigger: '.gallery-title',
        start: 'bottom bottom',
        scrub: true
    },
    transform: 'translateY(0%)',
    ease: 'power1.inOut',
    duration: 1.5
})

gsap.from('.quote-attribution', {
    scrollTrigger: {
        trigger: '.quote-attribution',
        start: 'top bottom',
        end: 'top center',
        scrub: true
    },
    opacity: 0
});

function loadAdobeDC(callback) {
    var adobeScript = document.createElement('script');
    adobeScript.src = 'https://documentcloud.adobe.com/view-sdk/main.js';
    adobeScript.onload = callback; // Call the callback function once the script is loaded
    document.head.appendChild(adobeScript);
}

document.addEventListener('DOMContentLoaded', () => {
    const essays = [
        'https://raw.githubusercontent.com/bellamoss77/scrollTriggerContentPlayground/main/PDFs/Education-Transcendence.pdf',
        'https://raw.githubusercontent.com/bellamoss77/scrollTriggerContentPlayground/main/PDFs/Glasses-in-the-Air.pdf',
        'https://raw.githubusercontent.com/bellamoss77/scrollTriggerContentPlayground/main/PDFs/Life-and-Learning-to-Survive.pdf',
        'https://raw.githubusercontent.com/bellamoss77/scrollTriggerContentPlayground/main/PDFs/Man-Behind-the-Mustache.pdf',
        'https://raw.githubusercontent.com/bellamoss77/scrollTriggerContentPlayground/main/PDFs/A-Moment-In-My-Arms.pdf',
        'https://raw.githubusercontent.com/bellamoss77/scrollTriggerContentPlayground/main/PDFs/The-Arrival.pdf',
        'https://raw.githubusercontent.com/bellamoss77/scrollTriggerContentPlayground/main/PDFs/Reason-to-Change.pdf'
    ];

    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    let currentEssayIndex = 0;

    prevButton.style.display = 'none';

    function updateButtons() {
        if (currentEssayIndex === 0) {
            prevButton.style.display = 'none';
            nextButton.style.display = 'block';
        } else if (currentEssayIndex === essays.length - 1) {
            prevButton.style.display = 'block';
            nextButton.style.display = 'none';
        } else {
            prevButton.style.display = 'block'
            nextButton.style.display = 'block'
        }
    }

    function loadEssayByIndex(index) {
        const pdfURL = essays[index];
        loadEssay(pdfURL);
        currentEssayIndex = index;
        updateButtons();
    }

    function prevEssay() {
        if (currentEssayIndex > 0) {
            loadEssayByIndex(currentEssayIndex - 1);
        }
    }

    function nextEssay() {
        if (currentEssayIndex < essays.length - 1) {
            loadEssayByIndex(currentEssayIndex + 1);
        }
    }

    prevButton.addEventListener('click', prevEssay);
    nextButton.addEventListener('click', nextEssay);

    loadEssayByIndex(currentEssayIndex);

    function loadEssay(pdfURL) {
        currentEssay = pdfURL;
        initializeAdobeDC(pdfURL);
    }
    // Function to open the lightbox and load the PDF
    function openLightbox(pdfURL) {
        gsap.to('#lightbox', { autoAlpha: 1, duration: 0.5 });
        lightbox.style.display = 'flex';
        lightbox.style.opacity = '1';
        lightbox.style.visibility = 'visible';
        lightbox.focus();

        // Delay the PDF initialization to ensure it opens with the lightbox animation
        setTimeout(() => initializeAdobeDC(pdfURL), 500);
    }

    // Function to close the lightbox
    function closeLightbox() {
        gsap.to('#lightbox', { autoAlpha: 0, duration: 0.5, onComplete: () => {
            document.getElementById('lightbox').style.display = 'none';
            document.getElementById('pdf-render-container').innerHTML = '';
            lightbox.blur();
        }});
    }

    

    // Initialize Adobe DC View after ensuring the AdobeDC script is loaded
    function initializeAdobeDC(pdfURL) {
        loadAdobeDC(() => {
            if (window.AdobeDC) {
                var adobeDCView = new AdobeDC.View({ clientId: '0b400b32168e46968edadc4881ee763d', divId: 'pdf-render-container' });
                adobeDCView.previewFile({
                    content: { location: { url: pdfURL } },
                    metaData: { fileName: 'Document.pdf' }
                }, {});
            } else {
                console.error('Failed to load AdobeDC.');
            }
        });
    }

    // Event listeners for gallery images to open the lightbox with the selected PDF
    document.querySelectorAll('.gallery-img').forEach(item => {
        item.addEventListener('click', function() {
            const pdfURL = this.getAttribute('data-pdf');
            openLightbox(pdfURL);
        });
    });

    // Event listeners for closing the lightbox
    const close = document.getElementById('close'); 
        close.addEventListener('click', closeLightbox);

        const lightbox = document.getElementById('lightbox');
        lightbox.setAttribute('tabindex', '-1');
       
        lightbox.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                console.log('Escape key pressed');
                closeLightbox();
            }
        });

        lightbox.addEventListener('click', function(e) {
            if (e.target === this) { closeLightbox(); }
        });

    
        
        

    // Initialize GSAP for the lightbox
    gsap.set('#lightbox', { autoAlpha: 0 });
});
