export default function Button({icon="", children="", onClick, color="primary" }) {
    const colorClasses = {
        white: "bg-white border-2 text-dark-blue hover:bg-cloud-grey",
        primary: "bg-none text-dark-blue hover:bg-cloud-grey",
        dark: "bg-black text-white hover:bg-blue",
        stone: "bg-stone-white text-dark-blue hover:bg-cloud-grey",
        red: "bg-red text-stone-white hover:bg-cloud-grey",
    }

    return (
        <button type="button" onClick={onClick} className={`flex flex-row px-4 py-2 leading-none rounded-md items-center gap-2 font-normal ${colorClasses[color] || colorClasses['primary']}`}>
            {icon && children && <>
            <i className={icon}></i>
            <span>{children}</span>
            </>}
            {icon && !children && <i className={icon}></i>}
            {!icon && children && <span>{children}</span>}
        </button>
    );
}