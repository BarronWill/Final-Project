import { memo, useState } from "react"

const Counter = memo(({number, setNumber}) => {
    return (
        <>
            <div className="flex flex-row max-w-[100px] justify-between rounded-md bg-stone-white border-[2px] items-center">
                <button type="button" onClick={() => number > 1 ? setNumber(number-1) : setNumber(1)} className="px-2 py-1 rounded-l-md hover:bg-cloud-grey">
                    <i className="fa-solid fa-minus"></i>
                </button>
                <p className="font-semibold w-[40px] text-center">{number}</p>
                <button type="button" onClick={() => setNumber(number+1)} className="px-2 py-1 rounded-r-md hover:bg-cloud-grey">
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>
        </>
    )
})

export default Counter