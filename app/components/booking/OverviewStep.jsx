import {useBooking} from '~/contexts/BookingContext';
import {CartForm} from '@shopify/hydrogen';

/**
 * Step 4: Overview and Checkout
 * Shows all selections and handles checkout
 * @param {{product: any; selectedVariant: any}}
 */
export function OverviewStep({product, selectedVariant}) {
  const {eventInfo, menuSelections, beveragePackage, calculateTotalPrice} =
    useBooking();
  const totalPrice = calculateTotalPrice();

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

  if (!selectedVariant) {
    return <div>Product variant not found</div>;
  }

  // Prepare cart line attributes
  const attributes = [
    {key: 'Location', value: eventInfo.location},
    {key: 'Event Type', value: eventInfo.eventType},
    {key: 'Date', value: eventInfo.date},
    {key: 'Time', value: eventInfo.time},
    {key: 'Email', value: eventInfo.email},
    {key: 'Guests', value: eventInfo.guests.toString()},
    {key: 'Menu', value: JSON.stringify(menuSelections)},
    {key: 'Beverage Package', value: JSON.stringify(beveragePackage)},
  ];

  return (
    <div className="overview-step">
      <h2>Review Your Reservation</h2>
      <p>Please review all details before proceeding to checkout.</p>

      <div className="overview-sections">
        {/* Event Info Section */}
        <div className="overview-section">
          <h3>Event Info</h3>
          {location && (
            <div className="overview-item">
              <strong>Location:</strong>
              <div>{location.name}</div>
              <div>{location.address}</div>
              <div>{location.city}</div>
              <div>{location.phone}</div>
            </div>
          )}
          {eventInfo.eventType && (
            <div className="overview-item">
              <strong>Event Type:</strong>
              <div>{eventTypeLabel}</div>
            </div>
          )}
          {eventInfo.date && (
            <div className="overview-item">
              <strong>Date:</strong>
              <div>{formatDate(eventInfo.date)}</div>
            </div>
          )}
          {eventInfo.time && (
            <div className="overview-item">
              <strong>Time:</strong>
              <div>{formatTime(eventInfo.time)}</div>
            </div>
          )}
          {eventInfo.guests > 0 && (
            <div className="overview-item">
              <strong>Guests:</strong>
              <div>{eventInfo.guests}</div>
            </div>
          )}
          {eventInfo.email && (
            <div className="overview-item">
              <strong>Email:</strong>
              <div>{eventInfo.email}</div>
            </div>
          )}
        </div>

        {/* Menu Customization Section */}
        {menuSelections.length > 0 && (
          <div className="overview-section">
            <h3>Menu Customization</h3>
            {Object.entries(menuByCategory).map(([category, items]) => (
              <div key={category} className="overview-item">
                <strong>{category.toUpperCase()}:</strong>
                {items.map((item) => (
                  <div key={item.id}>
                    ({item.quantity}) {item.title}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Beverage Package Section */}
        {beveragePackage.name && (
          <div className="overview-section">
            <h3>Beverage Package</h3>
            <div className="overview-item">
              <strong>Package:</strong>
              <div>{beveragePackage.name}</div>
              <div>{beveragePackage.hours} hours</div>
              <div>
                ${beveragePackage.pricePerPerson} per person
              </div>
            </div>
          </div>
        )}

        {/* Total Price Section */}
        <div className="overview-section total-section">
          <h3>Total Price</h3>
          <div className="total-price">
            <strong>${totalPrice.toFixed(2)}</strong>
            {eventInfo.guests > 0 && (
              <div className="price-breakdown">
                ${beveragePackage.pricePerPerson} × {eventInfo.guests} guests
                = ${totalPrice.toFixed(2)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="checkout-section">
        <CartForm
          route="/cart"
          inputs={{
            lines: [
              {
                merchandiseId: selectedVariant.id,
                quantity: 1,
                attributes: [
                  ...attributes,
                  // Store calculated total price in attributes for server-side processing
                  {key: 'Calculated Total Price', value: totalPrice.toString()},
                ],
              },
            ],
          }}
          action={CartForm.ACTIONS.LinesAdd}
        >
          {(fetcher) => (
            <button
              type="submit"
              className="checkout-button"
              disabled={fetcher.state !== 'idle'}
            >
              {fetcher.state !== 'idle' ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          )}
        </CartForm>
      </div>
    </div>
  );
}

