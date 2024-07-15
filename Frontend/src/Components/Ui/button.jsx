import buttonColor from "../buttonColors";

const Button = ({ color , className , children , disabled , onClick}) => {
    const baseClasses = "focus:outline-none text-white font-medium rounded-md text-sm px-5 py-2.5 mb-2 bg-red-400";

    return (
        <>
            <button
                type="submit"
                disabled={disabled} 
                className={`${baseClasses} ${buttonColor[color]} ${className}`}
                onClick={onClick}
            >
                {children}
            </button>
        </>
    );
};

export default Button;