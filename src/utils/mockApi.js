// Mock API functions for localStorage data persistence
// Simulates async operations with delays

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Sample initial data
const initialGallery = [
  {
    id: 1,
    title: 'Custom Truck Body Fabrication',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400',
    category: 'Fabrication'
  },
  {
    id: 2,
    title: 'Welding Workshop',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400',
    category: 'Workshop'
  },
  {
    id: 3,
    title: 'Finished Truck Delivery',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    category: 'Delivery'
  }
];

const initialServices = [
  {
    id: 1,
    name: 'Custom Truck Manufacturing',
    description: 'Design and build custom truck bodies according to your specifications'
  },
  {
    id: 2,
    name: 'Welding Services',
    description: 'Professional welding services for all types of metal work'
  },
  {
    id: 3,
    name: 'Paint and Finishing',
    description: 'High-quality paint jobs and finishing services'
  }
];

// Initialize localStorage with sample data if empty (runs once on module load)
const initializeData = () => {
  if (!localStorage.getItem('gallery')) {
    localStorage.setItem('gallery', JSON.stringify(initialGallery));
  }
  if (!localStorage.getItem('services')) {
    localStorage.setItem('services', JSON.stringify(initialServices));
  }
};

// Call once on module load instead of on every API call
initializeData();

// Gallery CRUD operations
export const galleryApi = {
  getAll: async () => {
    await delay(500); // Simulate network delay
    const data = JSON.parse(localStorage.getItem('gallery') || '[]');
    return data;
  },

  create: async (item) => {
    await delay(500);
    const data = JSON.parse(localStorage.getItem('gallery') || '[]');
    const newItem = {
      ...item,
      id: Date.now() // Simple ID generation
    };
    data.push(newItem);
    localStorage.setItem('gallery', JSON.stringify(data));
    return newItem;
  },

  update: async (id, item) => {
    await delay(500);
    const data = JSON.parse(localStorage.getItem('gallery') || '[]');
    const index = data.findIndex(g => g.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...item };
      localStorage.setItem('gallery', JSON.stringify(data));
      return data[index];
    }
    throw new Error('Gallery item not found');
  },

  delete: async (id) => {
    await delay(500);
    const data = JSON.parse(localStorage.getItem('gallery') || '[]');
    const filtered = data.filter(g => g.id !== id);
    localStorage.setItem('gallery', JSON.stringify(filtered));
    return true;
  }
};

// Services CRUD operations
export const servicesApi = {
  getAll: async () => {
    await delay(500);
    const data = JSON.parse(localStorage.getItem('services') || '[]');
    return data;
  },

  create: async (item) => {
    await delay(500);
    const data = JSON.parse(localStorage.getItem('services') || '[]');
    const newItem = {
      ...item,
      id: Date.now()
    };
    data.push(newItem);
    localStorage.setItem('services', JSON.stringify(data));
    return newItem;
  },

  update: async (id, item) => {
    await delay(500);
    const data = JSON.parse(localStorage.getItem('services') || '[]');
    const index = data.findIndex(s => s.id === id);
    if (index !== -1) {
      data[index] = { ...data[index], ...item };
      localStorage.setItem('services', JSON.stringify(data));
      return data[index];
    }
    throw new Error('Service not found');
  },

  delete: async (id) => {
    await delay(500);
    const data = JSON.parse(localStorage.getItem('services') || '[]');
    const filtered = data.filter(s => s.id !== id);
    localStorage.setItem('services', JSON.stringify(filtered));
    return true;
  }
};