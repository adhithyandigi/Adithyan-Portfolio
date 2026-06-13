document.addEventListener("DOMContentLoaded", () => {
    
    // ===================================================
    // 1. INERTIAL SMOOTH SCROLL ENGINE (LENIS)
    // ===================================================
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ===================================================
    // 2. THREE.JS IMMERSIVE AMBIENT BACKGROUND SYSTEM
    // ===================================================
    const canvas = document.querySelector('#webgl-bg');
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle Cloud Geometry Architecture
    const particlesCount = 400;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i=0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 15;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material Styling
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.03,
        color: 0x0071e3,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Track Loop & Window Resizing Engines
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    let clock = new THREE.Clock();

    function renderLoop() {
        const elapsedTime = clock.getElapsedTime();
        particlesMesh.rotation.y = elapsedTime * 0.05;
        particlesMesh.rotation.x = elapsedTime * 0.02;
        renderer.render(scene, camera);
        requestAnimationFrame(renderLoop);
    }
    renderLoop();

    // ===================================================
    // 3. GSAP + SCROLLTRIGGER STORYTELLING PIPELINE
    // ===================================================
    gsap.registerPlugin(ScrollTrigger);

    const storyWrapper = document.getElementById("story-wrapper");
    const characterContainer = document.getElementById("character-container");
    const characterSprite = document.getElementById("hero-boy");

    // Dynamic horizontal sequence calculation
    let scrollTween = gsap.to(storyWrapper, {
        x: () => -(storyWrapper.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
            trigger: "#story-track",
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => "+=" + storyWrapper.scrollWidth,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
                // Procedural dynamic walking toggle logic
                if (self.velocity !== 0) {
                    characterSprite.classList.add("character-walking");
                } else {
                    characterSprite.classList.remove("character-walking");
                }
            },
            onLeave: () => {
                // Smooth transition down to normal portfolio content layers
                gsap.to(characterContainer, { opacity: 0, duration: 0.3 });
                characterSprite.classList.remove("character-walking");
            },
            onEnterBack: () => {
                gsap.to(characterContainer, { opacity: 1, duration: 0.3 });
            }
        }
    });

    // ===================================================
    // 4. PARALLAX ENVIRONMENT & AGING CONTROLLERS
    // ===================================================
    const panels = gsap.utils.toArray(".story-panel");
    
    panels.forEach((panel) => {
        const content = panel.querySelector(".panel-content");
        const elements = panel.querySelectorAll(".visual-element");

        // Stagger fade and entry metrics for panel narratives
        if(content) {
            gsap.to(content, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: panel,
                    containerAnimation: scrollTween,
                    start: "left 60%",
                    end: "right 50%",
                    toggleActions: "play reverse play reverse"
                }
            });
        }

        // Element explicit tracking system (Parallax)
        elements.forEach(el => {
            gsap.fromTo(el, 
                { x: 100, opacity: 0 },
                { 
                    x: -150, 
                    opacity: 1,
                    scrollTrigger: {
                        trigger: panel,
                        containerAnimation: scrollTween,
                        start: "left 80%",
                        end: "right 20%",
                        scrub: 1.5
                    }
                }
            );
        });

        // Evolution Engine: Age & morph tracking based on active panel criteria
        ScrollTrigger.create({
            trigger: panel,
            containerAnimation: scrollTween,
            start: "left 50%",
            end: "right 50%",
            onEnter: () => updateAgeClass(panel.dataset.age),
            onEnterBack: () => updateAgeClass(panel.dataset.age)
        });
    });

    function updateAgeClass(age) {
        if(!age) return;
        characterSprite.className = "character-sprite"; // Clear conditions
        characterSprite.classList.add(age);
    }

    // ===================================================
    // 5. LINEAR EXPERTISE METRIC ANIMATION
    // ===================================================
    const skillBars = gsap.utils.toArray(".skill-bar-fill");
    skillBars.forEach(bar => {
        gsap.to(bar, {
            width: bar.dataset.width,
            duration: 1.5,
            ease: "power4.out",
            scrollTrigger: {
                trigger: bar,
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });
    });
});
