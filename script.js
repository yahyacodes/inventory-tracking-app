document.addEventListener("DOMContentLoaded", () => {});

// Render Inventory items to DOM
const tableContent = document.querySelector(".content-table");
const updateInvenTable = document.querySelector(".update-inventory");
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

        // Adding event listener to update button
        rows.addEventListener("click", () => {
          tableContent.style.display = "none";
          updateInven(inventory);
        });
      })
    );
};
fetchFunction();

// Updata Functionalicty
const updateInven = (inventory) => {
  const newTable = document.createElement("li");
  newTable.className = "card-update";
  newTable.innerHTML = `
  <input class='update-inventory-name' type='text' placeholder='Update inventory name' value='${inventory.product}'/>
  <input class='update-inventory-price' type='number' placeholder='Update inventory price' value='${inventory.price}'/>
  <select name="Update inventory Status" class="update-inventory-status">
  <option value="Delivered" class='delivery'>Delivered</option>
  <option value="Pending" class='pending'>Pending</option>
</select>
  <br/>
  <button class='update-inventory-btn'>Update</button>
  <button class='delete-inventory-btn'>Delete</button>
  <button class='go-back'>Go back</button>
  `;
  updateInvenTable.appendChild(newTable);

  // Adding event listener to delete button
  const deleteButton = document.querySelector(".delete-inventory-btn");
  deleteButton.addEventListener("click", () => {
    newTable.remove();
    location.reload();
    deleteInventory(inventory.id);
  });

  // Adding event listener to go-back button
  const goBack = document.querySelector(".go-back");
  goBack.addEventListener("click", () => {
    location.reload();
  });

  // Adding event listener to update button
  const updateInvenBtn = document.querySelector(".update-inventory-btn");
  updateInvenBtn.addEventListener("click", () => {
    const updateInvenName = document.querySelector(
      ".update-inventory-name"
    ).value;
    const updateInvenPrice = document.querySelector(
      ".update-inventory-price"
    ).value;
    const updateInvenDoc = inventory.document;
    const updateInvenStatus = document.querySelector(
      ".update-inventory-status"
    ).value;

    // Updating send date dynamically in update
    let updateDate = new Date();
    const updateYear = updateDate.getFullYear();
    const updateMonth = updateDate.getMonth() + 1;
    const updateDay = updateDate.getDate();

    const updateNewDate = `${updateMonth
      .toString()
      .padStart(2, "0")}/${updateDay
      .toString()
      .padStart(2, "0")}/${updateYear}`;

    // Updating + two days ahead due date dynamically in update
    let updateDeliveryDate = new Date();
    const updateFutureDate = new Date(updateDeliveryDate);
    updateFutureDate.setDate(updateDeliveryDate.getDate() + 2);

    const updateDeliveryYear = updateFutureDate.getFullYear();
    const updateDeliveryMonth = updateFutureDate.getMonth() + 1;
    const updateDeliveryDay = updateFutureDate.getDate();

    const updateDeliveryNewDate = `${updateDeliveryMonth
      .toString()
      .padStart(2, "0")}/${updateDeliveryDay
      .toString()
      .padStart(2, "0")}/${updateDeliveryYear}`;

    // Updating new updated data on json
    let updateData = {
      sentDate: updateNewDate,
      document: updateInvenDoc,
      product: updateInvenName,
      price: updateInvenPrice,
      status: updateInvenStatus,
      dueDate: updateDeliveryNewDate,
      id: inventory.id,
    };

    // Sending the updated data to json
    updateInventory(updateData);
    console.log(inventory);
    location.reload();
  });
};

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
  <button class='go-back'>Go back</button>
  `;
  addInventory.appendChild(card);

  // Adding event listener to go-back button
  const goBack = document.querySelector(".go-back");
  goBack.addEventListener("click", () => {
    location.reload();
  });

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

// UPdating data in json
const updateInventory = (inventory) => {
  fetch(`http://localhost:3000/inventory/${inventory.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inventory),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

// Delete inventory from json
const deleteInventory = (id) => {
  fetch(`http://localhost:3000/inventory/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};
