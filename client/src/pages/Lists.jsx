import React, { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const Lists = () => {
  const [lists, setLists] = useState(null);

  useEffect(() => {
    // send request to server
    // set lists to response.data
    // handle error
    const fetchLists = async () => {
      const response = await axios.get(`${API_URL}/list`);
      setLists(response.data);
      // what is the difference between rec.data and req.body?
      // req.body is the data that is sent to the server
      // res.data is the data that is sent back to the client
    };
    fetchLists().catch(console.error);
  }, []);

  return (
    <>
      <h1>Lists</h1>
      {lists === null ? ( // While data is being fetched
        <p>Loading...</p>
      ) : lists.length > 0 ? ( // If lists array has items
        <ul>
          {lists.map((list) => (
            <li key={list._id}>
              <h2>{list.name}</h2>
            </li>
          ))}
        </ul>
      ) : (
        // If lists array is empty
        <p>No lists available</p>
      )}
    </>
  );
};

export default Lists;
