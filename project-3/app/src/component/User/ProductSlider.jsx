import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductSlider = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        return;
      }
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/book", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);
  return (
    <Carousel>
      {data.map((items) => (
        <div key={items._id} className="h-44">
          <img
            src={`http://localhost:3000${items.imagePath}`}
            className="block w-full h-44 object-contain"
            alt={items.title}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ProductSlider;
