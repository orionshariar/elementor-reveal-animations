(function ($, elementor) {
    "use strict";

    var GsapAnimation = {

        init: function () {
            elementor.hooks.addAction('frontend/element_ready/container', GsapAnimation.initGsapTextReveal);
            elementor.hooks.addAction('frontend/element_ready/container', GsapAnimation.initGsapSectionTitles);
            elementor.hooks.addAction('frontend/element_ready/container', GsapAnimation.initGsapSectionTitles2);
            elementor.hooks.addAction('frontend/element_ready/container', GsapAnimation.initGsapRevealElements);
        },

        initGsapTextReveal: function($scope) {
            const textElements = $scope.find(".gsap-reveal-text");
            
            textElements.each(function() {
                const element = $(this);
                let animationDuration = 0.7;
                let animationDelay = 0;
                let staggerAmount = 5;
                let opacityStart = 0.1;
                
                const elementSettings = element.data("settings");
                if (typeof elementSettings !== 'undefined' && elementSettings.gsap_animation_enable == "yes") {
                    animationDuration = elementSettings.gsap_animation_duration;
                    animationDelay = elementSettings.gsap_animation_delay;
                    staggerAmount = elementSettings.gsap_animation_stagger;
                    opacityStart = elementSettings.gsap_animation_opacity;
                }

                const text = new SplitType(element[0], {
                    types: "chars"
                });

                gsap.from(text.chars, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 34%",
                        end: "top -10%",
                        scrub: true,
                        pin: ".about",
                        pinSpacing: true,
                    },
                    opacity: opacityStart,
                    y: 50,
                    stagger: staggerAmount,
                    duration: animationDuration,
                    delay: animationDelay,
                    ease: "back.out",
                });
            });
        },        

        initGsapSectionTitles: function($scope) {
            // Onle for text-appear animation we have set the trigger event to "elementor-widget-container"
            const titles = $scope.find(".gsap-text-appear .elementor-widget-container");
            
            titles.each(function() {
                const title = $(this);
                let animationDuration = 0.7;
                let animationDelay = 0;
                let staggerAmount = 0.02;
                
                const titleSettings = title.parent().data("settings"); // As we have set the parent to "elementor-widget-container" and data-seetings appending in parent div
                if (typeof titleSettings !== 'undefined' && titleSettings.gsap_animation_enable == "yes") {
                    animationDuration = titleSettings.gsap_animation_duration;
                    animationDelay = titleSettings.gsap_animation_delay;
                    staggerAmount = titleSettings.gsap_animation_stagger;
                }

                const titleText = new SplitType(title[0], {
                    types: "lines"
                });
                
                titleText.lines.forEach((lines) => {
                    const lineText = new SplitType(lines, {
                        types: "words"
                    });
                    
                    gsap.from(lineText.words, {
                        y: 120,
                        rotation: 21,
                        opacity: 0,
                        stagger: staggerAmount,
                        duration: animationDuration,
                        delay: animationDelay,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: title,
                            start: "top 90%",
                            end: "top 30%",
                            scrub: false
                        }
                    });
                });
            });
        },

        initGsapSectionTitles2: function($scope) {
            const titles = $scope.find(".gsap-text-appear-2");
            
            titles.each(function() {
                const title = $(this);
                let animationDuration = 0.7;
                let animationDelay = 0;
                let staggerAmount = 0.02;
                
                const titleSettings = title.data("settings");
                if (typeof titleSettings !== 'undefined' && titleSettings.gsap_animation_enable == "yes") {
                    animationDuration = titleSettings.gsap_animation_duration;
                    animationDelay = titleSettings.gsap_animation_delay;
                    staggerAmount = titleSettings.gsap_animation_stagger;
                }

                const titleText = new SplitType(title[0], {
                    types: "lines"
                });
                
                titleText.lines.forEach((lines) => {
                    const lineText = new SplitType(lines, {
                        types: "words"
                    });
                    
                    gsap.from(lineText.words, {
                        y: 120,
                        rotation: 21,
                        opacity: 0,
                        stagger: staggerAmount,
                        duration: animationDuration,
                        delay: animationDelay,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: title,
                            start: "top 90%",
                            end: "top 30%",
                            scrub: false
                        }
                    });
                });
            });
        },        

        initGsapRevealElements: function($scope) {
            const wrappers = $scope.find(".gsap-reveal-me");
            
            wrappers.each(function() {
                const wrapper = $(this);
                let animationDuration = 0.9;
                let animationDelay = 0;
                
                const wrapperSettings = wrapper.data("settings");
                if (typeof wrapperSettings !== 'undefined' && wrapperSettings.gsap_animation_enable == "yes") {
                    animationDuration = wrapperSettings.gsap_animation_duration;
                    animationDelay = wrapperSettings.gsap_animation_delay;
                }

                gsap.fromTo(wrapper, 
                    {
                        opacity: 0,
                        y: 95,
                        rotation: 2,
                        filter: "blur(10px)"
                    },
                    {
                        opacity: 1,
                        y: 0,
                        rotation: 0,
                        filter: "none",
                        duration: animationDuration,
                        delay: animationDelay,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: wrapper,
                            start: "top 90%",
                            end: "top 50%",
                            scrub: false
                        }
                    }
                );
            });
        }

    };
    $(window).on('elementor/frontend/init', GsapAnimation.init);
}(jQuery, window.elementorFrontend));