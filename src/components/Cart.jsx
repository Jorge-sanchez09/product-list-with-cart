import { useContext, useRef } from "react";
import { CartContext, CartDispatchContext } from "./CartContext.jsx";
import IconButton from "./IconButton.jsx";
import PrimaryButton from "./PrimaryButton.jsx";
import OrderModal from "./OrderModal.jsx";
import carbonNeutralIcon from "../assets/images/icon-carbon-neutral.svg";
import illustrationEmpty from "../assets/images/illustration-empty-cart.svg";

const removeSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 10 10"
  >
    <path
      fill="#CAAFA7"
      d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
    />
  </svg>
);

export default function Cart() {
  const cartItems = useContext(CartContext);
  const dispatch = useContext(CartDispatchContext);

  function handleOnRemoveItem(itemName) {
    dispatch({ type: "REMOVE_ITEM", name: itemName });
  }

  function handleOnConfirm() {
    modalRef.current.showModal();
  }

  let modalRef = useRef(null);
  let cartBody;
  let totalPrice = 0;

  if (cartItems.length > 0) {
    totalPrice = cartItems.reduce(
      (accumulator, current) => accumulator + current.price * current.quantity,
      0
    );
    cartBody = (
      <>
        <ul className="cart__list">
          {cartItems.map(item => (
            <li key={item.name}>
              <div className="item__details">
                <p className="item__name">{item.name}</p>
                <div className="item__numbers">
                  <p className="item__quantity">{item.quantity}x</p>
                  <p>
                    <span className="item__price">@${item.price.toFixed(2)}</span>
                    <span className="item__total">${item.totalPrice.toFixed(2)}</span>
                  </p>
                </div>
              </div>
              <IconButton
                svg={removeSVG}
                alt="Remove item"
                onClick={() => handleOnRemoveItem(item.name)}
              />
            </li>
          ))}
        </ul>
        <footer className="cart__footer">
          <div className="cart__summary">
            <p>Order Total</p>
            <p className="cart__total">${totalPrice.toFixed(2)}</p>
          </div>
          <div>
            <p className="cart__message">
              <img src={carbonNeutralIcon} alt="" />
              <span>
                This is a <b>carbon-neutral</b> delivery
              </span>
            </p>
          </div>
          <PrimaryButton text="Confirm Order" onClick={handleOnConfirm} />
        </footer>
      </>
    );
  } else {
    cartBody = (
      <div className="cart__empty">
        <img src={illustrationEmpty} alt="" width={125} />
        <p>Your added items will appear here</p>
      </div>
    );
  }
  return (
    <section className="cart">
      <h2 className="cart__title">Your Cart ({cartItems.length})</h2>
      {cartBody}
      <OrderModal ref={modalRef} cartItems={cartItems} totalPrice={totalPrice} />
    </section>
  );
}
