import { useEffect, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Vanguard from "../../assets/images/main/VANGUARD.png";
import IBT from "../../assets/images/main/IBT.png";
import LaWeekly from "../../assets/images/main/LA-WEEKLY.png";
import DigitalJournal from "../../assets/images/main/DIGITAL-JOURNAL.png";
import animationImg from "../../assets/images/main/MLA_ANIMATEDCUBE_GIF2.gif";
import "./main.css";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export const Main = (props) => {
    const { goToSlide, setCurrentSlide } = props;
    const mainSquare = useRef();
    const container = useRef();

    useEffect(() => {
        const effect_items = container.current.querySelectorAll('.contact-us');
        const hover = [];
        effect_items.forEach((item, index) => {
            hover[index] = gsap.to(item, {
                backgroundPosition: "100% 0",
                boxShadow: "0px 0px 20px #29a9e9",
                duration: 0.5,
                paused: true
            })
        })
        effect_items.forEach((item, index) => {
            item.addEventListener("mouseenter", () => hover[index].play());
        })
        effect_items.forEach((item, index) => {
            item.addEventListener("mouseleave", () => hover[index].reverse());
        })
    }, [])

    useEffect(() => {
        if (window.innerWidth > 576 && window.innerHeight > 576) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: mainSquare.current,
                    start: ".main bottom",
                    end: ".about top",
                    scroller: ".scroller",
                    onEnter: function ({ progress, direction, isActive }) {
                        setCurrentSlide(0);
                        tl.from('.main-img', 2, {
                            opacity: 0,
                            scale: 0,
                            delay: 2,
                        })

                        tl.from('.main-banner', 1.5, {
                            y: 120,
                            ease: 'power4.out',
                            delay: -1.5,
                            skewY: 7,
                            stagger: {
                                amount: 0.5
                            },
                        })
                            .from('.banner-description, .main-content .contact-us, .press-logos', 2.5, {
                                opacity: 0,
                                y: '140%',
                                ease: 'expo.out',
                                delay: -1.2,
                                stagger: {
                                    amount: 1
                                },
                            })
                    },
                    onEnterBack: ({ progress, direction, isActive }) => {
                        setCurrentSlide(0);
                        tl.to(container.current, {
                            y: 0,
                            opacity: 1,
                            duration: 0,
                            delay: -1
                        })
                        tl.from('.main-img', 2, {
                            opacity: 0,
                            scale: 0,
                            delay: 0,
                        })

                        tl.from('.main-banner', 1.5, {
                            y: 120,
                            ease: 'power4.out',
                            delay: -1.5,
                            skewY: 7,
                            stagger: {
                                amount: 0.5
                            },
                        })
                            .from('.banner-description, .main-content .contact-us, .press-logos', 2.5, {
                                opacity: 0,
                                y: '140%',
                                ease: 'expo.out',
                                delay: -1.2,
                                stagger: {
                                    amount: 1
                                },
                                overwrite: true
                            })
                    }
                }
            });
        }
    }, [])

    return (
        <div className="section main" id='main'>
            <div className="container d-flex h-100" ref={container}>
                <div className={"main-square "} ref={mainSquare}>
                    <div className="main-content">
                        <div className='line'>
                            <h1 className="main-banner">YOUR END-TO-END</h1>
                        </div>
                        <div className='line'>
                            <h1 className="main-banner" style={{ color: "#2a9ce2" }}>WEB3 TRANSITION</h1>
                        </div>
                        <div className='line'>
                            <h1 className="main-banner">STARTS HERE</h1>
                        </div>
                        <p className="banner-description">Tomorrow’s industry-leading businesses are transitioning from Web2 to Web3.<br /> We’ll help you design, develop, and deploy your NFT, metaverse, and Web 3 strategies.</p>
                        <button className="contact-us" data-name="CONTACT" onClick={() => goToSlide(7)}>LET'S CONNECT</button>
                        <div className="press-logos">
                            <div className="d-flex align-items-center">
                                <img src={Vanguard} alt="press-logo" />
                                <img src={IBT} alt="press-logo" />
                            </div>
                            <div className="d-flex align-items-center">
                                <img src={LaWeekly} alt="press-logo" />
                                <img src={DigitalJournal} alt="press-logo" />
                            </div>
                        </div>
                    </div>
                    <div className="main-img">
                        <img src={animationImg} alt="main ban" />
                    </div>
                </div>
            </div>
        </div>
    );
};