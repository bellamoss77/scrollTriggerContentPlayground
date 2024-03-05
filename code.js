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
    // Function to open the lightbox and load the PDF
    function openLightbox(pdfURL) {
        gsap.to('#lightbox', { autoAlpha: 1, duration: 0.5 });
        lightbox.style.display = 'flex';
        lightbox.style.opacity = '1';
        lightbox.style.visibility = 'visible';
        closeBtn.focus();

        // Delay the PDF initialization to ensure it opens with the lightbox animation
        setTimeout(() => initializeAdobeDC(pdfURL), 500);

        setTimeout(() => {
           lightbox.focus(); 
        }, 1000);
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
        if (event.key === 'Escape' || event.keyCode === 27) {
            closeLightbox();
        }
    });

        lightbox.addEventListener('click', function(e) {
            if (e.target === this) { closeLightbox(); }
        });

    
        
        

    // Initialize GSAP for the lightbox
    gsap.set('#lightbox', { autoAlpha: 0 });
});
