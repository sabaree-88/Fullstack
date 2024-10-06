import React, { useEffect, useState } from "react";
import Layout from "../../AssetCopm/AdminLayout/Layout";
import { Link } from "react-router-dom";
import Spinner from "../../AssetCopm/utils/Spinner";
import { useUser } from "../../../context/UserContext";
import { useAuth } from "../../../context/AuthContext";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../AssetCopm/utils/Pagination";
import SearchBox from "../../AssetCopm/utils/SearchBox";
import { Table } from "../../AssetCopm/utils/skeleton/AllSkeleton";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();
  const { users, loading, getUsers, searchUsers } = useUser();
  const {
    currentPage,
    totalPages,
    totalEntries,
    itemsPerPage,
    startEntry,
    endEntry,
    handlePageChange,
    setTotalPages,
    setTotalEntries,
  } = usePagination(1, 5);

  useEffect(() => {
    const fetchData = async () => {
      const { totalPages, totalEntries } = await getUsers(
        currentPage,
        itemsPerPage
      );
      await new Promise((resolve) => setTimeout(resolve, 8000));
      setTotalPages(totalPages);
      setTotalEntries(totalEntries);
    };
    fetchData();
  }, [user, currentPage]);

  const handleSearch = async (e) => {
    e.preventDefault();
    searchUsers(searchQuery);
  };

  return (
    <Layout>
      {loading ? (
        <Table />
      ) : (
        <div className="p-6">
          <SearchBox
            handleSearch={handleSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Profile
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((item) => (
                  <tr
                    key={item._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item?.name}
                    </th>
                    <td>
                      <a
                        href={`http://localhost:3000/${item?.profileImage}`}
                        target="blank"
                        className="flex justify-center align-middle"
                      >
                        <svg
                          fill="#000000"
                          className="h-6 w-6"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 463 463"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          enableBackground="new 0 0 463 463"
                        >
                          <g>
                            <path d="..." />
                          </g>
                        </svg>
                      </a>
                    </td>
                    <td className="px-6 py-4">{item?.role}</td>
                    <td className="px-6 py-4">{item?.email}</td>
                    <td className="px-6 py-4">{item?.phoneNumber || "null"}</td>
                    <td className="px-6 py-4 text-start">
                      <Link
                        to={`/update-user/${item?._id}`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            startEntry={startEntry}
            endEntry={endEntry}
            totalEntries={totalEntries}
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </Layout>
  );
};

export default Users;
