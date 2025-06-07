import {Link} from 'react-router-dom'

export default function LinkItem({href="#", children="", icon="", src=""}) {
    return (
            <Link to={href} className="flex flex-row items-center gap-2 border-none">
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
            </Link>
    );
}