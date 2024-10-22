import Carousel from '../components/Carousel';
import CategoryHome from '../components/home/CategoryHome';
import SectionProductHome from "@/app/components/home/SectionProductHome";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow container mx-auto px-4 py-8">
                <Carousel
                    images={['https://file.hstatic.net/200000722513/file/banner_web_collection_1920x420_laptop_van_phong.jpg','https://file.hstatic.net/200000722513/file/banner_web_slider_800x400_laptop_gaming_wukong_d33e1e6762764ec799820bfcc5814047.jpg','https://file.hstatic.net/200000722513/file/gearvn_800x400_msi_camp.jpg','https://file.hstatic.net/200000722513/file/800_x_400_x_acer_bts_t10_fund.png','https://file.hstatic.net/200000722513/file/gearvn_800x400_asus_vivobook_gaming.jpg','https://file.hstatic.net/200000722513/file/gearvn-laptop-asus-ai-slider.jpg']}/>
                <CategoryHome />
                <SectionProductHome/>
            </main>
        </div>
    );
}
