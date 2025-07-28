// ===============================
// Animations
// ===============================
const AnimationsGsap = {
    initGsapTextReveal() {
        const splitTypes = document.querySelectorAll(".gsap-reveal-text");
        splitTypes.forEach((char) => {
            const text = new SplitType(char, {
                types: "chars"
            });
            gsap.from(text.chars, {
                scrollTrigger: {
                    trigger: char,
                    start: "top 34%",
                    end: "top -10%",
                    scrub: true,
                    pin: ".about",
                    pinSpacing: true,
                },
                opacity: 0.1,
                stagger: 5,

                ease: "back.out",
            });
        });
    },

    initGsapSectionTitles() {
        const titles = document.querySelectorAll(".gsap-text-appear");
        titles.forEach((title) => {
            const titleText = new SplitType(title, {
                types: "lines"
            });
            titleText.lines.forEach((lines) => {
                const lineText = new SplitType(lines, {
                    types: "words"
                });
                gsap.from(lineText.words, {
                    scrollTrigger: {
                        trigger: title,
                        start: "top 90%",
                        end: "top 30%",
                        scrub: false,
                    },
                    y: 120,
                    rotation: 21,
                    stagger: 0.02,
                    duration: 0.7,
                    ease: "power2.out",
                });
            });
        });
    },

    initGsapSectionTitles2() {
        const titles = document.querySelectorAll(".gsap-text-appear-2");
        titles.forEach((title) => {
            const titleText = new SplitType(title, {
                types: "lines"
            });
            titleText.lines.forEach((lines) => {
                const lineText = new SplitType(lines, {
                    types: "words"
                });
                gsap.from(lineText.words, {
                    scrollTrigger: {
                        trigger: title,
                        start: "top 90%",
                        end: "top 30%",
                        scrub: false,
                    },
                    y: 120,
                    rotation: 21,
                    stagger: 0.02,
                    duration: 0.7,
                    ease: "power2.out",
                });
            });
        });
    },


    initGsapRevealElements() {
        const elements = document.querySelectorAll(".gsap-reveal-me");
        elements.forEach((elem) => {
            gsap.fromTo(elem, 
                // FROM (initial state)
                {
                    opacity: 0,
                    y: 95,
                    rotation: 2,
                    filter: "blur(10px)"
                },
                // TO (final state)
                {
                    opacity: 1,
                    y: 0,
                    rotation: 0,
                    filter: "none",
                    duration: 0.9,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 90%",
                        end: "top 50%",
                        scrub: false
                    }
                }
            );
        });
    }

    /*
    initGsapRevealElements() {
        const elements = document.querySelectorAll(".gsap-reveal-me");
        elements.forEach((elem) => {
            
            // gsap.set(elem, { 
            //     opacity: 1, 
            //     y: 0, 
            //     rotation: 0, 
            //     filter: "none" 
            // });

            // gsap.set(elem, { y: 0, rotation: 0 }); 

            gsap.from(elem, {
                scrollTrigger: {
                    trigger: elem,
                    start: "top 90%",
                    end: "top 50%",
                    scrub: false,
                },
                opacity: 0,
                y: 95,
                rotation: 2,
                filter: "blur(10px)",
                duration: 0.9,
                stagger: 0.1,
                ease: "power2.out",
            });
        });
    },
    */
};

// ===============================
// Initialization
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    // Initialize animations
    AnimationsGsap.initGsapSectionTitles();
    AnimationsGsap.initGsapSectionTitles2();
    AnimationsGsap.initGsapRevealElements();
    AnimationsGsap.initGsapTextReveal();
});