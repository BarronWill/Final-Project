import { memo, useEffect, useState } from "react";

const Radio = memo(({children, itsvalue, value, setValue, active=false}) => {
    const [isSelected, setIsSelected] = useState(active)
    const [isActive, setIsActive] = useState(active)

    useEffect(() => {
        if (isActive && itsvalue != value){
            setValue(itsvalue)
            setIsActive(false)
        }
        setIsSelected(itsvalue === value)
        
    }, [value])

    const handleClick = (event) => {
        event.preventDefault()
        setValue(itsvalue)
    }

    return (
        <>
        <label className="flex flex-row gap-2">
            <button className="outline-none" onClick={handleClick}>
                <div className="w-6 h-6 p-1 rounded-full border-2 border-dark-blue">
                    <div className={`${isSelected ? 'opacity-100' : 'opacity-0'} w-3 h-3 rounded-full bg-dark-blue duration-100`}></div>
                </div>
            </button>
            <div>{children}</div>
        </label>
        </>
    )
})

export default Radio