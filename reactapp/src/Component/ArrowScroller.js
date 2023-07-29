import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

const ArrowScroller = () => {
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;

      setShowArrow(scrollTop > windowHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '90px',
        right: '30px',
        zIndex: '9999',
      }}
    >
      {showArrow && (
        <Button
          variant="secondary"
          onClick={scrollToTop}
          style={{
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            fontSize: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
            cursor: 'pointer',
          }}
        >
          &#9650;
        </Button>
      )}
    </div>
  );
};

export default ArrowScroller;
