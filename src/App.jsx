import { useState } from "react";
import './styles.css';
import {getListing, getID, getName, getBrand, getPrice, generatePDF} from "./help";
import { createProps } from "./help";


function App() {
const [data, setData] = useState("");
const [id, setId] = useState("");

const handleChange = (event) => {
  setId(event.target.value);}

const handleSubmit = (event) => {
    event.preventDefault();
    var idToQuery = getID(id)
    getListing(idToQuery, setData); 
};


return (
<div>
  <h1>Enter Listing Link</h1>
  <hr />
  <form onSubmit={handleSubmit}>
    <label htmlFor="name">
      <input
        type="text"
        name="id"
        value={id}
        onChange={handleChange}
        required
      />
    </label>
    <button type="submit">Generate Invoice</button>
    {data? generatePDF(createProps(getName(data), getPrice(data), getBrand(data))): <></>}
  </form>
</div>
);
}

export default App
