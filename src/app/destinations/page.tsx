import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DestinationCard from '@/components/DestinationCard';

// Sample destination data - in a real app, this would come from an API
const allDestinations = [
  {
    id: 'paris',
    name: 'Paris, France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000',
    description: 'Experience the magic of the City of Light with its iconic Eiffel Tower, world-class museums, and charming cafes.',
    price: 799,
    rating: 4.8,
  },
  {
    id: 'bali',
    name: 'Bali, Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000',
    description: 'Discover tropical paradise with stunning beaches, lush rice terraces, and vibrant cultural experiences.',
    price: 899,
    rating: 4.7,
  },
  {
    id: 'tokyo',
    name: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000',
    description: 'Explore the perfect blend of traditional culture and ultramodern living in Japan\'s bustling capital.',
    price: 999,
    rating: 4.9,
  },
  {
    id: 'new-york',
    name: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1000',
    description: 'Discover the Big Apple with its iconic skyline, Broadway shows, and diverse neighborhoods.',
    price: 899,
    rating: 4.7,
  },
  {
    id: 'rome',
    name: 'Rome, Italy',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1000',
    description: 'Explore the ancient ruins, Renaissance masterpieces, and enjoy authentic Italian cuisine.',
    price: 849,
    rating: 4.8,
  },
  {
    id: 'santorini',
    name: 'Santorini, Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1000',
    description: 'Experience the breathtaking views of white-washed buildings and blue domes overlooking the Aegean Sea.',
    price: 1199,
    rating: 4.9,
  },
  {
    id: 'dubai',
    name: 'Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000',
    description: 'Discover the city of superlatives with futuristic architecture, luxury shopping, and desert adventures.',
    price: 1099,
    rating: 4.7,
  },
  {
    id: 'sydney',
    name: 'Sydney, Australia',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1000',
    description: 'Explore the stunning harbor, iconic Opera House, and beautiful beaches in this vibrant city.',
    price: 1299,
    rating: 4.8,
  },
  {
    id: 'maldives',
    name: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1000',
    description: 'Relax in overwater bungalows, swim in crystal-clear waters, and enjoy pristine white-sand beaches.',
    price: 1599,
    rating: 4.9,
  },
];

export default function DestinationsPage() {
  return (
    <main>
      <Header language={''} onLanguageChange={function (lang: string): void {
        throw new Error('Function not implemented.');
      } } />
      
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2000"
            alt="Destinations hero image"
            fill
            priority
            className="object-cover brightness-75"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Destinations</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">Discover amazing places around the world with our exclusive travel deals</p>
        </div>
      </section>
      
      {/* Destinations List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex justify-between items-center flex-wrap">
            <h2 className="text-3xl font-bold text-gray-900">All Destinations</h2>
            
            <div className="flex space-x-4 mt-4 md:mt-0">
              <select className="select max-w-xs">
                <option value="">Sort by: Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
              
              <select className="select max-w-xs">
                <option value="">All Regions</option>
                <option value="europe">Europe</option>
                <option value="asia">Asia</option>
                <option value="north-america">North America</option>
                <option value="south-america">South America</option>
                <option value="africa">Africa</option>
                <option value="oceania">Oceania</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allDestinations.map((destination) => (
              <DestinationCard key={destination.id} {...destination} />
            ))}
          </div>
          
          <div className="mt-12 flex justify-center">
            <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary-600 text-sm font-medium text-white hover:bg-primary-700">
                1
              </a>
              <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                2
              </a>
              <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                3
              </a>
              <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </section>
      
      <Footer language={''} />
    </main>
  );
} 