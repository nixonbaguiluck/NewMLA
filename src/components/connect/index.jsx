import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import connect_element1 from "../../assets/images/connect/connect-element1.png";
import connect_element2 from "../../assets/images/connect/connect-element2.png";
import connect_element3 from "../../assets/images/connect/connect-element3.png";
import "./connect.css";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export const Connect = (props) => {
    const { setCurrentSlide } = props;
    const container = useRef();
    const effect_text = useRef();

    useEffect(() => {
        const effect_items = container.current.querySelectorAll('.connect-items');
        const hover = [];
        effect_items.forEach((item, index) => {
            hover[index] = gsap.to(item, {
                backgroundPosition: "100% 0",
                y: "-50px",
                duration: 1,
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
                    trigger: container.current.querySelector('div'),
                    start: ".connect bottom",
                    end: ".contact top",
                    scroller: ".scroller",
                    onEnter: function ({ progress, direction, isActive }) {
                        setCurrentSlide(6);
                        tl.to(container.current, {
                            y: 0,
                            opacity: 1,
                            duration: 0,
                            delay: -1
                        })
                            .from(document.querySelectorAll(".connect-effect-element"), {
                                y: 450,
                                opacity: 0,
                                duration: 3,
                                delay: -2,
                                ease: "Power3.easeInOut",
                                stagger: 0.1
                            })
                            .from(effect_text.current, {
                                y: 150,
                                ease: 'Power4.easeOut',
                                skewY: 7,
                                delay: -1.4,
                                duration: 1.5
                            })
                            .from(container.current.querySelectorAll('.connect-items'), {
                                opacity: 0,
                                scale: 0,
                                rotationY: 180,
                                duration: 2,
                                delay: -1,
                                // ease: 'Power2.easeIn',
                                stagger: 0.2,
                                overwrite: true
                            })
                            .from(container.current.querySelectorAll('span'), {
                                textContent: 0,
                                duration: 1,
                                ease: "Power1.easeIn",
                                snap: { textContent: 1 },
                                delay: -1.7,
                                stagger: 0.2
                                // onUpdate: textContent.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                            });
                    },
                    onEnterBack: ({ progress, direction, isActive }) => {
                        setCurrentSlide(6);
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
        <div className="section connect" id="connect">
            <img src={connect_element1} className="connect-element1 connect-effect-element" alt="connect element" />
            <img src={connect_element2} className="connect-element2 connect-effect-element" alt="connect element" />
            <img src={connect_element3} className="connect-element3" alt="connect element" />
            <div className="container" ref={container}>
                <div className="overflow-hidden">
                    <h1 ref={effect_text}>CONNECT WITH US</h1>
                </div>
                <div className="connect-main row justify-content-center">
                    <div className="col-md-4 col-sm-6">
                        <a href="https://www.instagram.com/metalabsagency/" target="_blank" rel="noreferrer">
                            <div className="connect-items connect-instagram">
                                <i className="fab fa-instagram"></i>
                                <h4>INSTAGRAM</h4>
                                <h3><span>44</span>k</h3>
                                <h5>FOLLOWERS</h5>
                            </div>
                        </a>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <a href="https://twitter.com/metalabs_agency" target="_blank" rel="noreferrer">
                            <div className="connect-items connect-twitter">
                                <i className="fab fa-twitter"></i>
                                <h4>TWITTER</h4>
                                <h3><span>38</span>k</h3>
                                <h5>FOLLOWERS</h5>
                            </div>
                        </a>
                    </div>
                    <div className="col-md-4 col-sm-6">
                        <a href="https://discord.gg/metalabsagency" target="_blank" rel="noreferrer">
                            <div className="connect-items connect-discord">
                                <i className="fab fa-discord"></i>
                                <h4>DISCORD</h4>
                                <h3><span>17.4</span>k</h3>
                                <h5>MEMBERS</h5>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}