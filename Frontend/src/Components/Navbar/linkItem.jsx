import { Link } from "react-router-dom";

const LinkItem = ({to, children, className }) => {
    const baseClasses = "font-medium text-sm px-5 py-2.5 hover:text-orange-500 ease-out duration-300";

    return (
        <>
            <Link
                to={`${to}`}
                
                className={`${baseClasses} ${className}`}>
                {children}
            </Link>
        </>
    );
};

export default LinkItem;