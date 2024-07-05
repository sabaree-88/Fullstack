import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegEye, FaRegPlusSquare, FaRegEdit } from "react-icons/fa";
import { IoTrashBinSharp } from "react-icons/io5";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/book")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="bg-slate-800 min-h-[100vh] p-10">
      <div className="add flex justify-end mb-4">
        <Link to={"/add"}>
          <FaRegPlusSquare className="text-green-600 text-3xl" />
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {data.map((item, index) => {
          return (
            <div key={item._id} className="bg-white rounded-md p-3">
              <div className="details border-b-2">
                <div className="top flex justify-between pb-5">
                  <h2>Book Name: {item.title}</h2>
                  <p>Published Year: {item.year}</p>
                </div>
                <div className="bottom pb-2">
                  <h3>Author: {item.author}</h3>
                </div>
              </div>
              <div className="actions flex justify-around p-3">
                <div className="views">
                  <Link to={`/view/${item._id}`}>
                    <FaRegEye className="text-2xl text-green-600" />
                  </Link>
                </div>
                <div className="edit">
                  <Link to={`/edit/${item._id}`}>
                    <FaRegEdit className="text-2xl text-blue-600" />
                  </Link>
                </div>
                <div className="delete">
                  <Link to={`/delete/${item._id}`}>
                    <IoTrashBinSharp className="text-2xl text-red-600" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
