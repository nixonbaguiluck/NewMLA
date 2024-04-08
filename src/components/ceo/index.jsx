import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import photo from "../../assets/images/ceo/photo.jpg";
import res_photo from "../../assets/images/ceo/res-photo.jpg";
import orientation_photo from "../../assets/images/ceo/orientation-photo.png";
import ceo_element from "../../assets/images/ceo/pyramid.png";
import logo1 from '../../assets/images/ceo/impaulsive_logo 1.png';
import logo2 from '../../assets/images/ceo/success_logo_dark.png';
import logo3 from '../../assets/images/ceo/Vector.png';
import "./ceo.css";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export const Ceo = (props) => {
    const { setCurrentSlide } = props;
    const ceoImg = useRef();
    const ceo = useRef();
    const container = useRef();

    // function numberWithCommas(x) {
    //     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // }

    useEffect(() => {
        if (window.innerWidth > 576 && window.innerHeight > 576) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ceoImg.current,
                    start: ".ceo bottom",
                    scroller: ".scroller",
                    onEnter: function ({ progress, direction, isActive }) {
                        setCurrentSlide(5);
                        tl.to(container.current, {
                            y: 0,
                            opacity: 1,
                            duration: 0,
                            delay: 1
                        })
                            .from('.ceo-element', {
                                duration: 3,
                                yPercent: 120,
                                delay: -0.2,
                                opacity: 0,
                                ease: 'expo.out',
                            })
                            .fromTo(".holder", { yPercent: -100 }, { duration: 2, yPercent: 0, delay: -3, ease: 'Power3.easeInOut' })
                            .fromTo(".holder img", { yPercent: 100 }, { duration: 2, yPercent: 0, delay: 0, ease: 'Power3.easeInOut' }, "<")
                            .from(document.querySelectorAll('.ceo-banner'), {
                                duration: 1.5,
                                y: 120,
                                skewY: 7,
                                delay: -1.7,
                                opacity: 0,
                                ease: 'power4.out',
                                stagger: {
                                    amount: 0.1
                                }
                            })
                            .from(".ceo-description", {
                                duration: 2,
                                opacity: 0,
                                y: '140%',
                                ease: 'expo.out',
                                delay: -1.2,
                                overwrite: true
                            })
                            .from(".ceo-feature, .ceo-total", {
                                duration: 2,
                                opacity: 0,
                                y: '140%',
                                ease: 'expo.out',
                                delay: -1.4,
                                stagger: {
                                    amount: 0.5
                                },
                                overwrite: true
                            })
                            .from('.collection-num span, .Revenue span, .public span', {
                                textContent: 0,
                                duration: 1,
                                ease: "Power1.easeIn",
                                snap: { textContent: 1 },
                                delay: -2,
                                stagger: {
                                    each: 0.2,
                                },
                                overwrite: true
                            })
                    },
                    onEnterBack: ({ progress, direction, isActive }) => {
                        setCurrentSlide(5);
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
        <div className="section ceo" id="ceo" ref={ceo}>
            <img className="ceo-element" src={ceo_element} alt="ceo_element" />
            <div className="d-flex ceo-main" ref={container}>
                <div className="ceo-img" ref={ceoImg}>
                    <div className="overflow-hidden holder">
                        <img src={window.innerWidth < 576 ? res_photo : window.innerHeight < 576 ? orientation_photo : photo} alt="ceo" />
                    </div>
                </div>

                <div className="w-100 d-flex align-items-center ceo-content-box">
                    <div>
                        <div className="ceo-content">
                            <div className="overflow-hidden">
                                <h1 className="ceo-banner">HEART CENTERED</h1>
                            </div>
                            <div className="overflow-hidden mb-3">
                                <h1 className="ceo-banner" style={{ color: "#2a9ce2" }}>APPROACH</h1>
                            </div>
                            <p className="ceo-description">In every project we launch, we lead with our hearts focused on doing good for the world and giving back to communities.</p>
                            <p className="ceo-description">One of the things we identified was use of proceeds and making sure the proceeds from mint were going to be deployed in a responsible way that would benefit people around the world.</p>
                            <p className="ceo-description">Whether it is our Do Good fund where communities get to vote on charities to give back to or our airdrop rewards models that puts the power back in the hands of the people. Our heart centered approach knows no borders and is always open to serve.</p>
                            <h3 className="ceo-feature">FEATURED IN</h3>
                            <div className="d-flex align-items-center gap-5 mt-3 ceo-feature">
                                <img src={logo1} alt="logo" />
                                <img src={logo2} alt="logo" />
                                <img src={logo3} alt="logo" />
                            </div>
                        </div>
                        <div className="total ceo-total">
                            <div className="collection-num">
                                <h2>$<span>35</span>M</h2>
                                <p>Free Airdropped</p>
                                <p>Reflection Rewards</p>
                                <p>to Holders to Date</p>
                            </div>
                            <div className="Revenue">
                                <h2>$<span>500</span>K</h2>
                                <p>Donated through</p>
                                <p>Do Good Initiatives</p>
                            </div>
                            <div className="public">
                                <h2><span>1000</span>s</h2>
                                <p>of Lives Changed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}