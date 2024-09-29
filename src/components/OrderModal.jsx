import { forwardRef, useContext } from "react";
import { createPortal } from "react-dom";
import { CartDispatchContext } from "./CartContext.jsx";
import PrimaryButton from "./PrimaryButton.jsx";
import checkIcon from "../assets/images/icon-order-confirmed.svg";

const OrderModal = forwardRef(function OrderModal({ cartItems, totalPrice }, ref) {
  const dispatch = useContext(CartDispatchContext);

  function handleOnStartNewOrder() {
    dispatch({ type: "EMPTY_CART" });
  }

  return createPortal(
    <dialog ref={ref} className="modal">
      <img src={checkIcon} alt="" />
      <header>
        <h2 className="modal__title">Order Confirmed</h2>
        <p>We hope you enjoy your food!</p>
      </header>
      <div className="modal__details">
        <ul>
          {cartItems.map(item => (
            <li key={item.name} className="ordered-item">
              <img src={item.image.thumbnail} alt={`${item.name} served`} width={50} />
              <div>
                <p className="item__name">{item.name}</p>
                <p className="item__quantity-total">
                  <span className="item__quantity">{item.quantity}x </span>
                  <span>@{item.price.toFixed(2)}</span>
                </p>
              </div>
              <p className="item__total">${item.totalPrice.toFixed(2)}</p>
            </li>
          ))}
        </ul>
        <p className="cart-total">
          Order Total <span className="order-total">${totalPrice.toFixed(2)}</span>
        </p>
      </div>
      <form method="dialog">
        <PrimaryButton text="Start New Order" onClick={handleOnStartNewOrder} />
      </form>
    </dialog>,
    document.getElementById("root")
  );
});

export default OrderModal;
