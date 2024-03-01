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
        start: 'top -=25% top',
        end: 'bottom 80%',
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


document.addEventListener('DOMContentLoaded', (event) => {
    const lightbox = document.getElementById('lightbox');
    const pdfRenderContainer = document.getElementById('pdf-render-container');
    const closeLightboxBtn = document.getElementById('close');

    function openLightbox(pdfURL) {
        gsap.to(lightbox, { autoAlpha: 1, duration: 0.5 });
        lightbox.style.display = 'flex';
        lightbox.style.opacity = '1';
        lightbox.style.visibility = 'visible';
        renderPDF(pdfURL, pdfRenderContainer);
    }

    function closeLightbox() {
        gsap.to(lightbox, { autoAlpha: 0, duration: 0.5, onComplete: () => {
            lightbox.style.display = 'none';
            lightbox.style.opacity = '0';
            lightbox.style.opacity = 'hidden'
            pdfRenderContainer.innerHTML = ''; 
        }});
    }

    //pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

    document.querySelectorAll('.gallery-img').forEach(item => {
        item.addEventListener('click', function() {
            const pdfURL = this.getAttribute('data-pdf');
            openLightbox(pdfURL);
        });
    });

    closeLightboxBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) closeLightbox();
    });

    gsap.set(lightbox, { autoAlpha: 0 });

    function renderPDF(pdfURL, container) {
        var loadingTask = pdfjsLib.getDocument(pdfURL);
        loadingTask.promise.then(pdf => {
            console.log('PDF loaded');
            
            pdf.getPage(1).then(page => {
                console.log('Page loaded');
                
                var viewport = page.getViewport({ scale: 1.5 });
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                
                page.render(renderContext).promise.then(() => {
                    console.log('Page rendered');
                    container.appendChild(canvas);
                });
            });
        }, reason => console.error(reason));
    }
});
  
 