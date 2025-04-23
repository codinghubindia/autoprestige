import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Car, Filters } from '../types';
import { 
  cars, 
  minYear, 
  maxYear, 
  minPrice, 
  maxPrice 
} from '../data/mockData';

interface CarState {
  cars: Car[];
  filteredCars: Car[];
  compareList: Car[];
  selectedLocation: string;
  filters: Filters;
  sortBy: 'newest' | 'priceAsc' | 'priceDesc' | 'mileageAsc';
  setSelectedLocation: (location: string) => void;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  resetFilters: () => void;
  setSortBy: (sort: 'newest' | 'priceAsc' | 'priceDesc' | 'mileageAsc') => void;
  addToCompare: (car: Car) => void;
  removeFromCompare: (carId: string) => void;
  clearCompare: () => void;
  applyFilters: () => void;
}

const initialFilters: Filters = {
  brands: [],
  fuelTypes: [],
  conditions: [],
  minYear,
  maxYear,
  minPrice,
  maxPrice,
  location: '',
};

const useStore = create<CarState>()(
  persist(
    (set, get) => ({
      cars,
      filteredCars: cars,
      compareList: [],
      selectedLocation: '',
      filters: initialFilters,
      sortBy: 'newest',
      
      setSelectedLocation: (location) => {
        set({ selectedLocation: location });
        set((state) => {
          const newFilters = { ...state.filters, location };
          return { filters: newFilters };
        });
        get().applyFilters();
      },
      
      setFilter: (key, value) => {
        set((state) => ({
          filters: { ...state.filters, [key]: value }
        }));
        get().applyFilters();
      },
      
      resetFilters: () => {
        set((state) => ({ 
          filters: { ...initialFilters, location: state.selectedLocation } 
        }));
        get().applyFilters();
      },
      
      setSortBy: (sortBy) => {
        set({ sortBy });
        get().applyFilters();
      },
      
      addToCompare: (car) => {
        set((state) => {
          // Only allow max 3 cars for comparison
          if (state.compareList.length >= 3) {
            return { compareList: [...state.compareList.slice(1), car] };
          }
          return { compareList: [...state.compareList, car] };
        });
      },
      
      removeFromCompare: (carId) => {
        set((state) => ({
          compareList: state.compareList.filter((car) => car.id !== carId)
        }));
      },
      
      clearCompare: () => set({ compareList: [] }),
      
      applyFilters: () => {
        set((state) => {
          const { filters, sortBy } = state;
          
          // Filter cars
          let filtered = state.cars.filter((car) => {
            // Filter by location if selected
            if (filters.location && car.location !== filters.location) {
              return false;
            }
            
            // Filter by brands
            if (filters.brands.length > 0 && !filters.brands.includes(car.brand)) {
              return false;
            }
            
            // Filter by fuel types
            if (filters.fuelTypes.length > 0 && !filters.fuelTypes.includes(car.fuelType)) {
              return false;
            }
            
            // Filter by conditions
            if (filters.conditions.length > 0 && !filters.conditions.includes(car.condition)) {
              return false;
            }
            
            // Filter by transmission if set
            if (filters.transmission && car.transmission !== filters.transmission) {
              return false;
            }
            
            // Filter by year range
            if (car.year < filters.minYear || car.year > filters.maxYear) {
              return false;
            }
            
            // Filter by price range
            const carPrice = car.discountedPrice || car.price;
            if (carPrice < filters.minPrice || carPrice > filters.maxPrice) {
              return false;
            }
            
            return true;
          });
          
          // Sort filtered cars
          filtered = sortCars(filtered, sortBy);
          
          return { filteredCars: filtered };
        });
      }
    }),
    {
      name: 'car-store',
      partialize: (state) => ({ 
        compareList: state.compareList,
        selectedLocation: state.selectedLocation
      }),
    }
  )
);

// Helper function to sort cars
function sortCars(cars: Car[], sortBy: string): Car[] {
  return [...cars].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      case 'priceAsc':
        return (a.discountedPrice || a.price) - (b.discountedPrice || b.price);
      case 'priceDesc':
        return (b.discountedPrice || b.price) - (a.discountedPrice || a.price);
      case 'mileageAsc':
        return a.mileage - b.mileage;
      default:
        return 0;
    }
  });
}

export default useStore;