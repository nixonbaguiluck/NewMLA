import { Link } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import logo from "../../assets/images/header/logo.png";
import discord from "../../assets/images/header/discord.png";
import youtube from "../../assets/images/header/youtube.png";
import instagram from "../../assets/images/header/instagram.png";
import twitter from "../../assets/images/header/twitter.png";
import facebook from "../../assets/images/header/facebook.png";
import "./header.css";

export const Header = (props) => {
    const { goToSlide } = props;
    const menu = useRef();
    const tl = useRef();
    const [navReversed, setNavReversed] = useState(false);
    const [header, setHeader] = useState("trans");

    const listenScrollEvent = (event) => {
        const sections = document.getElementsByClassName('scroller')[0];
        if (sections.scrollTop < 50) {
            return setHeader("trans")
        } else if (sections.scrollTop > 50) {
            return setHeader("black")
        }
    }

    useEffect(() => {
        const sections = document.getElementsByClassName('scroller')[0];
        sections.addEventListener('scroll', listenScrollEvent);


        return () => {
            sections.removeEventListener('scroll', listenScrollEvent);
        }

    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            tl.current = gsap.timeline({ paused: true });
            tl.current.fromTo(menu.current, { x: "100%", display: 'none' }, { x: "0%", display: 'flex', duration: 0.3 });
            tl.current.from(document.querySelectorAll('ul.menu li'), {
                duration: 0.8,
                opacity: 0,
                y: 20,
                stagger: 0.1,
                ease: 'expo.inOut',
            }, "-=0.5");
        }, []);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        navReversed ? tl.current.play() : tl.current.reverse();
    }, [navReversed])

    const moveSlide = (position) => {
        goToSlide(position);
        setNavReversed(!navReversed);
    }

    return (
        <div id="header">
            <div className={"navbar " + header}>
                <div className="float-start">
                    <Link to="/"><img className="logo-img" src={logo} alt="logo" /></Link>
                </div>
                <div className="float-end d-flex align-items-center header-controls">
                    <a href="https://discord.gg/metalabsagency" target="_blank" rel="noreferrer"><img className="header-icon" src={discord} alt="discord" /></a>
                    <a href="#" target="_blank" rel="noreferrer"><img className="header-icon" src={youtube} alt="youtube" /></a>
                    <a href="https://www.instagram.com/metalabsagency/" target="_blank" rel="noreferrer"><img className="header-icon" src={instagram} alt="instagram" /></a>
                    <a href="https://twitter.com/metalabs_agency" target="_blank" rel="noreferrer"><img className="header-icon" src={twitter} alt="twitter" /></a>
                    <a href="https://www.facebook.com/themetalabsagency" target="_blank" rel="noreferrer"><img className="header-icon" src={facebook} alt="facebook" /></a>
                    {/* <button className="quote-btn">REQUEST A QUOTE</button> */}
                    <div className="hamburger-wrap" onClick={() => setNavReversed(!navReversed)}>
                        <div id="hamburger">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                </div>
            </div>

            <nav className="menu-section" ref={menu}>
                <div className="close" onClick={() => setNavReversed(!navReversed)}>
                    <i className="fa fa-times"></i>
                </div>
                <ul className="menu">
                    <li className="menu-li">
                        <Link className="underline-hover" to="/#" onClick={() => moveSlide(0)}>Home</Link>
                    </li>
                    <li className="menu-li">
                        <Link className="underline-hover" to="/#ABOUT" data-name="ABOUT" onClick={() => moveSlide(1)}>About</Link>
                    </li>
                    <li className="menu-li">
                        <Link className="underline-hover" to="/#MLA" data-name="MLA" onClick={() => moveSlide(2)}>Capabilities</Link>
                    </li>
                    <li className="menu-li">
                        <Link className="underline-hover" to="/#COMMUNITY" data-name="COMMUNITY" onClick={() => moveSlide(3)}>Projects</Link>
                    </li>
                    <li className="menu-li">
                        <Link className="underline-hover" to="/#AUCM" data-name="AUCM" onClick={() => moveSlide(4)}>AUCM</Link>
                    </li>
                    <li className="menu-li">
                        <Link className="underline-hover" to="/#CEO" data-name="CEO" onClick={() => moveSlide(5)}>Heart Centered</Link>
                    </li>
                    <li className="menu-li">
                        <Link className="underline-hover" to="/#CONTACT" data-name="CONTACT" onClick={() => moveSlide(7)}>Contact</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}