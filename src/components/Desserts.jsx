import { useState, useEffect } from "react";
import Dessert from "./Dessert.jsx";

export default function Desserts() {
  const [desserts, setDesserts] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then(res => (res.ok ? Promise.resolve(res) : Promise.reject(res)))
      .then(res => res.json())
      .then(json => setDesserts(json))
      .catch(error => console.log(error));
  }, []);

  return (
    <section className="desserts">
      <h1>Desserts</h1>
      <ul className="desserts-list">
        {desserts.map(dessert => (
          <li key={dessert.name}>
            <Dessert {...dessert} />
          </li>
        ))}
      </ul>
    </section>
  );
}
