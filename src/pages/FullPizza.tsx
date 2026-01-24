import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://692b3a6f7615a15ff24f1374.mockapi.io/items/" + id
        );
        setPizza(data);
      } catch (error) {
        alert("Данная пицца где то, но не тут.. Возвращем обратно?")
        navigate('/')
        
      }
    }
    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <div className="full-pizza">
        <div className="full-pizza__media">
          <img src={pizza.imageUrl} alt={pizza.title} />
        </div>
        <div className="full-pizza__info">
          <h1 className="full-pizza__title">{pizza.title}</h1>
          <div className="full-pizza__price">
            {pizza.price} ₽
            <span> / 30 см</span>
          </div>
          <p className="full-pizza__desc">
            Насыщенный соус, много сыра и хрустящая корочка — классика, которая
            всегда в топе.
          </p>
          <div className="full-pizza__actions">
            <button
              className="button button--outline"
              onClick={() => navigate(-1)}
            >
              Назад
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
