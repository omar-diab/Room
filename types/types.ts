import { ReactNode } from "react";

type st = string;
type num = number;
type bool = boolean;
type fn = () => void;

export interface HomeCardProps {
    img: st,
    title: st,
    description: st,
    hendleClick: fn,
    className: st
}
  
export interface MeetingModelProps {
    isOpen: bool;
    onClose: fn;
    title: st;
    className?: st;
    children?: ReactNode;
    handleClick: fn;
    buttonText?: st;
    image?: st;
    buttonIcon?: st
}
