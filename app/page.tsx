import Header from './components/Header';
import Footer from './components/Footer';
import Carousel from './components/Carousel';

const images = [
  '/path/to/image1.jpg',
  '/path/to/image2.jpg',
  '/path/to/image3.jpg',
  // Thêm các đường dẫn hình ảnh khác ở đây
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4 text-blue-800">Home Page</h2>
        <Carousel images={['https://picsum.photos/1920/600?random=2','https://picsum.photos/1920/600?random=1','https://picsum.photos/1920/600?random=3','https://picsum.photos/1920/600?random=4','https://picsum.photos/1920/600?random=5','https://picsum.photos/1920/600?random=6','https://picsum.photos/1920/600?random=7','https://picsum.photos/1920/600?random=8']} />
        <p className="text-lg text-gray-700 mt-4">This is the main content of the home page.</p>
      </main>
      <Footer />
    </div>
  );
}
