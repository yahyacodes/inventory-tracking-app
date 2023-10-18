document.addEventListener("DOMContentLoaded", () => {});

// Render Inventory items to DOM
const tableContent = document.querySelector(".content-table");
const fetchFunction = () => {
  fetch("http://localhost:3000/inventory")
    .then((res) => res.json())
    .then((data) =>
      data.forEach((inventory) => {
        const rows = document.createElement("tr");
        rows.className = "table-inventory";
        rows.innerHTML = `
        <td>${inventory.sentDate}</td>
        <td>${inventory.document}</td>
        <td>${inventory.product}</td>
        <td>$${inventory.price}</td>
        <td class='status'>${inventory.status}</td>
        <td>${inventory.dueDate}</td>
        <td class='icon'><i class="fa-solid fa-ellipsis-vertical" id='icons'></i></td>
        `;
        tableContent.appendChild(rows);

        rows.addEventListener("click", () => {
          console.log("icons clicked");
        });
      })
    );
};
fetchFunction();

// Add new inventory button functionality
const btnAdd = document.querySelector(".add-new");
btnAdd.addEventListener("click", () => {
  tableContent.style.display = "none";
  console.log("Add new Inventory btn");
  // Rendering adding new inventoy form to DOM
  const addInventory = document.querySelector(".add-inventory");
  const card = document.createElement("li");
  card.className = "card";
  card.innerHTML = `
  <input class='inventory-name' type='text' placeholder='Add new inventory name'/>
  <input class='inventory-price' type='number' placeholder='Add new inventory price'/>
  <select name="Add new inventory Status" class="inventory-status">
  <option value="delivered" class='delivery'>Delivered</option>
  <option value="pending" class='pending'>Pending</option>
</select>
  <br/>
  <button class='add-inventory-btn'>Add</button>
  `;
  addInventory.appendChild(card);

  // Adding event listener to add inventory button
  const addInevenBtn = document.querySelector(".add-inventory-btn");
  addInevenBtn.addEventListener("click", (e) => {
    // Getting the form values
    const inventoryNameVal = document.querySelector(".inventory-name").value;
    const inventoryDocVal = Math.floor(Math.random() * 1000);
    const inventoryPriceVal = document.querySelector(".inventory-price").value;
    const inventoryStatusVal =
      document.querySelector(".inventory-status").value;

    // Creating send date dynamically
    let date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const newDate = `${month.toString().padStart(2, "0")}/${day
      .toString()
      .padStart(2, "0")}/${year}`;

    // Creating + two days ahead due date dynamically
    let deliveryDate = new Date();
    const futureDate = new Date(deliveryDate);
    futureDate.setDate(deliveryDate.getDate() + 2);

    const deliveryYear = futureDate.getFullYear();
    const deliveryMonth = futureDate.getMonth() + 1;
    const deliveryDay = futureDate.getDate();

    const deliveryNewDate = `${deliveryMonth
      .toString()
      .padStart(2, "0")}/${deliveryDay
      .toString()
      .padStart(2, "0")}/${deliveryYear}`;

    // Assigning the new values to data to put in json file
    let newData = {
      sentDate: newDate,
      document: inventoryDocVal,
      product: inventoryNameVal,
      price: inventoryPriceVal,
      status: inventoryStatusVal,
      dueDate: deliveryNewDate,
    };
    e.preventDefault();
    console.log("add inventory to json");
    console.log(newData);
    addnewInventory(newData);
    location.reload();
  });
});

// Adding new inventory to json
const addnewInventory = (newData) => {
  fetch("http://localhost:3000/inventory", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};
