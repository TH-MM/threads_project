

const Button = ({ className , children , disabled , onClick}) => {
    const baseClasses = "focus:outline-none font-medium rounded-md text-sm px-5 py-2.5 mb-2";

    return (
        <>
            <button
                type="submit"
                disabled={disabled} 
                className={`${baseClasses} ${className}`}
                onClick={onClick}
            >
                {children}
            </button>
        </>
    );
};

export default Button;