import {useState} from 'react';
import {useBooking} from '~/contexts/BookingContext';
import {MenuItemCard} from './MenuItemCard';

/**
 * Step 2: Menu Customization
 * Tabs for different menu categories with items and quantity selectors
 */
export function MenuStep() {
  const {menuSelections, nextStep} = useBooking();
  const [activeTab, setActiveTab] = useState('starters');

  // Sample menu data - replace with actual data from your CMS or API
  const menuCategories = {
    starters: {
      name: 'STARTERS & SNACKS',
      description: '20 pieces/servings per order',
      items: [
        {
          id: 'chicken-potstickers',
          title: 'CHICKEN POTSTICKERS',
          description:
            'Asian-glazed chicken and vegetable potstickers on a bed of shredded cabbage with green onions',
          image: '/images/menu/chicken-potstickers.jpg',
          category: 'starters',
          price: 0, // Add pricing if needed
        },
        {
          id: 'mozzarella-sticks',
          title: 'MOZZARELLA STICKS',
          description: 'Crispy mozzarella sticks served with marinara sauce',
          image: '/images/menu/mozzarella-sticks.jpg',
          category: 'starters',
          price: 0,
        },
        {
          id: 'nachos',
          title: 'NACHOS',
          description: 'Loaded nachos with cheese, jalapeños, and sour cream',
          image: '/images/menu/nachos.jpg',
          category: 'starters',
          price: 0,
        },
      ],
    },
    wings: {
      name: 'WINGS',
      description:
        '20 pieces/servings per order. Served with carrots, celery and your choice of ranch or blue cheese dressing',
      items: [
        {
          id: 'wings-nashville-hot',
          title: 'NASHVILLE HOT',
          description: 'Hot and tangy Nashville kick',
          image: '/images/menu/wings-nashville.jpg',
          category: 'wings',
          price: 0,
        },
        {
          id: 'wings-buffalo',
          title: 'BUFFALO',
          description: 'Our original buffalo sauce',
          image: '/images/menu/wings-buffalo.jpg',
          category: 'wings',
          price: 0,
        },
        {
          id: 'wings-korean-bbq',
          title: 'KOREAN BBQ',
          description: 'Korean-style sauce',
          image: '/images/menu/wings-korean.jpg',
          category: 'wings',
          price: 0,
        },
        {
          id: 'wings-honey-bbq',
          title: 'HONEY BBQ',
          description: "Tom's sweet & smoky honey BBQ",
          image: '/images/menu/wings-honey-bbq.jpg',
          category: 'wings',
          price: 0,
        },
        {
          id: 'wings-jamaican-jerk',
          title: 'JAMAICAN JERK',
          description: 'Authentic island-style sauce',
          image: '/images/menu/wings-jamaican.jpg',
          category: 'wings',
          price: 0,
        },
      ],
    },
    greens: {
      name: 'GREENS',
      description: 'Fresh salads and greens',
      items: [
        {
          id: 'caesar-salad',
          title: 'CAESAR SALAD',
          description: 'Classic Caesar salad with romaine lettuce and parmesan',
          image: '/images/menu/caesar-salad.jpg',
          category: 'greens',
          price: 0,
        },
        {
          id: 'house-salad',
          title: 'HOUSE SALAD',
          description: 'Mixed greens with tomatoes, cucumbers, and house dressing',
          image: '/images/menu/house-salad.jpg',
          category: 'greens',
          price: 0,
        },
      ],
    },
    entrees: {
      name: 'ENTRÉES',
      description: 'Main course options',
      items: [
        {
          id: 'burger-classic',
          title: 'CLASSIC BURGER',
          description: 'Juicy beef burger with lettuce, tomato, and special sauce',
          image: '/images/menu/burger-classic.jpg',
          category: 'entrees',
          price: 0,
        },
        {
          id: 'chicken-sandwich',
          title: 'CHICKEN SANDWICH',
          description: 'Crispy chicken sandwich with pickles and mayo',
          image: '/images/menu/chicken-sandwich.jpg',
          category: 'entrees',
          price: 0,
        },
      ],
    },
    sliders: {
      name: 'SLIDERS',
      description: 'Mini burgers and sliders',
      items: [
        {
          id: 'slider-beef',
          title: 'BEEF SLIDER',
          description: 'Mini beef burger slider',
          image: '/images/menu/slider-beef.jpg',
          category: 'sliders',
          price: 0,
        },
        {
          id: 'slider-chicken',
          title: 'CHICKEN SLIDER',
          description: 'Mini chicken slider',
          image: '/images/menu/slider-chicken.jpg',
          category: 'sliders',
          price: 0,
        },
      ],
    },
    desserts: {
      name: 'DESSERTS',
      description: 'Sweet treats to end your meal',
      items: [
        {
          id: 'chocolate-cake',
          title: 'CHOCOLATE CAKE',
          description: 'Rich chocolate layer cake',
          image: '/images/menu/chocolate-cake.jpg',
          category: 'desserts',
          price: 0,
        },
        {
          id: 'cheesecake',
          title: 'CHEESECAKE',
          description: 'New York style cheesecake',
          image: '/images/menu/cheesecake.jpg',
          category: 'desserts',
          price: 0,
        },
      ],
    },
  };

  const tabs = [
    {id: 'starters', label: 'STARTERS & SNACKS'},
    {id: 'wings', label: 'WINGS'},
    {id: 'greens', label: 'GREENS'},
    {id: 'entrees', label: 'ENTRÉES'},
    {id: 'sliders', label: 'SLIDERS'},
    {id: 'desserts', label: 'DESSERTS'},
  ];

  const activeCategory = menuCategories[activeTab];

  return (
    <div className="menu-step">
      <h2>MENU CUSTOMIZATION</h2>
      <p>Customize your menu by choosing the items and quantities you'd like below.</p>

      <div className="menu-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`menu-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeCategory && (
        <div className="menu-category">
          <h3>{activeCategory.name}</h3>
          {activeCategory.description && (
            <p className="category-description">{activeCategory.description}</p>
          )}
          <div className="menu-items-grid">
            {activeCategory.items.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* Next Button */}
      <div className="mt-8">
        <button
          type="button"
          onClick={nextStep}
          className="w-full px-6 py-3 text-white bg-primary rounded-md hover:bg-primary-hover transition-colors font-medium text-lg"
        >
          Next: Beverage Packages
        </button>
      </div>
    </div>
  );
}

