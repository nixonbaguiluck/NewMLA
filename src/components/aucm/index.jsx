import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Slider from "react-slick";
import element1 from "../../assets/images/aucm/aucm-element1.png";
import element2 from "../../assets/images/aucm/aucm-element2.png";
import "./aucm.css";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    touchMove: true,
    edgeFriction: 0,
    // initialSlide: 0,
    beforeChange: (oldIndex, newIndex) => {
        switch (newIndex) {
            case 4:
                this.slider.slickPrev();
                break
            default:
        }
    },
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};
export const AUCM = (props) => {
    const { setCurrentSlide } = props;
    const container = useRef();

    const imageUrlArray = [];

    for (let i = 1; i <= 5; i++) {
        imageUrlArray.push(
            <div className={"slider-item item-" + i} key={i}>
                {i === 5 ? "" :
                    <div>
                        <img
                            className="slider-item-bg"
                            src={"../img/aucm/slider-" + i + ".png"}
                            alt="carousel"
                        ></img>
                        <div className="hidden">
                            <div className="slider-content">
                                {i === 1 &&
                                    <>
                                        <h2>01</h2>
                                        <h1>avatar</h1>
                                        <p>Strategic guidance and conceptualization surrounding your artwork for on-brand collections.</p>
                                    </>
                                }
                                {i === 2 &&
                                    <>
                                        <h2>02</h2>
                                        <h1>utility</h1>
                                        <p>Guiding you to select the optimal utility for your NFTs, deciding on incentivizing perks and benefits that generate demand.</p>
                                    </>
                                }
                                {i === 3 &&
                                    <>
                                        <h2>03</h2>
                                        <h1>community</h1>
                                        <p>We’ll help you leverage growth hacking on NFT Launchpads, Discord servers, influencer circles, and more.</p>
                                    </>
                                }
                                {i === 4 &&
                                    <>
                                        <h2>04</h2>
                                        <h1>mint strategy </h1>
                                        <p>Determining the ideal minting platform, launching high-exposure marketing strategies, and recommending mint allocations that support existing NFT holders.</p>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }

    useEffect(() => {
        if (window.innerWidth > 576 && window.innerHeight > 576) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: ".aucm bottom",
                    end: ".ceo top",
                    scroller: ".scroller",
                    onEnter: function ({ progress, direction, isActive }) {
                        setCurrentSlide(4);
                        tl.to(container.current, {
                            y: 0,
                            opacity: 1,
                            duration: 0,
                            delay: 0
                        })
                        tl.from(".aucm-element1", {
                            duration: 3,
                            yPercent: 140,
                            delay: 0.5,
                            opacity: 0,
                            ease: 'expo.out',
                        })
                        tl.from(".aucm-title h2, .aucm-title h5", {
                            duration: 2,
                            y: 120,
                            skewY: 7,
                            delay: -3,
                            opacity: 0,
                            ease: 'power4.out',
                            stagger: {
                                amount: 0.3
                            }
                        })
                            .from('.aucm-text p', {
                                duration: 3,
                                opacity: 0,
                                y: '140%',
                                ease: 'expo.out',
                                delay: -2,
                                stagger: {
                                    amount: 0.5
                                },
                            })
                            .from('.slider-item', {
                                duration: 3,
                                opacity: 0,
                                y: '120%',
                                ease: 'expo.out',
                                delay: -3.8,
                                stagger: {
                                    amount: 1
                                },
                            })
                    },
                    onEnterBack: ({ progress, direction, isActive }) => {
                        setCurrentSlide(4);
                        tl.to(container.current, {
                            y: 0,
                            opacity: 1,
                            duration: 1,
                            delay: 0
                        })
                    }
                }
            });
        }
    }, [])

    return (
        <div className="section aucm" id='aucm'>
            <div className="container position-relative" ref={container} style={{ zIndex: 999 }}>
                <div className="aucm-content">
                    <div className="aucm-title">
                        <div className='overflow-hidden'>
                            <h5>OUR 4 PHASE APPROACH</h5>
                        </div>
                        <div className='overflow-hidden'>
                            <h2>a.u.c.m</h2>
                        </div>
                    </div>
                    <div className="aucm-text">
                        <p className="mb-4">Our A.U.C.M. approach is our blueprint to NFT development, taking every aspect of your project into consideration for a successful launch.</p>
                        <p>The result is a tailor-made NFT project that’s built to scale.</p>
                    </div>
                </div>

                <div className="aucm-slider">
                    <Slider {...settings}>{imageUrlArray}</Slider>
                </div>
            </div>
            <div className="aucm-element1">
                <img src={element1} alt="aucm element" />
            </div>
            <div className="aucm-element2">
                <img src={element2} alt="aucm element" />
            </div>
        </div>
    )
} 