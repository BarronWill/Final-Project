import { memo } from "react"

const  Checkbox = memo(({isSelected, setIsSelected, children}) => {
    const handleClick = (event) => {
        event.preventDefault()
        setIsSelected((isSelected+1) % 2)   
    }

    return (
        <>
            <label className="flex flex-row gap-2 items-center">
                <button className="w-5 h-5 border-2 border-blue p-1 rounded-md" onClick={handleClick}>
                    <div className={`${!isSelected ? 'opacity-0' : isSelected==2 ? 'opacity-100 h-1' : 'opacity-100 h-2'} w-2 bg-blue rounded-sm`}></div>
                </button>
                {children}
            </label>
        </>
    )
})

export default Checkbox