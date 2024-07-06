import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";

const ViewBook = () => {
  const [data, setData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/book/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="bg-gray-800 min-h-[100vh] w-full flex justify-center items-center">
      <div
        key={data._id}
        className="w-6/12 bg-white min-h-[50vh] p-5 rounded shadow-lg"
      >
        <div className="flex justify-end">
          <Link to='/'>
            <FaWindowClose className="text-red-600 text-2xl" />
          </Link>
        </div>
        <h1 className="text-2xl font-bold mb-4">{data.title}</h1>
        <h2 className="text-xl mb-2">{data.author}</h2>
        <h3 className="text-lg">{data.year}</h3>
        {data.imagePath && (
        <img
          src={`http://localhost:3000/${data.imagePath}`}
          alt={data.title}
          className="max-w-40"
        />
      )}
      </div>
    </div>
  );
};

export default ViewBook;
