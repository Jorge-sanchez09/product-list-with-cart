import { useContext } from "react";
import { CartContext, CartDispatchContext } from "./CartContext.jsx";
import IconButton from "./IconButton.jsx";
import addIcon from "../assets/images/icon-add-to-cart.svg";

const incrementSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 10 10"
  >
    <path
      fill="#fff"
      d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
    />
  </svg>
);

const decrementSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 10 2"
  >
    <path fill="#fff" d="M0 .375h10v1.25H0V.375Z" />
  </svg>
);

export default function Dessert({ name, category, price, image }) {
  const cartItems = useContext(CartContext);
  const dispatch = useContext(CartDispatchContext);

  const quantityInCart = cartItems.find(item => item.name === name)?.quantity;

  function handleOnAddItem() {
    dispatch({
      type: "ADD_ITEM",
      name,
      price,
      image,
    });
  }
  function handleOnIncrement() {
    dispatch({
      type: "INCREMENT_ITEM",
      name,
    });
  }
  function handleOnDecrement() {
    dispatch({
      type: "DECREMENT_ITEM",
      name,
    });
  }

  return (
    <article className="dessert">
      <header>
        <p className="dessert__category">{category}</p>
        <h2 className="dessert__name">{name}</h2>
        <p className="dessert__price">${price.toFixed(2)}</p>
      </header>
      <div className="dessert__image-container">
        <picture>
          <source srcSet={image.desktop} media="(min-width: 1024px)" />
          <source srcSet={image.tablet} media="(min-width: 768px)" />
          <img
            src={image.mobile}
            className={`dessert__image ${
              quantityInCart > 0 ? "dessert__image--selected" : ""
            }`}
            alt={`${name} served`}
          />
        </picture>
        <div className="dessert__button-container">
          {quantityInCart > 0 ? (
            <div className="dessert__increment-decrement">
              <IconButton
                svg={decrementSVG}
                alt="Decrement quantity"
                onClick={handleOnDecrement}
              />
              {quantityInCart}
              <IconButton
                svg={incrementSVG}
                alt="Increment quantity"
                onClick={handleOnIncrement}
              />
            </div>
          ) : (
            <button onClick={handleOnAddItem} className="dessert__add-button">
              <img src={addIcon} alt="" width={22} height={22} />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
