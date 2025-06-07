import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const scrollToTop = () => {
    const location = useLocation()
    useEffect(() => {
        window.scrollTo({top: 0})
    }, [location])
}

export default scrollToTop