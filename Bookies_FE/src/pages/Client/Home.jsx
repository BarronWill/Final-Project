import TitleWithCaption from "../../components/atoms/TitleWithCaption";
import Carousel from "../../components/molecules/Carousel";
import scrollToTop from "../../utils/scrollToTop";

export default function Home() {
    scrollToTop()
    return (
        <>
            <div className="flex flex-col mb-10 md:mb-12">
                <div className="mb-8 mx-4">
                    <TitleWithCaption title={"Recommended for you"} caption={"Based on your interest"}/>
                </div>
                <div className="">
                    <Carousel />
                </div>
            </div>
            {/* <div className="flex flex-col">
                <div className="mb-8 mx-4">
                    <TitleWithCaption title={"Collections"} caption={"Based on your past preferences"}/>
                </div>
                <div className="">
                    <Carousel />
                </div>
            </div>      */}
        </>   
    );
}