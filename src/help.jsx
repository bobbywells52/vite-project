import axios from "axios";
import jsPDFInvoiceTemplate, {OutputType} from "jspdf-invoice-template-nodejs";

const UUID_REGEX = /[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}/g;

export function getListing(id, setData){
    const data = JSON.stringify({
        "id": id
      });
      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://garage-backend.onrender.com/getListing',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setData(JSON.stringify(response.data.result.listing));
      })
      .catch((error) => {
        console.log(error);
      });
    }

export function getID(link){  
const UUID = link.match(UUID_REGEX)?.toLocaleString();
return UUID;
}

export function getName(data){
    const parsedData = JSON.parse(data)
    const name = parsedData.listingTitle;
    return name;
   }

export function getBrand(data){
    const parsedData = JSON.parse(data)
    const brand = parsedData.itemBrand;
    return brand;
   }

export function getPrice(data){
    const parsedData = JSON.parse(data)
    const price = parsedData.sellingPrice;
    return price;
   }

export function generatePDF(invoice){
   jsPDFInvoiceTemplate(invoice);
}

export function createInvoice(name, price, brand){
    var invoice = {
        outputType: OutputType.Save,
        returnJsPDFDocObject: true,
        fileName: `${name} Invoice`,
        orientationLandscape: false,
        compress: true,
        logo: {
            src: "/logo3.png",
            type: 'PNG', 
            width: 33.33, 
            height: 26.66,
            margin: {
                top: 0, 
                left: 0 
            }
        },
        business: {
            name: "Garage Technologies",
            phone: "(201) 293-7164",
            email: "support@withgarage.com",
        },
        contact: {
            label: "Invoice issued for:",
            name: "Client Name",
            phone: "(+355) 069 22 22 222",
            email: "client@website.al",
            otherInfo: "www.website.al",
        },
        invoice: {
            label: "Invoice #: ",
            num: 1,
            invDate: `Invoice Date:${new Date().toLocaleDateString('en-US')}`,
            invGenDate: `Payment Date:${new Date().toLocaleDateString('en-US')}`,
            headerBorder: false,
            tableBodyBorder: false,
            header: [
              {
                title: "#", 
                style: { 
                  width: 10 
                } 
              }, 
              { 
                title: "Truck",
                style: {
                  width: 60
                } 
              }, 
              {title: "Brand"},
              { title: "Price"},
              { title: "Quantity"},
              { title: "Total"}
            ],
            //implement as table in case of multiple purchases
            table: Array.from(Array(1), (item, index)=>([
                index + 1,
                name,
                brand,
                price,
                1,
                price
            ])),
        },
        footer: {
            text: "This is not an official invoice",
        },
        pageEnable: true,
        pageLabel: "Page ",
    };

    return invoice
}
   