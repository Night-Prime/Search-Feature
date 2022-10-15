import { useState, useRef, useEffect } from 'react';

// custom hook to hide/show suggestion box
const useOutsideClick = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef();
    
    const handleOutsideClick = () => {
        if(ref.current) {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);
    return [ref, isVisible, setIsVisible];
}

export default useOutsideClick;
