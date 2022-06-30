import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  interface Data {
    id: Number;
    data: String;
  }

  const [datas, setDatas] = useState<Data[]>();
  const [newData, setNewData] = useState("");

  useEffect(() => {
    fetchData();
  }, [newData]);

  const fetchData = async () => {
    const { data } = await axios.get("http://localhost:3001/get");
    setDatas(data);
  };

  const handleInputChange = (e: any) => {
    setNewData(e.target.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const postData = { data: newData };
    await axios
      .post("http://localhost:3001/post", postData)
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });
    fetchData();
    setNewData("");
  };

  const handleDelete = async (e: any, id: Number) => {
    e.preventDefault();
    const deleteData = { id: id };
    await axios
      .delete(`http://localhost:3001/delete/${id}`, { data: deleteData })
      .then((response) => console.log(response))
      .catch((error) => {
        console.log(error);
      });
    window.location.href = "/";
  };

  const dataMap = datas ? (
    datas?.map((data, id) => (
      <div style={{ display: "flex" }}>
        <p>{data.data}</p>{" "}
        <Link to={`/edit/${data.id}`}>
          <button>edit</button>
        </Link>{" "}
        <button onClick={(e) => handleDelete(e, data.id)}>delete</button>
      </div>
    ))
  ) : (
    <>
      <p>LOADING OR NO DATA</p>
    </>
  );
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter new data"
          value={newData}
          onChange={handleInputChange}
        />
        <button>Add new data</button>
      </form>

      <p>DATA: </p>
      {dataMap}
    </div>
  );
}

export default Home;
