import {DayPicker} from 'react-day-picker';
import {format} from 'date-fns';
import {useBooking} from '~/contexts/BookingContext';

/**
 * Step 1: Event Info Input Form
 * Collects location, event type, date, time, guests, and email
 */
export function EventInfoInput() {
  const {eventInfo, updateEventInfo, nextStep} = useBooking();

  // Sample locations - replace with actual data
  const locations = [
    {value: 'lucky-strike-denver', label: 'Lucky Strike Denver'},
    {value: 'denver-coors-field', label: 'Denver Coors Field'},
    {value: 'tom-watch-bar', label: "Tom's Watch Bar"},
  ];

  // Sample event types - replace with actual data
  const eventTypes = [
    {value: 'corporate', label: 'Corporate Event'},
    {value: 'birthday', label: 'Birthday Party'},
    {value: 'wedding', label: 'Wedding Reception'},
    {value: 'private', label: 'Private Party'},
    {value: 'other', label: 'Other'},
  ];

  // Generate time slots (30-minute intervals from 9:00 AM to 11:30 PM)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 23; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const period = hour >= 12 ? 'pm' : 'am';
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        const displayMinute = minute === 0 ? '00' : minute.toString();
        slots.push({
          value: `${hour.toString().padStart(2, '0')}:${displayMinute}`,
          label: `${displayHour}:${displayMinute}${period}`,
        });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Convert date string to Date object for DayPicker
  const selectedDateObj = eventInfo.date
    ? new Date(eventInfo.date)
    : undefined;

  // Disable past dates
  const disabledDays = [{before: new Date()}];

  return (
    <div className="event-info-input p-5">
      <h2 className="text-3xl font-bold mb-5">Book an Event</h2>
      <p className="text-gray-600 mb-6">
        Let us handle the details. Click below to speak with an event planner.
      </p>
      
      <div className="form-group mb-6">
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
          Your Location Address*
        </label>
        <div className="location-input-group flex gap-2">
          <select
            id="location"
            value={eventInfo.location}
            onChange={(e) => updateEventInfo({location: e.target.value})}
            required
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select a location</option>
            {locations.map((loc) => (
              <option key={loc.value} value={loc.value}>
                {loc.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Edit
          </button>
        </div>
      </div>

      <div className="form-group mb-6">
        <p className="text-gray-600">
          To speak with an event planner, call us at{' '}
          <a href="tel:303-629-9090" className="text-primary hover:underline font-medium">
            303-629-9090
          </a>
          .
        </p>
      </div>

      <div className="form-group mb-6">
        <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-2">
          What type of an event is this?*
        </label>
        <select
          id="eventType"
          value={eventInfo.eventType}
          onChange={(e) => updateEventInfo({eventType: e.target.value})}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="">Select</option>
          {eventTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What day?*
        </label>
        <div className="calendar-container border border-gray-300 rounded-lg p-4 bg-white">
          <DayPicker
            mode="single"
            selected={selectedDateObj}
            onSelect={(date) => {
              if (date) {
                updateEventInfo({date: format(date, 'yyyy-MM-dd')});
              }
            }}
            disabled={disabledDays}
            className="rdp"
            classNames={{
              months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
              month: 'space-y-4',
              caption: 'flex justify-center pt-1 relative items-center',
              caption_label: 'text-sm font-medium',
              nav: 'space-x-1 flex items-center',
              nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
              nav_button_previous: 'absolute left-1',
              nav_button_next: 'absolute right-1',
              table: 'w-full border-collapse space-y-1',
              head_row: 'flex',
              head_cell: 'text-gray-500 rounded-md w-9 font-normal text-[0.8rem]',
              row: 'flex w-full mt-2',
              cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-gray-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
              day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
              day_selected: 'bg-primary text-white hover:bg-primary hover:text-white focus:bg-primary focus:text-white',
              day_today: 'bg-gray-100 text-gray-900',
              day_outside: 'text-gray-400 opacity-50',
              day_disabled: 'text-gray-400 opacity-50',
              day_range_middle: 'aria-selected:bg-gray-100 aria-selected:text-gray-900',
              day_hidden: 'invisible',
            }}
          />
        </div>
      </div>

      <div className="form-group mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What time?*
        </label>
        <div className="time-slots-grid grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-64 overflow-y-auto p-2">
          {timeSlots.map((slot) => (
            <button
              key={slot.value}
              type="button"
              className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                eventInfo.time === slot.value
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-primary hover:bg-gray-50'
              }`}
              onClick={() => updateEventInfo({time: slot.value})}
            >
              {slot.label}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group mb-6">
        <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
          Number of Guests*
        </label>
        <input
          id="guests"
          type="number"
          min="1"
          value={eventInfo.guests || ''}
          onChange={(e) =>
            updateEventInfo({guests: parseInt(e.target.value, 10) || 0})
          }
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="form-group mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address*
        </label>
        <input
          id="email"
          type="email"
          value={eventInfo.email}
          onChange={(e) => updateEventInfo({email: e.target.value})}
          placeholder="Email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Next Button */}
      <div className="mt-8">
        <button
          type="button"
          onClick={nextStep}
          className="w-full px-6 py-3 text-white bg-primary rounded-md hover:bg-primary-hover transition-colors font-medium text-lg"
        >
          Next: Menu Customization
        </button>
      </div>
    </div>
  );
}


