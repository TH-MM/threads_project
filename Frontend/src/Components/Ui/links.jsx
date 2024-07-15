import { Link } from "react-router-dom";

const Link_ = ({ to , children , className}) => {
    const baseClasses = "font-medium text-sm hover:text-orange-500 ease-out duration-300";

    return (
        <>
            <Link to={`${to}`} className={`${baseClasses} ${className}`}>{children}</Link>
        </>
    );
};

export default Link_;