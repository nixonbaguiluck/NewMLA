import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import NFT from "../../assets/images/mla/meta/NFT.png";
import Blockchain from "../../assets/images/mla/meta/Blockchain.png";
import dApp from "../../assets/images/mla/meta/dApp.png";
import Metaverse from "../../assets/images/mla/meta/Metaverse.png";
import ICO from "../../assets/images/mla/meta/ICO.png";
import SCAudit from "../../assets/images/mla/meta/SCAudit.png";
import FSDev from "../../assets/images/mla/labs/FSDev.png";
import Ecommerce from "../../assets/images/mla/labs/Ecommerce.png";
import Branding from "../../assets/images/mla/labs/Branding.png";
import Avatar from "../../assets/images/mla/labs/Avatar.png";
import UIUX from "../../assets/images/mla/labs/UIUX.png";
import AppDev from "../../assets/images/mla/labs/AppDev.png";
import Launchpad from "../../assets/images/mla/agency/Launchpad.png";
import FinTech from "../../assets/images/mla/agency/FinTech.png";
import Influencer from "../../assets/images/mla/agency/Influencer.png";
import Billboard from "../../assets/images/mla/agency/Billboard.png";
import Hacking from "../../assets/images/mla/agency/Hacking.png";
import Press from "../../assets/images/mla/agency/Press.png";
import PageVerif from "../../assets/images/mla/agency/PageVerif.png";
import Triangle from "../../assets/images/mla/Triangle.png";
import Cube from "../../assets/images/mla/Cube.png";
import "./mla.css";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export const MLA = (props) => {
    const { setCurrentSlide } = props;
    const mla_container = useRef();
    const [slides, setSlides] = useState(['slide-first', 'slide-second', 'slide-third']);

    const handleSlidePrev = () => {
        const newSlides = [slides[1], slides[2], slides[0]];
        setSlides(newSlides);
    }
    const handleSlideNext = () => {
        const newSlides = [slides[2], slides[0], slides[1]];
        setSlides(newSlides);
    }

    useEffect(() => {
        if (window.innerWidth > 576 && window.innerHeight > 576) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: mla_container.current,
                    start: ".mla bottom",
                    end: ".mla top",
                    scroller: ".scroller",
                    onEnter: function ({ progress, direction, isActive }) {
                        setCurrentSlide(2);
                        tl.fromTo(".slide-first, .slide-second, .slide-third", {
                            opacity: 0,
                            yPercent: 50,
                            filter: "blur(10px)",
                        }, {
                            opacity: 1,
                            yPercent: 0,
                            filter: "blur(0px)",
                            duration: 1,
                            stagger: 0.1,
                            overwrite: true
                        })
                            .from('.mla-triangle', {
                                duration: 3,
                                opacity: 0,
                                y: '140%',
                                ease: 'expo.out',
                                delay: -1.2,
                                stagger: {
                                    amount: 0.5
                                },
                                overwrite: true
                            })
                            .from('.content-show p', {
                                duration: 3,
                                opacity: 0,
                                y: '140%',
                                ease: 'expo.out',
                                delay: -2.5,
                                stagger: {
                                    amount: 0.5
                                },
                                overwrite: true
                            })
                            .from('.content-show .content-icon', {
                                duration: 2,
                                opacity: 0,
                                x: '-100px',
                                delay: -3.2,
                                stagger: {
                                    amount: 0.8
                                },
                                overwrite: true
                            })
                    },
                    onEnterBack: ({ progress, direction, isActive }) => {
                        setCurrentSlide(2);
                        tl.to("#meta", {
                            y: 0,
                            opacity: 1,
                            duration: 1,
                            delay: 0,
                            overwrite: true
                        })
                        tl.to(".slide-first, .slide-second, .slide-third", {
                            opacity: 1,
                            duration: 1,
                            delay: -0.5,
                            overwrite: true
                        })
                    },
                    onLeaveBack: () => {
                        gsap.to(".slide-first, .slide-second, .slide-third", { opacity: 0, duration: 1 });
                    }
                }
            });
        }
    }, [])

    return (
        <div className="section mla" id="mla">
            <div id="meta">
                <div className="mla-img-slider">
                    <div className={"slide-meta " + slides[0]}>
                        <h1 className="slide-banner">meta</h1>
                    </div>
                    <div className={"slide-labs " + slides[1]}>
                        <h1 className="slide-banner">labs</h1>
                    </div>
                    <div className={"slide-agency " + slides[2]}>
                        <h1 className="slide-banner">agency</h1>
                    </div>
                </div>

                <div className={"mla-content " + (slides[0] === 'slide-first' ? 'content-show' : 'content-hide')} ref={mla_container}>
                    <div className="row">
                        <div className="col-sm-4">
                            <p>Before you launch an NFT collection, dive into the metaverse, develop a dApp, or create a new token, you'll need to have strategic direction and design.</p>
                            <p>We'll consult and conceptualize with you to map out the right strategies on the front end so you can accelerate your growth through diversified Web3 revenue streams.</p>
                        </div>
                        <div className="col-sm-8 d-flex flex-wrap fit-content">
                            <div className="content-icon">
                                <img src={NFT} alt="NFT" />
                                <span>NFT Marketplaces & Mint Machines</span>
                            </div>
                            <div className="content-icon">
                                <img src={Blockchain} alt="Blockchain" />
                                <span>Blockchain Solutions</span>
                            </div>
                            <div className="content-icon">
                                <img src={dApp} alt="dApp" />
                                <span>dApp Development</span>
                            </div>
                            <div className="content-icon">
                                <img src={Metaverse} alt="Metaverse" />
                                <span>Metaverse Creation & P2E Development</span>
                            </div>
                            <div className="content-icon">
                                <img src={ICO} alt="ICO" />
                                <span>Token Creation & ICOs</span>
                            </div>
                            <div className="content-icon">
                                <img src={SCAudit} alt="SCAudit" />
                                <span>Smart Contract Auditing</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"mla-content " + (slides[1] === 'slide-first' ? 'content-show' : 'content-hide')}>
                    <div className="row">
                        <div className="col-sm-4">
                            <p>Businesses are drawn in by Web3 advisory services that end when it's time to implement. As a result they're left to find a Web3 development company that can bring these plans to life.</p>
                            <p>We'll synchronize ideation and development efforts, following through on proven strategies with precision. Our integrated approach turns Web3 aspirations into action, saving time while laying the groundwork for future growth.</p>
                        </div>
                        <div className="col-sm-8 d-flex flex-wrap fit-content">
                            <div className="content-icon">
                                <img src={FSDev} alt="FSDev" />
                                <span>Full Stack Development</span>
                            </div>
                            <div className="content-icon">
                                <img src={Ecommerce} alt="Ecommerce" />
                                <span>Ecommerce</span>
                            </div>
                            <div className="content-icon">
                                <img src={Branding} alt="Branding" />
                                <span>Branding & Identity</span>
                            </div>
                            <div className="content-icon">
                                <img src={Avatar} alt="Avatar" />
                                <span>Avatar & Character Creation</span>
                            </div>
                            <div className="content-icon">
                                <img src={UIUX} alt="UIUX" />
                                <span>UI/UX Design</span>
                            </div>
                            <div className="content-icon">
                                <img src={AppDev} alt="AppDev" />
                                <span>App Development</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"mla-content third-content " + (slides[2] === 'slide-first' ? 'content-show' : 'content-hide')}>
                    <div className="row">
                        <div className="col-sm-4">
                            <p>We've included promotion and outreach as an integral part of our turnkey solution to drive mass adoption.</p>
                            <p>Whether you're running a social media campaign, leveraging our expansive influencer network, or implementing billboard ads, we attract the right audience to your Web3 verticals. In turn, we optimize your ROI while aligning with your brand requirements.</p>
                        </div>
                        <div className="col-sm-8 d-flex flex-wrap fit-content">
                            <div className="content-icon">
                                <img src={Launchpad} alt="Launchpad" />
                                <span>NFT Launchpads</span>
                            </div>
                            <div className="content-icon">
                                <img src={FinTech} alt="FinTech" />
                                <span>FinTech</span>
                            </div>
                            <div className="content-icon">
                                <img src={Influencer} alt="Influencer" />
                                <span>Influencer Networks</span>
                            </div>
                            <div className="content-icon">
                                <img src={Billboard} alt="Billboard" />
                                <span>Billboard Promotion</span>
                            </div>
                            <div className="content-icon">
                                <img src={Hacking} alt="Hacking" />
                                <span>Growth Hacking</span>
                            </div>
                            <div className="content-icon">
                                <img src={Press} alt="Press" />
                                <span>Press Mentions</span>
                            </div>
                            <div className="content-icon">
                                <img src={PageVerif} alt="Page Verification" />
                                <span>Page Verification</span>
                            </div>
                        </div>
                    </div>
                </div>

                <a href="/#MLA" className="slide-arrow slide-prev" onClick={handleSlidePrev}>
                    <i className="fa fa-angle-left" aria-hidden="true"></i>
                </a>
                <a href="/#MLA" className="slide-arrow slide-next" onClick={handleSlideNext}>
                    <i className="fa fa-angle-right" aria-hidden="true"></i>
                </a>

            </div>
            <img className="mla-cube" src={Cube} alt="cube" />
            <img className="mla-triangle" src={Triangle} alt="triangle" />
        </div>
    )
}