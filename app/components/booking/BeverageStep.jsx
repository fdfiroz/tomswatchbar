import {useBooking} from '~/contexts/BookingContext';

/**
 * Step 3: Beverage Packages
 * Cards for each beverage option with 2-hour and 3-hour pricing
 */
export function BeverageStep() {
  const {beveragePackage, setBeveragePackage, eventInfo, nextStep} = useBooking();

  const beverageOptions = [
    {
      id: 'beer-wine',
      name: 'BEER + WINE OPEN BAR',
      description:
        'Includes draft beers, house wine and non-alcoholic beverages.',
      image: '/images/beverages/beer-wine.jpg',
      prices: {
        twoHours: 35,
        threeHours: 41,
        additionalHour: 11,
      },
    },
    {
      id: 'standard',
      name: 'STANDARD OPEN BAR',
      description:
        'Includes draft beers, seltzers, house wines, standard well liquors and non-alcoholic beverages.',
      details:
        'Standard well brands include: House branded Vodka, Gin, Bourbon, Rum, Tequila, Whiskey.',
      image: '/images/beverages/standard.jpg',
      prices: {
        twoHours: 44,
        threeHours: 51,
        additionalHour: 12,
      },
    },
    {
      id: 'premium',
      name: 'PREMIUM OPEN BAR',
      description:
        'Includes draft beers, seltzers, house cocktails, premium wines, call liquors and non-alcoholic beverages.',
      details:
        "Premium liquor brand examples include: Vodka: Tito's, Grey Goose; Gin: Hendrick's; Rum: Captain Morgan; Tequila: Patron Silver; Whiskey: Woodford; Scotch: Maker's Mark, Jameson.",
      image: '/images/beverages/premium.jpg',
      prices: {
        twoHours: 55,
        threeHours: 65,
        additionalHour: 13,
      },
    },
    {
      id: 'non-alcoholic',
      name: 'NON ALCOHOLIC BEVERAGES ONLY',
      description:
        'Soft Drinks, Lemonade, Juice, Iced/Hot Tea, Iced/Hot Coffee.',
      image: '/images/beverages/non-alcoholic.jpg',
      prices: {
        twoHours: 6,
        threeHours: 9,
        additionalHour: 3,
      },
    },
  ];

  const handleSelect = (option, hours) => {
    setBeveragePackage({
      name: option.name,
      id: option.id,
      hours,
      pricePerPerson: option.prices[hours === 2 ? 'twoHours' : 'threeHours'],
      additionalHourPrice: option.prices.additionalHour,
    });
  };

  return (
    <div className="beverage-step">
      <h2>Beverage Packages</h2>
      <p>Pricing is per person. Select one beverage option below.</p>

      <div className="beverage-packages-grid">
        {beverageOptions.map((option) => (
          <div key={option.id} className="beverage-package-card">
            {option.image && (
              <div className="beverage-package-image">
                <img src={option.image} alt={option.name} />
              </div>
            )}
            <div className="beverage-package-content">
              <h3>{option.name}</h3>
              <p>{option.description}</p>
              {option.details && <p className="package-details">{option.details}</p>}

              <div className="beverage-package-options">
                <button
                  type="button"
                  className={`package-option-button ${
                    beveragePackage.id === option.id &&
                    beveragePackage.hours === 2
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => handleSelect(option, 2)}
                >
                  ${option.prices.twoHours} - 2 hours
                </button>
                <button
                  type="button"
                  className={`package-option-button ${
                    beveragePackage.id === option.id &&
                    beveragePackage.hours === 3
                      ? 'selected'
                      : ''
                  }`}
                  onClick={() => handleSelect(option, 3)}
                >
                  ${option.prices.threeHours} - 3 hours
                </button>
              </div>

              <p className="additional-hour-info">
                ${option.prices.additionalHour} for each additional hour
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Next Button */}
      <div className="mt-8">
        <button
          type="button"
          onClick={nextStep}
          className="w-full px-6 py-3 text-white bg-primary rounded-md hover:bg-primary-hover transition-colors font-medium text-lg"
        >
          Next: Checkout
        </button>
      </div>
    </div>
  );
}

