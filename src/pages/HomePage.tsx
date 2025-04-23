import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Car, ChevronRight, MapPin, Award, ShieldCheck } from 'lucide-react';
import Button from '../components/ui/Button';
import CarCard from '../components/car/CarCard';
import { cars, locations } from '../data/mockData';
import useStore from '../store/useStore';

const HomePage: React.FC = () => {
  const { addToCompare, setSelectedLocation } = useStore();
  
  // Get featured cars (first 3)
  const featuredCars = cars.slice(0, 3);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-900 to-primary-800 py-20 md:py-32">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-2xl">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Discover Luxury Performance Vehicles
            </motion.h1>
            <motion.p 
              className="text-lg text-primary-100 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Experience the thrill of driving premium vehicles with our curated collection of high-performance luxury cars.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/inventory">
                <Button variant="primary" size="lg">
                  Explore Inventory
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-white text-white bg-white/10 hover:bg-white/10">
                Book Test Drive
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Location Selector */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">Our Locations</h2>
            <p className="text-primary-600 max-w-2xl mx-auto">
              Visit one of our luxury dealerships across Europe to experience our premium vehicles in person.
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {locations.map((location) => (
              <motion.div
                key={location.id}
                className="bg-primary-50 rounded-lg p-6 text-center cursor-pointer hover:shadow-md transition-shadow"
                variants={itemVariants}
                onClick={() => setSelectedLocation(location.name)}
              >
                <div className="flex justify-center items-center mb-4">
                  <MapPin size={24} className="text-accent-600" />
                </div>
                <h3 className="text-xl font-semibold text-primary-900 mb-2">{location.name}</h3>
                <p className="text-primary-600 mb-4">{location.country}</p>
                <Link 
                  to={`/inventory/${location.name}`} 
                  className="inline-flex items-center text-accent-600 hover:text-accent-700 font-medium"
                >
                  <span>View Cars</span>
                  <ChevronRight size={16} className="ml-1" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Featured Cars */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold text-primary-900 mb-2">Featured Vehicles</h2>
              <p className="text-primary-600">Explore our handpicked selection of premium vehicles.</p>
            </div>
            <Link to="/inventory" className="hidden sm:flex items-center text-accent-600 hover:text-accent-700 font-medium">
              <span>View All</span>
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredCars.map((car) => (
              <motion.div key={car.id} variants={itemVariants}>
                <CarCard car={car} onAddToCompare={addToCompare} />
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link to="/inventory">
              <Button variant="outline">
                View All Vehicles
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-4">Why Choose AutoPrestige</h2>
            <p className="text-primary-600 max-w-2xl mx-auto">
              We provide an exceptional car buying experience with a focus on premium service and quality vehicles.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-primary-50 p-6 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-accent-100">
                <Car className="text-accent-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-2">Premium Selection</h3>
              <p className="text-primary-600">
                Handpicked inventory of luxury and performance vehicles from top manufacturers around the world.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-primary-50 p-6 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-accent-100">
                <Award className="text-accent-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-2">Expert Service</h3>
              <p className="text-primary-600">
                Our team of automotive specialists provides personalized attention and expert advice.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-primary-50 p-6 rounded-lg text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-accent-100">
                <ShieldCheck className="text-accent-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold text-primary-900 mb-2">Quality Guaranteed</h3>
              <p className="text-primary-600">
                All vehicles undergo rigorous inspection and come with comprehensive warranty options.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-accent-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Car?</h2>
          <p className="text-accent-50 max-w-2xl mx-auto mb-8">
            Browse our extensive inventory or schedule a test drive at one of our locations today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/inventory">
              <Button 
                variant="primary" 
                size="lg"
                className="border-white hover:border-white text-accent-600 hover:bg-white/10  bg-white/10"
              >
                Explore Inventory
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10  bg-white/10"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;