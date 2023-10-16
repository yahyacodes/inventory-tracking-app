document.addEventListener("DOMContentLoaded", () => {});

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
        `;
        tableContent.appendChild(rows);
      })
    );
};
fetchFunction();
