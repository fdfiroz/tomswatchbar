import {useBooking} from '~/contexts/BookingContext';

/**
 * Step 1: Event Info Preview Component
 * Shows a live preview of selected event information
 */
export function EventInfoPreview() {
  const {eventInfo} = useBooking();

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

  return (
    <div className="event-info-preview p-5 bg-gray-50 rounded-lg">
      <div className="preview-section space-y-4">
        <h4 className="text-lg font-semibold mb-3">Event Info Preview</h4>
        
        {location && (
          <div className="preview-item space-y-1">
            <strong className="block text-sm font-semibold text-gray-700">LOCATION:</strong>
            <div className="text-gray-900">{location.name}</div>
            <div className="text-gray-600">{location.address}</div>
            <div className="text-gray-600">{location.city}</div>
            <div>
              <a href={`tel:${location.phone}`} className="text-primary hover:underline">
                {location.phone}
              </a>
            </div>
          </div>
        )}

        {eventInfo.eventType && (
          <div className="preview-item space-y-1">
            <strong className="block text-sm font-semibold text-gray-700">EVENT TYPE:</strong>
            <div className="text-gray-900">{eventTypeLabel}</div>
          </div>
        )}

        {eventInfo.date && (
          <div className="preview-item space-y-1">
            <strong className="block text-sm font-semibold text-gray-700">DATE:</strong>
            <div className="text-gray-900">{formatDate(eventInfo.date)}</div>
          </div>
        )}

        {eventInfo.time && (
          <div className="preview-item space-y-1">
            <strong className="block text-sm font-semibold text-gray-700">TIME:</strong>
            <div className="text-gray-900">{formatTime(eventInfo.time)}</div>
          </div>
        )}

        {eventInfo.guests > 0 && (
          <div className="preview-item space-y-1">
            <strong className="block text-sm font-semibold text-gray-700">GUESTS:</strong>
            <div className="text-gray-900">
              {eventInfo.guests} {eventInfo.guests === 1 ? 'Guest' : 'Guests'}
            </div>
          </div>
        )}

        {eventInfo.email && (
          <div className="preview-item space-y-1">
            <strong className="block text-sm font-semibold text-gray-700">EMAIL:</strong>
            <div className="text-gray-900">{eventInfo.email}</div>
          </div>
        )}
      </div>
    </div>
  );
}

