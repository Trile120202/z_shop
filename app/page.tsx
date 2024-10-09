import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-4 text-blue-800">Home Page</h2>
        <p className="text-lg text-gray-700">This is the main content of the home page.</p>
      </main>
      <Footer />
    </div>
  );
}
