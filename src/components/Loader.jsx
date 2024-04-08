import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';
import mla_logo from '../assets/images/community/logo element.png';

const Container = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  touch-action: none;
  overflow: hidden;
  width: 100vw;
  height: 100vh;

  z-index: 9999999;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background: linear-gradient(to top left, #30173e, rgba(22, 25, 58, 0) 40%, #062446 100%), linear-gradient(to top right, #040e27, rgba(22, 25, 58, 0), #214468 100%) rgba(22, 25, 58, 1);

  width: 100%;

  @media (max-width: 48em) {
    svg{
      width: 20vw;
    }
  }

  svg {
    width: 10vw;

    height: auto;
    overflow: visible;
    stroke-linejoin: round;
    stroke-linecap: round;
    g {
      path {
        stroke: #fff;
      }
    }
  }
`;

const textVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,

    transition: {
      duration: 1,
      yoyo: Infinity,

      ease: 'easeInOut',
    },
  },
};

const Text = styled(motion.span)`
  font-size: 20px;
  color: #fff;
  padding-top: 0.5rem;

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontlg};

  }
`;

const Loader = () => {
  return (
    <>
      <Container
        initial={{ y: 0, opacity: 1 }}
        exit={{ y: '-100%', opacity: 0.5 }}
        transition={{ duration: 1.3 }}
      >
        <div className='position-relative'>
          <div id='loader'>
          </div>
          <img src={mla_logo} alt="mla logo" className='load-logo' />
        </div>

        <Text variants={textVariants} initial="hidden" animate="visible">
          Meta Labs Agency
        </Text>
      </Container>
    </>
  );
};

export default Loader;
