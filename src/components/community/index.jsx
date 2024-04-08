import { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import Modal from "react-modal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import element1 from "../../assets/images/community/community-blurred.png";
import element2 from "../../assets/images/community/community-sphere.png";
import hunters from "../../assets/images/community/HUNTERS.jpg";
import hunter_logo from "../../assets/images/community/HUNTERS_logo.png";
import huntresses from "../../assets/images/community/HUNTRESSES.jpg";
import huntress_logo from "../../assets/images/community/HUNTRESS_LOGO.png";
import mla from "../../assets/images/community/AGENTS.jpg";
import mla_logo from "../../assets/images/community/MLA-logo.png";
import dcc from "../../assets/images/community/DCC.jpg";
import dcc_logo from "../../assets/images/community/DCC-logo.png";
import res_hunter from "../../assets/images/community/res-hunter.jpg";
import res_huntress from "../../assets/images/community/res-huntress.jpg";
import res_mla from "../../assets/images/community/res-mla.jpg";
import res_dcc from "../../assets/images/community/res-dcc.jpg";
import "./community.css";

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
            <i className="fa fa-angle-right"></i>
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
            <i className="fa fa-angle-left"></i>
        </div>
    );
}

const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    touchMove: true,
    // initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
};

export const Community = (props) => {
    const { setCurrentSlide } = props;
    const [hunterModalOpen, setHunterModalOpen] = useState(false);
    const [huntressModalOpen, setHuntressModalOpen] = useState(false);
    const [mlaModalOpen, setMlaModalOpen] = useState(false);
    const [dccModalOpen, setDccModalOpen] = useState(false);

    const elem = useRef(null);
    const effect_text = useRef();

    useEffect(() => {
        if (window.innerWidth > 576 && window.innerHeight > 576) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: elem.current.querySelector('div'),
                    start: ".community bottom",
                    end: ".aucm top",
                    scroller: ".scroller",
                    onEnter: function ({ progress, direction, isActive }) {
                        setCurrentSlide(3);
                        tl.to(elem.current.querySelector("div"), {
                            y: 0,
                            opacity: 1,
                            duration: 1,
                            delay: 0
                        })
                            .from(elem.current.querySelectorAll(".slick-arrow"), {
                                opacity: 0,
                                duration: 1,
                                delay: -0.5,
                                ease: 'Power4.easeIn'
                            })
                            .from(elem.current.querySelectorAll(".effect-element"), {
                                y: 500,
                                opacity: 0,
                                duration: 2.5,
                                delay: -1.3,
                            })
                            .from(effect_text.current, {
                                y: 120,
                                delay: -1.5,
                                skewY: 7,
                                duration: 2
                            })
                            .from(elem.current.querySelectorAll('.slider-item'), {
                                duration: 1,
                                opacity: 0,
                                scale: 0.5,
                                yPercent: 50,
                                stagger: 0.3,
                                delay: -2.5,
                                overwrite: true
                            })
                            .from('.card-title', {
                                duration: 1,
                                opacity: 0,
                                x: '-140%',
                                stagger: 0.3,
                                delay: -2,
                                overwrite: true
                            })
                    },
                    onEnterBack: ({ progress, direction, isActive }) => {
                        setCurrentSlide(3);
                        tl.to(elem.current.querySelector("div"), {
                            y: 0,
                            opacity: 1,
                            duration: 1,
                            delay: 0
                        })
                            .to(elem.current.querySelectorAll(".effect-element"), {
                                y: 0,
                                opacity: 1,
                                duration: 2,
                                delay: -1.3,
                            })
                            .to(elem.current.querySelectorAll('.slider-item'), { opacity: 1, duration: 1, delay: -1 })
                    },
                    onLeave: () => {
                        tl.to(elem.current.querySelectorAll('.slider-item'), { opacity: 1, y: 0 })
                    }
                }
            });
        }
    }, [])


    useEffect(() => {
        if (hunterModalOpen || huntressModalOpen || mlaModalOpen || dccModalOpen) {
            document.body.style.overflow = 'scroll';
        } else {
            document.body.style.overflow = 'unset';
        }
    })

    const handleHoverEffect = (element) => {
        if (elem.current) {
            const classNames = ["hunterHover", "huntressHover", "mlaHover", "dccHover"];
            classNames.forEach(name => elem.current.classList.remove(name));
            elem.current.classList.add(classNames[element]);
        }
    }

    const handleClose = () => {
        setHunterModalOpen(false);
        setHuntressModalOpen(false);
        setMlaModalOpen(false);
        setDccModalOpen(false);
    }

    const openModal = (i) => {
        switch (i) {
            case 1:
                setHunterModalOpen(true);
                break;
            case 2:
                setHuntressModalOpen(true);
                break;
            case 3:
                setMlaModalOpen(true);
                break;
            case 4:
                setDccModalOpen(true);
                break;
            default:
                return;
        }
    }

    return (
        <>
            <div className="section" id="community">
                <div className="community " ref={elem}>
                    <div>
                        <div className="community-element1 effect-element">
                            <img src={element1} alt="community element" />
                        </div>
                        <div className="community-element2 effect-element">
                            <img src={element2} alt="community element" />
                        </div>
                        <div className="container position-relative">
                            <div className="overflow-hidden p-4">
                                <h1 className="community-banner" ref={effect_text}>OUR &nbsp; work</h1>
                            </div>
                            <Slider {...settings}>{
                                ["community-hunter", "community-huntress", "community-mla", "community-dcc"].map((v, i) => <div className={"slider-item item-" + i} key={i}>
                                    <div
                                        className={"community-card " + v}
                                        onMouseEnter={() => handleHoverEffect(i)}
                                        onClick={() => openModal(i + 1)}
                                    >
                                        <img
                                            className="slider-item-bg"
                                            src={"../img/image/carousel-image" + (i + 1) + ".png"}
                                            alt="carousel"
                                        ></img>
                                        <div className="hidden">
                                            <div className="card-title">
                                                <h2>{i === 3 ? "DREAM CAR CLUB" : i === 2 ? "META LABS AGENTS" : i === 1 ? "META BOUNTY HUNTRESSES" : i === 0 ? "META BOUNTY HUNTERS" : ""}</h2>
                                                <p className="learn">LEARN MORE</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <img
                            className="slider-item-img"
                            src={"../img/image/carousel-image" + i + ".png"}
                            alt="carousel"
                        ></img> */}
                                </div>)
                            }</Slider>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                appElement={document.getElementById('root')}
                isOpen={hunterModalOpen}
                onRequestClose={handleClose}
                overlayClassName={{
                    base: "overlay-base",
                    afterOpen: "overlay-after",
                    beforeClose: "overlay-before",
                }}
                className={{
                    base: "content-base",
                    afterOpen: "detail-modal content-after hunter-modal",
                    beforeClose: "content-before",
                }}
                closeTimeoutMS={500}
            >
                <div className="close">
                    <i className="fa close-icon" onClick={handleClose}>
                        &#xf00d;
                    </i>
                </div>
                <div className="modal-main">
                    <img className="hunter-img" src={window.innerWidth < 576 || window.innerHeight < 576 ? res_hunter : hunters} alt="modal hunters" />
                    <div className="w-100">
                        <div className="modal-intro hunter-content">
                            <div className="hunter-logo">
                                <img src={hunter_logo} alt="hunter_logo" />
                            </div>
                            <div>
                                <h2>META BOUNTY HUNTERS</h2>
                                <p>The Meta Bounty Hunters represent a community, a tribe, a galactic alliance of Doers organized to take action and DO the most good of any community for its members while having the largest impact for doing good in the galaxy. Are you up for the challenge to become great?</p>
                                <div className="d-flex gap-4 align-items-center mt-5 modal-btns">
                                    <a href="https://www.metabountyhunters.io" target="_blank" rel="noreferrer" className="hunter-visit-btn community-btn">VISIT WEBSITE</a>
                                    <a href="https://discord.gg/metabountyhunters" target="_blank" rel="noreferrer"><i className='fab fa-discord'></i></a>
                                    <a href="https://instagram.com/metabountyhunters/" target="_blank" rel="noreferrer"><i className='fab fa-instagram'></i></a>
                                    <a href="https://twitter.com/metabntyhntrs" target="_blank" rel="noreferrer"><i className='fab fa-twitter'></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="total hunter-total">
                            <div className="collection-num">
                                <h2>8,888</h2>
                                <p>Sold Out</p>
                                <p>NFT Collection</p>
                            </div>
                            <div className="Revenue">
                                <h2>$17M</h2>
                                <p>Revenue</p>
                                <p>Generated</p>
                            </div>
                            <div className="public">
                                <h2>$2.5M</h2>
                                <p>Revenue</p>
                                <p>in first 5 min. of public mint</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                appElement={document.getElementById('root')}
                isOpen={huntressModalOpen}
                onRequestClose={handleClose}
                overlayClassName={{
                    base: "overlay-base",
                    afterOpen: "overlay-after",
                    beforeClose: "overlay-before",
                }}
                className={{
                    base: "content-base",
                    afterOpen: "detail-modal content-after huntress-modal",
                    beforeClose: "content-before",
                }}
                closeTimeoutMS={500}
            >
                <div className="close">
                    <i className="fa close-icon" onClick={handleClose}>
                        &#xf00d;
                    </i>
                </div>
                <div className="modal-main">
                    <img className="hunter-img" src={window.innerWidth < 576 || window.innerHeight < 576 ? res_huntress : huntresses} alt="modal huntresses" />
                    <div className="w-100">
                        <div className="modal-intro huntress-content">
                            <div className="hunter-logo">
                                <img src={huntress_logo} alt="hunter_logo" />
                            </div>
                            <div>
                                <h2>META BOUNTY HUNTRESS</h2>
                                <p>The Meta Bounty Huntresses represent a tribe of the most fearless warriors in the galaxy who have mastered the art of war but choose peace, prosperity and the enlightenment of their people and the worlds they come in contact with.</p>
                                <div className="d-flex gap-4 align-items-center mt-5 modal-btns">
                                    <a className="huntress-visit-btn community-btn" href="https://www.metabountyhuntress.io" target="_blank" rel="noreferrer">VISIT WEBSITE</a>
                                    <a href="https://discord.gg/metabountyhunters" target="_blank" rel="noreferrer"><i className='fab fa-discord'></i></a>
                                    <a href="https://instagram.com/metabountyhunters/" target="_blank" rel="noreferrer"><i className='fab fa-instagram'></i></a>
                                    <a href="https://twitter.com/metabntyhntrs" target="_blank" rel="noreferrer"><i className='fab fa-twitter'></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="total huntress-total">
                            <div className="collection-num">
                                <h2>8,888</h2>
                                <p>Sold Out</p>
                                <p>NFT Collection</p>
                            </div>
                            <div className="Revenue">
                                <h2>$3.8M</h2>
                                <p>Rev enue Generated</p>
                                <p>in the 1st min. of public mint</p>
                            </div>
                            <div className="public">
                                <h2>$10M</h2>
                                <p>Revenue Generated</p>
                                <p>in first 5 min. of public mint</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                appElement={document.getElementById('root')}
                isOpen={mlaModalOpen}
                onRequestClose={handleClose}
                overlayClassName={{
                    base: "overlay-base",
                    afterOpen: "overlay-after",
                    beforeClose: "overlay-before",
                }}
                className={{
                    base: "content-base",
                    afterOpen: "detail-modal content-after mla-modal",
                    beforeClose: "content-before",
                }}
                closeTimeoutMS={500}
            >
                <div className="close">
                    <i className="fa close-icon" onClick={handleClose}>
                        &#xf00d;
                    </i>
                </div>
                <div className="modal-main">
                    <img className="hunter-img" src={window.innerWidth < 576 || window.innerHeight < 576 ? res_mla : mla} alt="modal huntresses" />
                    <div className="w-100">
                        <div className="modal-intro mla-content2">
                            <div className="hunter-logo">
                                <img src={mla_logo} alt="mla_logo" />
                            </div>
                            <div>
                                <h2>META LABS <br />AGENTS</h2>
                                <p>Meta Labs Agents NFTs are your key to the world of Web3. We are here to accomplish what others cannot, and go where others haven’t dared to go. Becoming an MLAgent is the path into blockchain mastery, exclusivity, and opportunity. No matter your background, experience or walk of life, as an MLAgent you will come out on top in this new world.</p>
                                <div className="d-flex gap-4 align-items-center mt-5 modal-btns">
                                    <a className="mla-visit-btn community-btn" href="https://mlagents.io" target="_blank" rel="noreferrer">VISIT WEBSITE</a>
                                    <a href="https://discord.gg/metalabsagency" target="_blank" rel="noreferrer"><i className='fab fa-discord'></i></a>
                                    <a href="" target="_blank" rel="noreferrer"><i className='fab fa-instagram'></i></a>
                                    <a href="https://twitter.com/Metalabs_agency" target="_blank" rel="noreferrer"><i className='fab fa-twitter'></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="total mla-total">
                            <div className="collection-num">
                                <h2>20000</h2>
                                <p>NFT Collection</p>
                            </div>
                            <div className="Revenue">
                                <h2>$1M</h2>
                                <p>in sales in the first</p>
                                <p>15 minutes</p>
                            </div>
                            <div className="public">
                                <h2>#1</h2>
                                <p>in Total Mint Volume</p>
                                <p>on Open Sea</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <Modal
                appElement={document.getElementById('root')}
                isOpen={dccModalOpen}
                onRequestClose={handleClose}
                overlayClassName={{
                    base: "overlay-base",
                    afterOpen: "overlay-after",
                    beforeClose: "overlay-before",
                }}
                className={{
                    base: "content-base",
                    afterOpen: "detail-modal content-after dcc-modal",
                    beforeClose: "content-before",
                }}
                closeTimeoutMS={500}
            >
                <div className="close">
                    <i className="fa close-icon" onClick={handleClose}>
                        &#xf00d;
                    </i>
                </div>
                <div className="modal-main">
                    <img className="hunter-img" src={window.innerWidth < 576 || window.innerHeight < 576 ? res_dcc : dcc} alt="modal dcc" />
                    <div className="w-100">
                        <div className="modal-intro dcc-content2">
                            <div className="hunter-logo">
                                <img src={dcc_logo} alt="dcc_logo" />
                            </div>
                            <div>
                                <h2>DREAM CAR CLUB</h2>
                                <p className="mb-3">The global automotive community that enters you in to 12 cars & cash giveaways over 12 months and so much more.</p>
                                <p>We are a group of like minded people, who share a passion for all things automotive and doing good for the community. We want to inspire and empower people to live out their dreams, regardless of how big they are.</p>
                                <div className="d-flex gap-4 align-items-center mt-5 modal-btns">
                                    <a className="dcc-visit-btn community-btn" href="https://www.dreamcarclub.com" target="_blank" rel="noreferrer">VISIT WEBSITE</a>
                                    <a href="https://discord.gg/dreamcarclub" target="_blank" rel="noreferrer"><i className='fab fa-discord'></i></a>
                                    <a href="https://www.instagram.com/dreamcarclubofficial/" target="_blank" rel="noreferrer"><i className='fab fa-instagram'></i></a>
                                    <a href="https://twitter.com/DreamCarClubNFT" target="_blank" rel="noreferrer"><i className='fab fa-twitter'></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="total dcc-total">
                            <div className="collection-num">
                                <h2>21,000</h2>
                                <p>NFT Collection</p>
                            </div>
                            <div className="Revenue">
                                <h2>12</h2>
                                <p>Monthly Cash/Car</p>
                                <p>Giveaways</p>
                            </div>
                            <div className="public">
                                <h2>$200k+</h2>
                                <p>Rewarded to</p>
                                <p>Winners to Date</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}