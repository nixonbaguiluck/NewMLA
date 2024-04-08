import { useState, useEffect, useRef } from 'react';
import Modal from "react-modal";
import gsap from "gsap";
import mlaAxios from "../../axios/mlaAxios";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import swal from "sweetalert";

import contact_element1 from "../../assets/images/contact/contact-element1.png";
import contact_element2 from "../../assets/images/contact/contact-element2.png";
import block from "../../assets/images/contact/blocks.png";
import girl from "../../assets/images/contact/metaverse-girl.png";
import "./contact.css";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export const Contact = (props) => {
    const { setCurrentSlide } = props;
    const menu = useRef();
    const container = useRef();
    const [navReversed, setNavReversed] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [service, setService] = useState("");
    const [how, setHow] = useState("");

    const sendEmail = async () => {
        if (name === "" || email === "" || phone === "" || service === "" || how === "") {
            swal("Warning!", "Please input all the data!", "warning");
        } else {
            try {
                const res = await mlaAxios.post("/sendMessage", { name, url, email, phone, service, how });
                if (res.data.success === false) {
                    swal("Warning!", "We can't send message. Please try again.", "warning");
                    console.log(res.data.message);
                } else {
                    swal("Success!", "Our team will review and reach out to you as soon as we can.", "success");
                    setName("");
                    setUrl("");
                    setEmail("");
                    setPhone("");
                    setService("");
                    setHow("");
                    setNavReversed(!navReversed); setModalOpen(false);
                }
            } catch (err) {
                swal("Warning!", "We can't send message. Please try again.", "warning");
                console.log(err);
            }
        }
    }

    const handleClose = () => {
        setModalOpen(false)
    }

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
                    trigger: container.current,
                    start: ".contact bottom",
                    scroller: ".scroller",
                    onEnter: function ({ progress, direction, isActive }) {
                        setCurrentSlide(7);
                        tl.from(".contact-element1", {
                            opacity: 0,
                            y: '140%',
                            ease: 'expo.out',
                            duration: 1,
                            delay: 0.5
                        })
                            .fromTo(container.current.querySelector(".holder"), { yPercent: -100 }, { duration: 2, yPercent: 0, delay: -1.5 })
                            .fromTo(container.current.querySelector(".holder img"), { yPercent: 100 }, { duration: 2, yPercent: 0, delay: 0 }, "<")
                            .from(container.current.querySelectorAll('.girl'), {
                                // xPercent: 100,
                                // scale: 0,
                                opacity: 0,
                                filter: "blur(100px)",
                                transformOrigin: "bottom right",
                                ease: 'Power4.easeOut',
                                delay: -1.2,
                                duration: 2
                            })
                            .from(container.current.querySelectorAll('h1'), {
                                y: 150,
                                ease: 'Power4.easeOut',
                                skewY: 7,
                                delay: -1.4,
                                duration: 1.5
                            })
                            .from('.contact-banner, .contact-content button', {
                                duration: 3,
                                opacity: 0,
                                y: '100px',
                                ease: 'expo.out',
                                delay: -1,
                                stagger: {
                                    amount: 0.2
                                },
                                overwrite: true
                            })
                    },
                }
            });
        }
    }, [])

    return (
        <div className="section contact" id='contact'>
            <img src={contact_element1} alt="contact element" className="contact-element1" />
            <img src={contact_element2} alt="contact element" className="contact-element2" />
            <div className="container" ref={container}>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="contact-content">
                            <div className='overflow-hidden'>
                                <h1>want to work with us?</h1>
                            </div>
                            <div className='overflow-hidden'>
                                <h1 style={{ color: "#28C3F6" }}>get in touch.</h1>
                            </div>
                            <p className='contact-banner'>Invest in the future of your business. As veteran Web3 developers, NFT and blockchain experts,<br /> our versatile team serves as the one-stop-shop for your company’s NFT, metaverse or blockchain strategy.</p>
                            <p className="contact-banner mt-4">Let’s unlock the power of Web3.</p>
                            <button className="contact-us" onClick={() => { setNavReversed(!navReversed); setModalOpen(true) }}>CONTACT US</button>
                        </div>
                    </div>
                    <div className="col-lg-6 text-center">
                        <div className='overflow-hidden holder'>
                            <img src={block} alt="block" className="contact-block" />
                        </div>
                        <img src={girl} alt="meta-girl" className="girl" />
                    </div>
                </div>
            </div>

            <Modal
                appElement={document.getElementById('root')}
                isOpen={modalOpen}
                onRequestClose={handleClose}
                overlayClassName={{
                    base: "overlay-base",
                    afterOpen: "overlay-after",
                    beforeClose: "overlay-before",
                }}
                className={{
                    base: "content-base",
                    afterOpen: "contact-modal content-after",
                    beforeClose: "content-before",
                }}
                closeTimeoutMS={500}
            >
                <div className="contact-sidebar" ref={menu}>
                    <div className="close" onClick={() => { setNavReversed(!navReversed); setModalOpen(false); }}>
                        <i className="fa fa-times"></i>
                    </div>
                    <div className='contact-form'>
                        <div className='input-form'>
                            <h3>Your name <span>*</span></h3>
                            <input type="text" placeholder='Your full name' value={name} onChange={(e) => { setName(e.target.value); }}></input>
                        </div>
                        <div className='input-form'>
                            <h3>Your email <span>*</span></h3>
                            <input type="email" placeholder='name@address.com' value={email} onChange={(e) => { setEmail(e.target.value); }}></input>
                        </div>
                        <div className='input-form'>
                            <h3>Phone number <span>*</span></h3>
                            <input type="text" placeholder='ex, +1,123,456' value={phone} onChange={(e) => { setPhone(e.target.value); }}></input>
                        </div>
                        <div className='input-form'>
                            <h3>Website <span>*</span></h3>
                            <input type='text' placeholder='www.example.com' value={url} onChange={(e) => { setUrl(e.target.value); }}></input>
                        </div>
                        <div className='input-form'>
                            <h3>What service are you interested in?</h3>
                            <input type='text' placeholder='Write what service we can help you with.' value={service} onChange={(e) => { setService(e.target.value); }}></input>
                        </div>
                        <div className='input-form'>
                            <h3>Message <span>*</span></h3>
                            <textarea type='text' placeholder='Tell us about your project' cols="40" rows="5" value={how} onChange={(e) => { setHow(e.target.value); }}></textarea>
                        </div>
                        <div className='contact-btns'>
                            <button className='submit-btn' onClick={sendEmail}>Submit</button>
                            <button className='cancel-btn' onClick={() => { setNavReversed(!navReversed); setModalOpen(false); }}>Cancel</button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}