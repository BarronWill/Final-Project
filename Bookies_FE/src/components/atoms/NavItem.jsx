import { NavLink } from "react-router-dom";

export default function NavItem({href="#", children="", icon="", src=""}) {
    // console.log("Nav rendered")
    return (
        <NavLink to={href} className={({ isActive }) => `flex flex-row p-2 items-center gap-2 border-none hover:bg-cloud-grey rounded-md  ${isActive ? 'bg-light-blue hover:bg-light-blue' : ''}`}>
            {!children && <>
                {/* Check icon before, if it exists, display it */}
                {icon && <i className={icon}></i>}
                {/* Check src before, if it exists, display it */}
                {src && <img src={src} className="w-9 h-9" alt="img" />}
            </>}
            {children && <>
                {/* Kiểm tra icon trước, nếu có thì hiển thị */}
                {icon && <i className={icon}></i>}
                
                {/* Kiểm tra src trước, nếu có thì hiển thị */}
                {src && <img src={src} className="w-9 h-9" alt="img" />}
                
                {/* Hiển thị tiêu đề nếu có */}
                <span>{children}</span>
            </>}
        </NavLink>
    );
}