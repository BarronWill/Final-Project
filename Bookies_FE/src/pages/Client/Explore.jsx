import TitleWithCaption from "../../components/atoms/TitleWithCaption";
import Carousel from "../../components/molecules/Carousel";
import Category from '../../components/atoms/Category';
import scrollToTop from "../../utils/scrollToTop";

function Explore() {
    scrollToTop()
    return (
        <>
            <div className="flex flex-col mb-10 md:mb-12">
                <div className="mb-8 mx-4">
                    <TitleWithCaption title="Trending" caption="What's popular right now"/>
                </div>
                <div className="">
                    <Carousel />
                </div>
            </div>

            <div className='flex flex-col mb-10 md:mb-12'>
                <div className="mb-8 mx-4">
                    <TitleWithCaption title="Categories" caption="Explore all 38 categories"/>
                </div>
            
                <div className="flex flex-row flex-wrap gap-2 text-body mx-4">
                    <Category title="Sức khỏe" icon="fa-solid fa-hand-holding-heart" />
                    <Category title="Kinh tế" icon="fa-solid fa-piggy-bank" />
                    <Category title="Phát triển bản thân" icon="fa-solid fa-hand-fist" />
                    <Category title="Lịch sử" icon="fa-solid fa-hourglass-end" />
                    <Category title="Tiền tệ & Đầu tư" icon="fa-solid fa-arrows-spin" />
                    <Category title="Khoa học" icon="fa-solid fa-robot" />
                    <Category title="Kỹ năng giao tiếp" icon="fa-solid fa-comment" />
                    <Category title="Tâm lý" icon="fa-solid fa-head-side-virus" />
                    <Category title="Văn hóa & Xã hội" icon="fa-solid fa-gopuram" />
                    <Category title="Giáo dục" icon="fa-solid fa-school" />
                    <Category title="Chính trị" icon="fa-solid fa-building-columns" />
                    <Category title="Marketing" icon="fa-solid fa-bullhorn" />
                    <Category title="Tín ngưỡng" icon="fa-solid fa-seedling" />
                    <Category title="Hiệu suất" icon="fa-solid fa-gears" />
                    <Category title="Triết học" icon="fa-solid fa-brain" />
                    <Category title="Doanh nghiệp" icon="fa-solid fa-building" />
                    <Category title="Sáng tạo" icon="fa-solid fa-lightbulb" />
                </div>
            </div>
            <div className="flex flex-col mb-10 md:mb-12">
                <div className="mb-8 mx-4">
                    <TitleWithCaption title="Latest books" caption="Titles recently added on Bookies"/>
                </div>
                <div className="">
                    <Carousel />
                </div>
            </div>
            <div className="flex flex-col mb-10 md:mb-12">
                <div className="mb-8 mx-4">
                    <TitleWithCaption title="Latest collections" caption="Collections recently added on Bookies"/>
                </div>
                <div className="">
                    <Carousel />
                </div>
            </div>   
        </>
    )
}

export default Explore