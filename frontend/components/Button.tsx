import { memo } from "react";

interface Props {
    className?: string;
    onClick?: ()=> void;
    disabled?: boolean;
    children?: any
}

const Button = ({className, onClick, disabled, children}: Props)=>{
    return <button className={`button ${className}`} onClick={onClick} disabled={disabled}>{children}</button>
}

export default memo(Button);