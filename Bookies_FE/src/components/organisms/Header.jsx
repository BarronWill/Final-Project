import {memo, useState} from "react";
import Search from "../atoms/Search"
import Button from "../atoms/Button";
import { Link } from "react-router-dom";

const Header = memo(({isOpen, setIsOpen}) => {
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    }
    // console.log("Header rendered")
    return (
        <div className="flex flex-row justify-between items-center leading-none p-3 border-b-2 lg:justify-end border-cloud-grey">
            <div className="flex flex-row gap-2 items-center text-header font-bold leading-none lg:hidden">
                <Button icon="fa-solid fa-bars" color="primary" onClick={toggleSidebar}/>
                <Link href="/">Bookies</Link>
            </div>
            <Search placeholder="Author, Book, Genre"/>
        </div>
    );
})

export default Header