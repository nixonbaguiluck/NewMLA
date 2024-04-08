import { useState, useEffect } from 'react';
import classNames from "classnames";

export const Cursor = () => {
    const [linkHovered, setLinkHovered] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
  
    useEffect(() => {
      addEventListeners();
      handleLinkHoverEvents();
      return () => removeEventListeners();
    }, []);
  
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
  
    const addEventListeners = () => {
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
    };
  
    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  
    const onMouseLeave = () => {
      setHidden(true);
    };
  
    const onMouseEnter = () => {
      setHidden(false);
    };
  
    const onMouseDown = () => {
      setClicked(true);
    };
  
    const onMouseUp = () => {
      setClicked(false);
    };
  
  
    const handleLinkHoverEvents = () => {
      document.querySelectorAll(".aucm-slider").forEach(el => {
        el.addEventListener("mouseover", () => setLinkHovered(true));
        el.addEventListener("mouseout", () => setLinkHovered(false));
      });
    };
  
    const cursorClasses = classNames(
      'cursor',
      {
        'cursor--clicked': clicked,
        'cursor--hidden': hidden,
        'cursor--link-hovered': linkHovered
      }
    );
  
    return <div className={cursorClasses}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }} />
  }