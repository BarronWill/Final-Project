export default function IconAndText({ icon, text }) {
    return (
        <div className="flex flex-row items-center gap-1">
            <i className={icon}></i>
            <p>{text}</p>
        </div>
    );
}