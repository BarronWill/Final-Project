import { memo } from "react";

export const Button = memo(({type="button", children, onClick=null, icon=''}) => {
    return (
        <button 
        type={type} 
        onClick={onClick} 
        className={`flex flex-row p-2 leading-none items-center gap-2 rounded-md font-inherit text-inherit border-inherit bg-inherit`}>
            {icon && children && <>
            <i className={icon}></i>
            <span>{children}</span>
            </>}
            {icon && !children && <i className={icon}></i>}
            {!icon && children && <span>{children}</span>}
        </button>
    );
})

export const Select = memo(({children, value, onChange}) => {
    return (
        <select value={value} onChange={onChange} className="px-2 py-1 outline-none text-center rounded-md border-2 bg-inherit">
            {children}
        </select>
    )
})

export const Input = memo(({type, value, onChange, placeholder=""}) => {
    return (
        <>
            <input 
            type={type} 
            value={value}
            onChange={onChange} 
            placeholder={placeholder}
            className="py-1 outline-none bg-inherit border-b-2" 
            />
        </>
    )
})

