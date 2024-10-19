import Header from './components/Header';
import Footer from './components/Footer';
import Carousel from './components/Carousel';
import CategoryHome from './components/home/CategoryHome';
import SectionProductHome from "@/app/components/home/SectionProductHome";


export default function Home() {

    const listSessions = [
        {
            name: "Sản phẩm hot",
            url: ""
        },

        {
            name: "Tin tức n��i bật",
            url: ""
        },

        {
            name: "Sự kiện đang di��n ra",
            url: ""
        },

        {
            name: "Thông tin về chúng tôi",
            url: ""
        },

    ];
    return (
        <div className="flex flex-col min-h-screen">
            {/*<Header />*/}
            <main className="flex-grow container mx-auto px-4 py-8">
                <Carousel
                    images={['https://picsum.photos/1920/600?random=2', 'https://picsum.photos/1920/600?random=1', 'https://picsum.photos/1920/600?random=3', 'https://picsum.photos/1920/600?random=4', 'https://picsum.photos/1920/600?random=5', 'https://picsum.photos/1920/600?random=6', 'https://picsum.photos/1920/600?random=7', 'https://picsum.photos/1920/600?random=8']}/>
                <p className="text-lg text-gray-700 mt-4">This is the main content of the home page.</p>

                <div className={''}>
                    {listSessions.map((session, index) => (
                        <div key={index} className="flex justify-between items-center py-4 border-b border-gray-200">
                            <h3 className="text-xl">{session.name}</h3>
                            <a href={session.url} className="text-blue-600 hover:text-blue-800">Chi tiết</a>
                        </div>
                    ))}
                </div>
                <CategoryHome />
                <SectionProductHome/>


            </main>
            {/*<Footer />*/}
        </div>
    );
}
