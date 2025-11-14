import {createContext, useContext, useState, useCallback} from 'react';

const BookingContext = createContext(null);

/**
 * Booking Context Provider
 * Manages all booking state across the 4-step wizard
 */
export function BookingProvider({children}) {
  const [currentStep, setCurrentStep] = useState(1);
  
  const [eventInfo, setEventInfo] = useState({
    location: '',
    eventType: '',
    date: '',
    time: '',
    email: '',
    guests: 0,
  });

  const [menuSelections, setMenuSelections] = useState([]);

  const [beveragePackage, setBeveragePackage] = useState({
    name: '',
    hours: 0,
    pricePerPerson: 0,
  });

  const updateEventInfo = useCallback((updates) => {
    setEventInfo((prev) => ({...prev, ...updates}));
  }, []);

  const updateMenuSelection = useCallback((itemId, quantity, itemData) => {
    setMenuSelections((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (quantity === 0) {
        return prev.filter((item) => item.id !== itemId);
      }
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? {...item, quantity} : item,
        );
      }
      return [...prev, {...itemData, id: itemId, quantity}];
    });
  }, []);

  const calculateTotalPrice = useCallback(() => {
    const beverageTotal = beveragePackage.pricePerPerson * eventInfo.guests;
    // Add any food item pricing here if needed
    // For now, we'll assume food items are included in the base price
    return beverageTotal;
  }, [beveragePackage, eventInfo.guests]);

  const nextStep = useCallback(() => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((step) => {
    if (step >= 1 && step <= 4) {
      setCurrentStep(step);
    }
  }, []);

  const resetBooking = useCallback(() => {
    setCurrentStep(1);
    setEventInfo({
      location: '',
      eventType: '',
      date: '',
      time: '',
      email: '',
      guests: 0,
    });
    setMenuSelections([]);
    setBeveragePackage({
      name: '',
      hours: 0,
      pricePerPerson: 0,
    });
  }, []);

  const value = {
    currentStep,
    eventInfo,
    menuSelections,
    beveragePackage,
    updateEventInfo,
    updateMenuSelection,
    setBeveragePackage,
    calculateTotalPrice,
    nextStep,
    prevStep,
    goToStep,
    resetBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}

