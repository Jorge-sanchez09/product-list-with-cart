import Desserts from "./components/Desserts.jsx";
import Cart from "./components/Cart.jsx";
import CartContextProvider from "./components/CartContext.jsx";
import "./scss/main.scss";

function App() {
  return (
    <CartContextProvider>
      <main>
        <Desserts />
        <Cart />
      </main>
    </CartContextProvider>
  );
}

export default App;
