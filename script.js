document.addEventListener("DOMContentLoaded", () => {});

// Render Inventory items to DOM
const fetchFunction = () => {
  const tableContent = document.querySelector(".content-table");
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
        <td>${inventory.price}</td>
        <td>${inventory.status}</td>
        <td>${inventory.dueDate}</td>
        <td class='icon'><i class="fa-solid fa-ellipsis-vertical"></i></td>
        `;
        tableContent.appendChild(rows);
      })
    );
};
fetchFunction();

const btnAdd = document.querySelector(".add-new");
btnAdd.addEventListener("click", () => {
  console.log("Add new Inventory btn");
  addnewInventory();
});

const addnewInventory = () => {
  const addInventory = document.querySelector(".add-inventory");
  const card = document.createElement("li");
  card.className = "card";
  card.innerHTML = `
  <input class='inventory-name' type='text' placeholder='Add new inventory name'/>
  <input class='inventory-document' type='text' placeholder='Add new inventory document number'/>
  <input class='inventory-price' type='number' placeholder='Add new inventory price'/>
  <input class='inventory-due-date' type='date' placeholder='Add new inventory due date'/>
  `;
  addInventory.appendChild(card);
};
