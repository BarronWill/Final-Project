import {useState, memo} from "react";
const Search = memo(({placeholder}) => {
    // const onChange = (e) => {
    //     setFinding(e.target.value)
    // }
    const [finding, setFinding] = useState("");
    
    const onChange = (e) => {
        setFinding(e.target.value);
    }

    return (
        <label htmlFor="search" className="flex flex-row p-2 items-center gap-2 border-2 border-black rounded-md font-normal hover:border-blue">
            <input id="search" type="text" placeholder={placeholder} value={finding} onChange={onChange} className="bg-white focus:outline-none"></input>
            <span className="hover:cursor-pointer focus:text-black"><i className="fa-solid fa-magnifying-glass"></i></span>
        </label>
    );
})

export default Search