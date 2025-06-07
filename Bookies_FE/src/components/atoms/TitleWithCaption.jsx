export default function TitleWithCaption({title, caption}){
    return (
        <div className="flex flex-col items-start gap-2">
            <h3 className="font-semibold text-subheader leading-none">{title}</h3>
            <h4 className="font-normal leading-none text-body">{caption}</h4>
        </div>
    )
}