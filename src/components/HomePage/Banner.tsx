import React, { useEffect, useState } from 'react';
import './style/Banner.scss';

const Banner: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const textToType = 'Bring everyThing onto your desk.';
  const typingDelay = 100; // Delay between each character typing
  const erasingDelay = 50; // Delay before erasing starts
  const newTextDelay = 2000; // Delay before typing starts again after erasing

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const type = (text: string, index: number, delay: number) => {
      if (index < text.length) {
        setTypedText((prevTypedText) => prevTypedText + text.charAt(index));
        timeout = setTimeout(() => type(text, index + 1, delay), delay);
      } else {
        timeout = setTimeout(erase, newTextDelay);
      }
    };

    const erase = () => {
      if (typedText.length > 0) {
        setTypedText((prevTypedText) => prevTypedText.slice(0, -1));
        timeout = setTimeout(erase, erasingDelay);
      } else {
        setTypedText(''); // Reset typedText to empty string
        timeout = setTimeout(() => type(textToType, 0, typingDelay), typingDelay);
      }
    };

    timeout = setTimeout(() => type(textToType, 0, typingDelay), typingDelay);

    // Clean up on unmount
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="app">
      <div className="post">
        <h1>{typedText}</h1>
      </div>
    </div>
  );
};

export default Banner;
