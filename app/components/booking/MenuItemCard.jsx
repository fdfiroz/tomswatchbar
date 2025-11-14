import {useBooking} from '~/contexts/BookingContext';

/**
 * Menu Item Card Component
 * Displays a menu item with image, title, description, and quantity selector
 */
export function MenuItemCard({item}) {
  const {menuSelections, updateMenuSelection} = useBooking();

  const currentQuantity =
    menuSelections.find((sel) => sel.id === item.id)?.quantity || 0;

  const handleQuantityChange = (delta) => {
    const newQuantity = Math.max(0, currentQuantity + delta);
    updateMenuSelection(item.id, newQuantity, {
      title: item.title,
      description: item.description,
      image: item.image,
      category: item.category,
      price: item.price,
    });
  };

  return (
    <div className="menu-item-card">
      {item.image && (
        <div className="menu-item-image">
          <img src={item.image} alt={item.title} />
        </div>
      )}
      <div className="menu-item-content">
        <h4>{item.title}</h4>
        {item.description && <p>{item.description}</p>}
        <div className="menu-item-quantity">
          <button
            type="button"
            className="quantity-button"
            onClick={() => handleQuantityChange(-1)}
            disabled={currentQuantity === 0}
          >
            −
          </button>
          <span className="quantity-value">{currentQuantity}</span>
          <button
            type="button"
            className="quantity-button"
            onClick={() => handleQuantityChange(1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

