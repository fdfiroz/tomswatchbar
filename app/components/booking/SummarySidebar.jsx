import {useState} from 'react';
import {useBooking} from '~/contexts/BookingContext';

/**
 * Reservation Summary Sidebar
 * Shows live preview of all selections across all steps
 */
export function SummarySidebar() {
  const {currentStep, eventInfo, menuSelections, beveragePackage, nextStep, prevStep} = useBooking();
  const [expandedSections, setExpandedSections] = useState({
    eventInfo: true,
    menu: true,
    beverage: true,
    checkout: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Location display mapping
  const locationLabels = {
    'lucky-strike-denver': {
      name: 'Lucky Strike Denver',
      address: '500 16th Street Mall #340',
      city: 'Denver, CO 80202',
      phone: '303-629-9090',
    },
    'denver-coors-field': {
      name: 'Denver Coors Field',
      address: '1601 19th Street Unit 101',
      city: 'Denver, CO 80202',
      phone: '303-872-7557',
    },
    'tom-watch-bar': {
      name: "Tom's Watch Bar",
      address: '123 Main Street',
      city: 'Denver, CO 80202',
      phone: '303-555-1234',
    },
  };

  const eventTypeLabels = {
    corporate: 'Corporate Event',
    birthday: 'Birthday Party',
    wedding: 'Wedding Reception',
    private: 'Private Party',
    other: 'Other',
  };

  const location = locationLabels[eventInfo.location] || null;
  const eventTypeLabel = eventTypeLabels[eventInfo.eventType] || eventInfo.eventType;

  // Format date
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // Format time
  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'pm' : 'am';
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${displayHour}:${minutes}${period}`;
  };

  // Group menu selections by category
  const menuByCategory = menuSelections.reduce((acc, item) => {
    const category = item.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  const categoryLabels = {
    starters: 'Starters & Snacks',
    wings: 'Wings',
    greens: 'Greens',
    entrees: 'Entrées',
    sliders: 'Sliders',
    desserts: 'Desserts',
  };

  return (
    <div className="summary-sidebar p-5 border border-gray-300 rounded-lg bg-gray-50">
      {/* Progress Indicator */}
      <div className="progress-indicator mb-6">
        <div className="progress-steps flex justify-between mb-2">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step < currentStep
                  ? 'bg-green-500 text-white'
                  : step === currentStep
                    ? 'bg-primary text-white'
                    : 'bg-gray-300 text-gray-600'
              }`}
            >
              {step < currentStep ? '✓' : step}
            </div>
          ))}
        </div>
        <div className="progress-label text-sm font-medium text-gray-700">
          Step {currentStep}:{' '}
          {currentStep === 1 && 'Book an Event'}
          {currentStep === 2 && 'Menu Customization'}
          {currentStep === 3 && 'Beverage Packages'}
          {currentStep === 4 && 'Checkout'}
        </div>
      </div>

      <h3 className="text-xl font-bold mb-4">Reservation Summary</h3>

      {/* Event Info Section */}
      <div className="summary-section mb-4 border-b border-gray-200 pb-4">
        <button
          type="button"
          className="summary-section-header w-full flex justify-between items-center text-left font-semibold text-gray-900 hover:text-primary transition-colors"
          onClick={() => toggleSection('eventInfo')}
        >
          <span>Event Info</span>
          <span className="text-xl">{expandedSections.eventInfo ? '−' : '+'}</span>
        </button>
        {expandedSections.eventInfo && (
          <div className="summary-section-content mt-3 space-y-3">
            {location && (
              <div className="summary-item space-y-1">
                <strong className="block text-xs font-semibold text-gray-700 uppercase">LOCATION:</strong>
                <div className="text-gray-900">{location.name}</div>
                <div className="text-gray-600 text-sm">{location.address}</div>
                <div className="text-gray-600 text-sm">{location.city}</div>
                <div>
                  <a href={`tel:${location.phone}`} className="text-primary hover:underline text-sm">
                    {location.phone}
                  </a>
                </div>
              </div>
            )}
            {eventInfo.date && (
              <div className="summary-item space-y-1">
                <strong className="block text-xs font-semibold text-gray-700 uppercase">DATE:</strong>
                <div className="text-gray-900">{formatDate(eventInfo.date)}</div>
                {eventInfo.time && <div className="text-gray-600 text-sm">{formatTime(eventInfo.time)}</div>}
              </div>
            )}
            {eventInfo.eventType && (
              <div className="summary-item space-y-1">
                <strong className="block text-xs font-semibold text-gray-700 uppercase">YOUR PARTY:</strong>
                <div className="text-gray-900">{eventTypeLabel}</div>
                {eventInfo.guests > 0 && (
                  <div className="text-gray-600 text-sm">{eventInfo.guests} Guests</div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Menu Customization Section */}
      <div className="summary-section mb-4 border-b border-gray-200 pb-4">
        <button
          type="button"
          className="summary-section-header w-full flex justify-between items-center text-left font-semibold text-gray-900 hover:text-primary transition-colors"
          onClick={() => toggleSection('menu')}
        >
          <span>Menu Customization</span>
          <span className="text-xl">{expandedSections.menu ? '−' : '+'}</span>
        </button>
        {expandedSections.menu && (
          <div className="summary-section-content mt-3 space-y-3">
            {menuSelections.length === 0 ? (
              <div className="summary-item text-gray-500 text-sm">No items selected</div>
            ) : (
              Object.entries(menuByCategory).map(([category, items]) => (
                <div key={category} className="summary-item space-y-1">
                  <strong className="block text-xs font-semibold text-gray-700 uppercase">
                    {categoryLabels[category] || category}:
                  </strong>
                  {items.map((item) => (
                    <div key={item.id} className="text-gray-900 text-sm">
                      ({item.quantity}) {item.title}
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Beverage Package Section */}
      <div className="summary-section mb-4 border-b border-gray-200 pb-4">
        <button
          type="button"
          className="summary-section-header w-full flex justify-between items-center text-left font-semibold text-gray-900 hover:text-primary transition-colors"
          onClick={() => toggleSection('beverage')}
        >
          <span>BEVERAGE PACKAGE</span>
          <span className="text-xl">{expandedSections.beverage ? '−' : '+'}</span>
        </button>
        {expandedSections.beverage && (
          <div className="summary-section-content mt-3">
            {beveragePackage.name ? (
              <div className="summary-item">
                <div className="text-gray-900 text-sm">
                  {beveragePackage.name} - {beveragePackage.hours} hours
                </div>
              </div>
            ) : (
              <div className="summary-item text-gray-500 text-sm">Unselected</div>
            )}
          </div>
        )}
      </div>

      {/* Checkout Section */}
      <div className="summary-section mb-4 border-b border-gray-200 pb-4">
        <button
          type="button"
          className="summary-section-header w-full flex justify-between items-center text-left font-semibold text-gray-900 hover:text-primary transition-colors"
          onClick={() => toggleSection('checkout')}
        >
          <span>Checkout</span>
          <span className="text-xl">{expandedSections.checkout ? '−' : '+'}</span>
        </button>
        {expandedSections.checkout && (
          <div className="summary-section-content mt-3">
            <div className="summary-item text-gray-500 text-sm">Ready to checkout</div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="summary-navigation flex gap-3 mt-6">
        {currentStep > 1 && (
          <button
            type="button"
            className="back-button flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-medium"
            onClick={prevStep}
          >
            &lt; Back
          </button>
        )}
        {currentStep < 4 && (
          <button
            type="button"
            className={`next-button px-4 py-2 text-white bg-primary rounded-md hover:bg-primary-hover transition-colors font-medium ${
              currentStep === 1 ? 'w-full' : 'flex-1'
            }`}
            onClick={nextStep}
          >
            {currentStep === 1 && 'Next: Menu Customization'}
            {currentStep === 2 && 'Next: Beverage Packages'}
            {currentStep === 3 && 'Next: Checkout'}
          </button>
        )}
      </div>

      <div className="summary-footer mt-6 text-center">
        <a href="/contact" className="text-sm text-gray-600 hover:text-primary hover:underline">
          Need assistance? Contact Us
        </a>
      </div>
    </div>
  );
}

