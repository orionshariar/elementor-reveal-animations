/**
 * Elementor Reveal Animations - Frontend Handler
 * With comprehensive error handling and fallbacks
 */

(function($) {
    "use strict";
    
    // Debugging initialization
    console.log("[Reveal Animations] Script loaded");
    
    // Main initialization function
    function initializeRevealAnimations() {
        // Verify all required components are available
        if (typeof elementorFrontend === 'undefined') {
            console.error("[Reveal Animations] elementorFrontend is not defined");
            return false;
        }
        
        if (typeof elementorFrontend.hooks === 'undefined') {
            console.error("[Reveal Animations] elementorFrontend.hooks is not defined");
            return false;
        }
        
        if (typeof gsap === 'undefined') {
            console.error("[Reveal Animations] GSAP is not loaded");
            return false;
        }
        
        if (typeof ScrollTrigger === 'undefined') {
            console.error("[Reveal Animations] ScrollTrigger is not loaded");
            return false;
        }
        
        console.log("[Reveal Animations] All dependencies verified");
        
        // Register ScrollTrigger plugin
        try {
            gsap.registerPlugin(ScrollTrigger);
            console.log("[Reveal Animations] ScrollTrigger registered successfully");
        } catch (e) {
            console.error("[Reveal Animations] Failed to register ScrollTrigger:", e);
            return false;
        }
        
        // Define the animation handler
        const RevealAnimationHandler = elementorModules.frontend.handlers.Base.extend({
            onInit: function() {
                console.log("[Reveal Animations] Handler initialized for element:", this.$element);
                elementorModules.frontend.handlers.Base.prototype.onInit.apply(this, arguments);
                this.initRevealAnimation();
            },
            
            initRevealAnimation: function() {
                const element = this.$element[0];
                const settings = this.getElementSettings();
                
                if ('yes' !== settings.reveal_animation_enable) {
                    console.log("[Reveal Animations] Animation not enabled for this element");
                    return;
                }
                
                this.setupAnimation(element, settings);
            },
            
            setupAnimation: function(element, settings) {
                // Set initial state
                const initialState = { opacity: 0 };
                const animationVars = {
                    opacity: 1,
                    duration: parseFloat(settings.reveal_animation_duration) || 1,
                    delay: parseFloat(settings.reveal_animation_delay) || 0,
                    ease: "power2.out",
                    overwrite: "auto"
                };
                
                // Configure based on animation type
                switch(settings.reveal_animation_type) {
                    case 'slide-up':
                        initialState.y = '50px';
                        animationVars.y = '0px';
                        break;
                    case 'slide-down':
                        initialState.y = '-50px';
                        animationVars.y = '0px';
                        break;
                    case 'slide-left':
                        initialState.x = '50px';
                        animationVars.x = '0px';
                        break;
                    case 'slide-right':
                        initialState.x = '-50px';
                        animationVars.x = '0px';
                        break;
                    case 'zoom-in':
                        initialState.scale = 0.9;
                        animationVars.scale = 1;
                        break;
                    case 'zoom-out':
                        initialState.scale = 1.1;
                        animationVars.scale = 1;
                        break;
                }
                
                // Apply initial state
                gsap.set(element, initialState);
                
                // Create ScrollTrigger animation
                ScrollTrigger.create({
                    trigger: element,
                    start: "top 80%",
                    onEnter: () => gsap.to(element, animationVars),
                    once: true,
                    markers: true
                });
                
                console.log("[Reveal Animations] Animation setup complete for element:", element);
            }
        });
        
        // Register the handler with error protection
        try {
            elementorFrontend.hooks.addAction(
                'frontend/element_ready/container.default', 
                function(scope) {
                    new RevealAnimationHandler({ $element: $(scope) });
                }
            );
            console.log("[Reveal Animations] Handler registered successfully");
            return true;
        } catch (e) {
            console.error("[Reveal Animations] Failed to register handler:", e);
            return false;
        }
    }
    
    // Attempt initialization when Elementor is ready
    function setupElementorIntegration() {
        if (window.elementorFrontend && window.elementorFrontend.hooks) {
            console.log("[Reveal Animations] Elementor already loaded, initializing directly");
            initializeRevealAnimations();
        } else {
            console.log("[Reveal Animations] Waiting for Elementor to initialize");
            $(window).on('elementor/frontend/init', function() {
                console.log("[Reveal Animations] Elementor frontend init received");
                initializeRevealAnimations();
            });
        }
    }
    
    // Start the integration when jQuery is ready
    $(function() {
        console.log("[Reveal Animations] DOM ready, starting setup");
        setupElementorIntegration();
        
        // Fallback check in case Elementor doesn't fire the event
        setTimeout(function() {
            if (!window.revealAnimationsInitialized) {
                console.log("[Reveal Animations] Fallback initialization check");
                setupElementorIntegration();
            }
        }, 3000);
    });
    
})(jQuery || window.jQuery);