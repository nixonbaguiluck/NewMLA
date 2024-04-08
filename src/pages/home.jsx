import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { AnimatePresence } from "framer-motion";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Header } from "../components/header";
import Loader from "../components/Loader";
import { Main } from "../components/main";
import { About } from "../components/about";
import { MLA } from "../components/mla";
import { Community } from "../components/community";
import { AUCM } from "../components/aucm";
import { Ceo } from "../components/ceo";
import { Connect } from "../components/connect";
import { Contact } from "../components/contact";
import { Navigations } from '../components/Navigation';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
const keyCodes = {
    UP: 38,
    DOWN: 40
}

const Home = () => {
    const [Loaded, setLoaded] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [pageHeight, setPageHeight] = useState(window.innerHeight);
    const [innerWidth, setInnerWidth] = useState();
    const [touchPos, setTouchPos] = useState(0);

    const container = useRef();

    const currentSlideRef = useRef(currentSlide);
    currentSlideRef.current = currentSlide;

    const isAnimatingRef = useRef(isAnimating);
    isAnimatingRef.current = isAnimating;

    const pageHeightRef = useRef(pageHeight);
    pageHeightRef.current = pageHeight;

    const innerWidthRef = useRef(innerWidth);
    innerWidthRef.current = innerWidth;

    const touchPosRef = useRef(touchPos);
    touchPosRef.current = touchPos;

    useEffect(() => {
        setInnerWidth(window.innerWidth);
        if (window.innerWidth < 576 || window.innerHeight < 576) {
            gsap.set(container.current, { overflowY: 'scroll' });
        }
        const onPageLoad = () => {
            setLoaded(true);
        };

        if (document.readyState === 'complete') {
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad, false);
            return () => window.removeEventListener('load', onPageLoad);
        }
    }, []);

    const slides = document.getElementsByClassName("section");

    useEffect(() => {
        goToSlide(0);
        window.addEventListener("resize", onResize);
        window.addEventListener("mousewheel", onMouseWheel);
        window.addEventListener("DOMMouseScroll", onMouseWheel);
        window.addEventListener("wheel", onMouseWheel);
        window.addEventListener("touchmove", onTouchMove);
        window.addEventListener("touchstart", onTouchStart);
        document.addEventListener("keydown", onKeyDown);

        return () => {
            window.removeEventListener("resize", onResize);
            document.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("mousewheel", onMouseWheel);
            window.removeEventListener("DOMMouseScroll", onMouseWheel);
            window.removeEventListener("wheel", onMouseWheel);
            window.removeEventListener("touchmove", onMouseWheel);
            window.addEventListener("touchstart", onTouchStart);
        }
    }, [])

    /*
    *   Internal functions
    * */

    /*
    *   Getting the pressed key. Only if it's up or down arrow, we go to prev or next slide and prevent default behaviour
    *   This way, if there's text input, the user is still able to fill it
    * */
    function onKeyDown(event) {
        const PRESSED_KEY = event.keyCode;

        if (PRESSED_KEY === keyCodes.UP) {
            goToPrevSlide();
            // event.preventDefault();
        }
        else if (PRESSED_KEY === keyCodes.DOWN) {
            // event.preventDefault();
            goToNextSlide();
        }

    }

    function onTouchStart(event) {
        setTouchPos(event.changedTouches[0].clientY);
    }

    function onTouchMove(event) {
        let newTouchPos = event.changedTouches[0].clientY;
        if (newTouchPos > touchPosRef.current) {
            mobileSlide(0);
        }
        if (newTouchPos < touchPosRef.current) {
            mobileSlide(1);
        }
    }
    /*
    *   When user scrolls with the mouse, we have to change slides
    * */
    function onMouseWheel(event) {
        var delta = event.wheelDelta / 30 || -event.detail;
        if (innerWidthRef.current > 576 && window.innerHeight > 576) {
            //Normalize event wheel delta

            //If the user scrolled up, it goes to previous slide, otherwise - to next slide
            if (delta < -1) {
                goToNextSlide();
            }
            else if (delta > 1) {
                goToPrevSlide();
            }
        } else if (innerWidthRef.current <= 576 || window.innerHeight <= 576) {
            if (delta < -1) {
                mobileSlide(1);
            }
            else if (delta > 1) {
                mobileSlide(0);
            }
        }
    }

    /*
    *   If there's a previous slide, slide to it
    * */
    function goToPrevSlide() {
        if (currentSlideRef.current - 1 >= 0) {
            goToSlide(currentSlideRef.current - 1);
        }
    }

    /*
    *   If there's a next slide, slide to it
    * */
    const goToNextSlide = () => {
        if (currentSlideRef.current + 1 < 8) {
            goToSlide(currentSlideRef.current + 1);
        }
    };

    /*
    *   Actual transition between slides
    * */
    const goToSlide = (target) => {
        //If the slides are not changing and there's such a slide
        const beforeSlide = currentSlideRef.current;
        if (!isAnimatingRef.current && target >= 0) {
            //setting animating flag to true
            setIsAnimating(true);
            setCurrentSlide(target);

            if (innerWidthRef.current > 576 && window.innerHeight > 576) {
                //Sliding to current slide
                let tl = gsap.timeline();
                if (beforeSlide < target) {
                    if (beforeSlide === 2 || beforeSlide === 5) {
                        tl.to(slides[beforeSlide].querySelector("div"), {
                            duration: 1
                        })
                    } else if (beforeSlide === 3) {
                        tl.to(slides[beforeSlide].querySelector("div").querySelector("div"), {
                            y: -200,
                            opacity: 0,
                            duration: 0.8
                        })
                        tl.to(document.querySelectorAll(".effect-element"), {
                            y: -200,
                            opacity: 1,
                            duration: 1,
                            delay: -0.5
                        })
                    } else {
                        tl.to(slides[beforeSlide].querySelector("div"), {
                            y: -300,
                            opacity: 0,
                            duration: 1.3
                        })
                    }
                } else if (beforeSlide > target) {
                    if (beforeSlide === 2 || beforeSlide === 5 || beforeSlide === 7) {
                        tl.to(slides[beforeSlide].querySelector("div"), {
                            duration: 1.3
                        })
                        tl.to(".slide-first, .slide-second, .slide-third", { opacity: 0, duration: 0.5 })
                    } else if (beforeSlide === 3) {
                        tl.to(slides[beforeSlide].querySelector("div").querySelector("div"), {
                            y: 300,
                            opacity: 0,
                            duration: 1.3
                        })
                    } else if (beforeSlide === 6) {
                        tl.to(slides[beforeSlide].querySelector("div"), {
                            y: 300,
                            opacity: 0,
                            duration: 1.3
                        })
                    } else {
                        tl.to(slides[beforeSlide].querySelector("div"), {
                            y: 300,
                            opacity: 0,
                            duration: 1.3
                        })
                    }
                }
                tl.to(container.current, 1.3,
                    {
                        scrollTo: { y: (pageHeightRef.current * target), autoKill: false },
                        onUpdate: checkProgress,
                        ease: 'Power1.easeInOut',
                        delay: -1,
                        overwrite: true,
                        onComplete: onSlideChangeEnd
                    });
            } else {
                const targetID = "#" + slides[target].id;

                gsap.to('.scroller', {
                    duration: 1.3,
                    scrollTo: targetID,
                    ease: 'Power1.easeInOut',
                    onComplete: onSlideChangeEnd
                })
            }

        }
    }

    const mobileSlide = (direction) => {
        if (!isAnimatingRef.current && direction === 1) {
            if (currentSlideRef.current < 7) {
                if (slides[currentSlideRef.current].offsetHeight <= window.innerHeight) {
                    setIsAnimating(true);
                    const targetID = "#" + slides[currentSlideRef.current + 1].id;
                    setCurrentSlide(currentSlideRef.current + 1);
                    gsap.to('.scroller', {
                        duration: 1.3,
                        scrollTo: targetID,
                        ease: 'Power1.easeInOut',
                        onComplete: onSlideChangeEnd
                    })
                } else {
                    let scrollTop = slides[currentSlideRef.current].getBoundingClientRect().top;
                    if (currentSlideRef.current === 2) {
                        document.querySelector('.slide-next').style.position = "fixed";
                        document.querySelector('.slide-prev').style.position = "fixed";
                    } else {
                        document.querySelector('.slide-next').style.position = "absolute";
                        document.querySelector('.slide-prev').style.position = "absolute";
                    }
                    if (window.innerHeight - slides[currentSlideRef.current].offsetHeight > scrollTop) {
                        document.querySelector('.slide-next').style.position = "absolute";
                        document.querySelector('.slide-prev').style.position = "absolute";
                        setIsAnimating(true);
                        const targetID = "#" + slides[currentSlideRef.current + 1].id;
                        setCurrentSlide(currentSlideRef.current + 1);
                        gsap.to('.scroller', {
                            duration: 1.3,
                            scrollTo: targetID,
                            ease: 'Power1.easeInOut',
                            onComplete: onSlideChangeEnd
                        })
                    }
                }
            }
        } else if (!isAnimatingRef.current && direction === 0) {
            if (currentSlideRef.current >= 1) {
                document.querySelector('.slide-next').style.position = "absolute";
                document.querySelector('.slide-prev').style.position = "absolute";
                if (slides[currentSlideRef.current].offsetHeight <= window.innerHeight) {
                    setIsAnimating(true);
                    const targetID = "#" + slides[currentSlideRef.current - 1].id;
                    setCurrentSlide(currentSlideRef.current - 1);
                    gsap.to('.scroller', {
                        duration: 1.3,
                        scrollTo: targetID,
                        ease: 'Power1.easeInOut',
                        onComplete: onSlideChangeEnd
                    })
                } else {
                    let scrollTop = slides[currentSlideRef.current].getBoundingClientRect().top;
                    if (scrollTop >= 0) {
                        setIsAnimating(true);
                        const targetID = "#" + slides[currentSlideRef.current - 1].id;
                        setCurrentSlide(currentSlideRef.current - 1);
                        gsap.to('.scroller', {
                            duration: 1.3,
                            scrollTo: targetID,
                            ease: 'Power1.easeInOut',
                            onComplete: onSlideChangeEnd
                        })
                    }
                }
            }
        }
    }

    function checkProgress() {
        //  gsap.config({autoKillThreshold:2});
        gsap.set(container.current, {
            scrollTo: { autoKill: false },
            overwrite: "true"
        });
    }

    /*
    *   Once the sliding is finished, we need to restore "isAnimating" flag.
    *   You can also do other things in this function, such as changing page title
    * */
    function onSlideChangeEnd() {
        setIsAnimating(false);
    }

    /*
    *   When user resize it's browser we need to know the new height, so we can properly align the current slide
    * */
    function onResize(event) {

        //This will give us the new height of the window
        const newPageHeight = window.innerHeight;

        /*
        *   If the new height is different from the old height ( the browser is resized vertically ), the slides are resized
        * */
        if (pageHeightRef.current !== newPageHeight) {
            setPageHeight(newPageHeight);

            //This can be done via CSS only, but fails into some old browsers, so I prefer to set height via JS
            // gsap.set([container.current, slides], { height: newPageHeight + "px" });

            //The current slide should be always on the top
            gsap.set(container.current, { scrollTo: { y: newPageHeight * currentSlideRef.current } });
        }
    }

    return (
        <div>
            <AnimatePresence>{Loaded ? null : <Loader />}</AnimatePresence>
            <Header goToSlide={goToSlide} />
            <Navigations goToSlide={goToSlide} currentSlide={currentSlide} />
            <div className='scroller' ref={container} >
                <Main goToSlide={goToSlide} setCurrentSlide={setCurrentSlide} />
                <About setCurrentSlide={setCurrentSlide} />
                <MLA setCurrentSlide={setCurrentSlide} />
                <Community setCurrentSlide={setCurrentSlide} />
                <AUCM setCurrentSlide={setCurrentSlide} />
                <Ceo setCurrentSlide={setCurrentSlide} />
                <Connect setCurrentSlide={setCurrentSlide} />
                <Contact setCurrentSlide={setCurrentSlide} />
            </div>
        </div>
    )
}

export default Home;