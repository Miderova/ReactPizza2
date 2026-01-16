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
  }, []);

  if(!pizza){
    return <>'Загрузка...'</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} РУБАСОВ ЭЩКЕРЕЕ</h4>
    </div>
  );
};

export default FullPizza;
