import React from "react";
import ButtonProps from "../interfaces/ButtonProps";

const Button = (props: ButtonProps) => {
    return (
        <button {...props} className="bg-primaryLinear hover:bg-secondaryLinear transition duration-500 px-4 py-2 rounded-md border border-[#ffffff20] font-bold cursor-pointer">
            {props.children}
        </button>
    );
}

export default Button;
