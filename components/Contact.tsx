import { MY_EMAIL } from '@/utils/env';
import { ReactNode, useEffect, useState } from 'react';

interface ContactProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Contact: React.FC<ContactProps> = ({ isOpen, onClose, children }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    if (MY_EMAIL) {
        try {
            await navigator.clipboard.writeText(MY_EMAIL)
            setIsCopied(true)
        } catch (err) {
            console.error
        }
    }
  };
  // Disable scrolling when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Close the modal when the Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center'>
          <div className='bg-white rounded-lg p-6 text-stone-700'>
            {children}
            <button
              className='absolute top-0 right-2 m-5 text-5xl text-gray-100 hover:text-gray-800 hover:no-underline'
              onClick={onClose}
            >
              &times;
            </button>
            {isCopied ? (
              <p>Thank you for contacting me!</p>
            ) : (
              <p>
                Click{' '}
                <a
                  className='underline hover:font-semibold hover:no-underline'
                  href='#'
                  onClick={handleCopyClick}
                >
                  here
                </a>{' '}
                to copy my email address to your clipboard.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
