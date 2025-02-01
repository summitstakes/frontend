import React, { useState, useEffect } from 'react';

interface TypeWriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export function TypeWriter({ 
  words, 
  typingSpeed = 50, // Faster typing speed (was 80)
  deletingSpeed = 30, // Faster deleting speed (was 40)
  pauseTime = 800 // Shorter pause time (was 1000)
}: TypeWriterProps) {
  const [currentWord, setCurrentWord] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;

    const word = words[currentIndex];
    const shouldDelete = !isDeleting && currentWord === word;
    const shouldType = isDeleting && currentWord === '';

    let timer: NodeJS.Timeout;

    if (shouldDelete) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
    } else if (shouldType) {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % words.length);
    } else {
      timer = setTimeout(() => {
        setCurrentWord(prev => {
          if (isDeleting) {
            return prev.slice(0, -1);
          } else {
            return word.slice(0, prev.length + 1);
          }
        });
      }, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentWord, currentIndex, isDeleting, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="inline-block min-w-[2ch]">
      {currentWord}
      <span className="animate-pulse">|</span>
    </span>
  );
}