gsap.registerPlugin(ScrollTrigger);

gsap.to('.gallery-title', {
    scrollTrigger: {
        trigger: '.gallery-title',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        markers: true,
        onLeave: () => document.querySelector('header').classList.add('fixed-header')
    },
    opacity: 0
});

gsap.from('.gallery-description', {
    scrollTrigger: {
        trigger: '.gallery-description',
        start: 'top center +=10%',
        end: 'bottom 80%',
        scrub: true, 
        markers: true
    },
    x: '-100%',
    y: 0,
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
    x: 200,
    opacity: 0
});

gsap.from('.left-slide-in', {
    scrollTrigger: {
        trigger: '.left-slide-in',
        start: 'top bottom += 5%',
        end: 'bottom center',
        scrub: true,
        markers: true
    },
    x: '-100%',
    opacity: 0,
    ease: 'bounce',
    duration: 2
})

gsap.from('.fade-in', {
    scrollTrigger: {
        trigger: '.fade-in',
        start: 'top bottom += 5%',
        end: 'bottom-center',
        scrub: true
    },
    opacity: 0,
    duration: 2
})

gsap.from('.right-slide-in', {
    scrollTrigger: {
        trigger: '.right-slide-in',
        start: 'top bottom += 5%',
        end: 'bottom-center',
        scrub: true
    },
    x: '100%',
    opacity: 0,
    ease: 'bounce',
    duration: 2
})