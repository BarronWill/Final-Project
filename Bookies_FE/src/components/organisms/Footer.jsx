import LinkItem from "../atoms/LinkItem";
import logo from "../../assets/img/logo.png";
import { memo } from "react";

const Footer = memo(() => {
    // console.log("Footer rendered")
    return (
        <footer className="flex flex-col justify-center items-start content-center gap-4 md:flex-row md:justify-between md:items-center md:content-center">
            <div className="text-header font-bold">
                <LinkItem children="Bookies" href="/" src={logo}/>
            </div>
            <div className="flex flex-row gap-5 text-subheader md:order-2">
                <LinkItem icon="fa-brands fa-facebook" href="#"/>
                <LinkItem icon="fa-brands fa-twitter" href="#"/>
                <LinkItem icon="fa-brands fa-linkedin" href="#"/>
            </div>
            <div className="text-body font-normal md:order-1">
                &copy; Copyright <strong><span>Bookie</span></strong>. All Rights Reserved
            </div>
        </footer>
    )
})

export default Footer