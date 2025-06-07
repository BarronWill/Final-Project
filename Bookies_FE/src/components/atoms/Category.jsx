import {Link} from 'react-router-dom'

function Category({title="", icon="", color="stone-white", href="#"}) {
    const colorClasses = {
        'none': 'bg-none',
        'stone-white': 'bg-stone-white',
        'light-green': 'bg-light-green'
    }
    return (
        <>
            <Link to={href} className={`flex flex-row items-center gap-2 p-2 rounded-md ${colorClasses[color]} hover:bg-light-blue`}>
                <i className={icon}></i>
                <p>{title}</p>
            </Link>
        </>
    )
}

export default Category