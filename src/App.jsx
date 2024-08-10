import { useState } from "react";
import './styles.css';
import {getListing, getID, getName, getBrand, getPrice, generatePDF, createInvoice} from "./help";

function App() {
const [listingData, setListingData] = useState("");
const [listingLink, setListingLink] = useState("");

const handleChange = (event) => {
  setListingLink(event.target.value);}

const handleSubmit = (event) => {
    event.preventDefault();
    var id = getID(listingLink);
    getListing(id, setListingData); 
};

return (
<div>
  <h1>Enter Link to Generate Invoice for Desired Listing</h1>
  <hr />
  <form onSubmit={handleSubmit}>
    <label htmlFor="name">
      <input
        type="text"
        name="id"
        value={listingLink}
        onChange={handleChange}
        required
      />
    </label>
    <button type="submit">Get PDF</button>
    {listingData ? generatePDF(createInvoice(getName(listingData), getPrice(listingData), getBrand(listingData))): <></>}
  </form>
</div>
);
}

export default App
