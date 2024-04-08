import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import aboutbg1 from "../../assets/images/about/01.png";
import aboutbg2 from "../../assets/images/about/02.png";
import aboutbg3 from "../../assets/images/about/03.png";
import eth from "../../assets/images/about/eth.png";
import solana from "../../assets/images/about/solana.png";
import binance from "../../assets/images/about/binance.png";
import cardano from "../../assets/images/about/cardano.png";
import tezos from "../../assets/images/about/tezos.png";
import avalanche from "../../assets/images/about/avalanche.png";
import algorand from "../../assets/images/about/algorand.png";
import polygon from "../../assets/images/about/polygon.png";
import "./about.css";

export const About = (props) => {
    const { setCurrentSlide } = props;
    const container = useRef();
    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
    const aboutContent = useRef();

    useEffect(() => {
        if (window.innerWidth > 576 && window.innerHeight > 576) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: aboutContent.current,
                    start: ".about bottom",
                    end: ".mla top",
                    scroller: ".scroller",
                    onEnter: function ({ progress, direction, isActive }) {
                        setCurrentSlide(1);
                        tl.to(container.current, {
                            y: 0,
                            opacity: 1,
                            duration: 0
                        })
                        tl.from(document.querySelectorAll('.meta-box img'), {
                            duration: 1.5,
                            opacity: 0,
                            filter: 'blur(5px)',
                            y: -250,
                            x: 50,
                            stagger: 0.4,
                            delay: 1
                        }, "-=0.5")

                        tl.from(document.querySelectorAll('.about-banner'), {
                            duration: 1.5,
                            y: 120,
                            skewY: 7,
                            delay: -1.3,
                            opacity: 0,
                            ease: 'power4.out',
                            stagger: {
                                amount: 0.1
                            }
                        })
                            .from('.small-banner, .about-text, .about-text-box', {
                                duration: 2.5,
                                opacity: 0,
                                y: '140%',
                                ease: 'expo.out',
                                delay: -1,
                                stagger: {
                                    amount: 0.5
                                },
                                overwrite: true
                            })
                            .from(document.querySelectorAll('.coin-group .coin'), {
                                yPercent: 100,
                                opacity: 0,
                                scale: 1.2,
                                duration: 1.5,
                                delay: -2.5,
                                stagger: 0.1,
                                overwrite: true
                            })
                    },
                    onEnterBack: ({ progress, direction, isActive }) => {
                        setCurrentSlide(1);
                        tl.to(container.current, {
                            y: 0,
                            opacity: 1,
                            duration: 1,
                            delay: 0,
                        })
                    },
                    onLeaveBack: () => {
                        gsap.to(container.current, { opacity: 0, duration: 1 });
                    }
                }
            });
        }
    }, [])

    return (
        <div className="section about" id="about">
            <div className="responsive-padding" ref={container}>
                <div className="container">
                    <div className="row about-content">
                        <div className="col-xxl-6 col-lg-7" ref={aboutContent}>
                            <div className="about-content-box">
                                <div className="overflow-hidden">
                                    <h1 className="about-banner">THREE CORE SOLUTIONS,</h1>
                                    <h1 className="about-banner"><span style={{ color: "#2a9ce2" }}>LIMITLESS GROWTH.</span></h1>
                                </div>
                                <h2 className="small-banner">UNLOCK THE POWER OF WEB3</h2>
                                <p className="about-details about-text">
                                    We give businesses the strategic direction, implementation and single-point solution they need to launch their NFT, metaverse, or web 3 strategy.
                                </p>
                                <p className="about-details about-text">
                                    As the first agency to offer everything from ideation, smart contract creation to marketing and sell through, we have over a decade-long track record building projects on multiple blockchain networks. We’ll help you lay the groundwork for scalability, longevity, and ROI with our three core capabilities.
                                </p>
                                <div className="row about-text-box">
                                    <div className="col-6">
                                        <h3 className="number-banner">50</h3>
                                        <p className="about-details">
                                            years combined blockchain expertise
                                        </p>
                                    </div>

                                    <div className="col-6">
                                        <h3 className="number-banner">10</h3>
                                        <p className="about-details">
                                            years of experience building projects on multiple blockchain networks
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-6 col-lg-5 meta-box">
                            <img src={aboutbg1} alt="back" />
                            <img src={aboutbg2} alt="back" />
                            <img src={aboutbg3} alt="back" />
                        </div>
                    </div>
                    <div className="coin-group">
                        <div className="coin">
                            <img src={eth} alt="eth" />
                        </div>
                        <div className="coin">
                            <img src={solana} alt="solana" />
                        </div>
                        <div className="coin">
                            <img src={binance} alt="binance" />
                        </div>
                        <div className="coin">
                            <img src={cardano} alt="cardano" />
                        </div>
                        <div className="coin">
                            <img src={tezos} alt="tezos" />
                        </div>
                        <div className="coin">
                            <img src={avalanche} alt="eth" />
                        </div>
                        <div className="coin">
                            <img src={algorand} alt="eth" />
                        </div>
                        <div className="coin">
                            <img src={polygon} alt="eth" />
                        </div>
                        <div className="coin">
                            <h4>& MORE</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}