// GSAP ScrollTrigger functionality for full-height panel scrolling
document.addEventListener("DOMContentLoaded", function() {


    // ------------------------------------
    // Lenis Smooth Scroll Setup
    // ------------------------------------
    const lenis = new Lenis({
        duration: 1.2,
        easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        gestureDirection: 'vertical',
    });
    
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    // Register ScrollTrigger and sync with Lenis
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.scrollerProxy(document.body, {
        scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value, { immediate: true }) : lenis.scroll;
        },
        scrollLeft(value) {
        return arguments.length ? lenis.scrollTo(value, { immediate: true, axis: 'x' }) : (lenis.scrollX || 0);
        },
        getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.body.style.transform ? "transform" : "fixed"
    });
    
    // Tell ScrollTrigger to update when Lenis scrolls
    lenis.on("scroll", ScrollTrigger.update);


    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Get all panels and indicators
    const panels = document.querySelectorAll('.panel');
    const indicators = document.querySelectorAll('.panel-indicator');
    
    // Function to update panel indicators
    function updateIndicators(activePanelNumber) {
        indicators.forEach((indicator, index) => {
            if (index + 1 === activePanelNumber) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Initialize indicators - first panel should be active
    if (indicators.length > 0) {
        indicators[0].classList.add('active');
    }
    
    // Create ScrollTrigger for each panel
    panels.forEach((panel, index) => {
        const panelNumber = index + 1;
        
        // Create ScrollTrigger for each panel
        ScrollTrigger.create({
            trigger: panel,
            start: "top 80%", // Trigger when panel top reaches 80% down viewport
            end: "bottom 20%", // End when panel bottom reaches 20% up viewport
            onEnter: () => {
                // Update indicators
                updateIndicators(panelNumber);
                
                // Trigger map update for this panel
                if (window.updateMapForPanel) {
                    window.updateMapForPanel(panelNumber);
                }
            },
            onEnterBack: () => {
                // Handle scrolling back up
                updateIndicators(panelNumber);
                
                // Trigger map update for this panel
                if (window.updateMapForPanel) {
                    window.updateMapForPanel(panelNumber);
                }
            }
        });
        
        // Add entrance animation for each panel
        gsap.fromTo(panel, 
            { 
                opacity: 0, 
                y: 30 
            },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8, 
                ease: "power2.out",
                scrollTrigger: {
                    trigger: panel,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Add click functionality to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            const targetPanel = panels[index];
            if (targetPanel) {
                targetPanel.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        const currentPanel = document.querySelector('.panel.active');
        const currentIndex = Array.from(panels).indexOf(currentPanel);
        
        if (e.key === 'ArrowDown' && currentIndex < panels.length - 1) {
            panels[currentIndex + 1].scrollIntoView({ behavior: 'smooth' });
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            panels[currentIndex - 1].scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    console.log('ScrollTrigger initialized with', panels.length, 'panels');
});
