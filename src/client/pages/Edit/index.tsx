import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Edit() {
  const { id } = useParams();

  const [datas, setDatas] = useState<String>("");
  const [newData, setNewData] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get(`http://localhost:3001/get/${id}`);
    setDatas(data[0].data);
  };

  const handleInputChange = (e: any) => {
    setNewData(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const putData = { data: newData, id: id };
    window.location.href = "/";
    await axios
      .put(`http://localhost:3001/put/${id}`, putData)
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <h1>Edit</h1>
      <p>id: {id}</p>
      <p>Data: {datas}</p>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter to-edit data"
          value={newData}
          onChange={handleInputChange}
          required
        />
        <button>Edit data</button>
      </form>
    </div>
  );
}

export default Edit;
