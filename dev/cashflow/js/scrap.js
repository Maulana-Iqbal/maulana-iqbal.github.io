document.addEventListener("DOMContentLoaded", () => {
  const sheetUrl =
    "https://docs.google.com/spreadsheets/u/1/d/e/2PACX-1vRMJqejlsW6hp-UajyGwsPJLtEBC8ZsHeBxziAoJgH9m6rva-RkUIVmsB8O2ijMqLhCL2GVlA1IcSVW/pubhtml?gid=793812842&single=true";

  fetch(sheetUrl)
    .then((response) => response.text())
    .then((text) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");

      const table = doc.querySelector("table");
      if (!table) {
        console.error("Table not found!");
        return;
      }

      const rows = table.querySelectorAll("tr");
      const dataContainers = [
        document.querySelector("#data-container1"), // For column A
        document.querySelector("#data-container2"), // For column B
        document.querySelector("#data-container3"), // For column C
        document.querySelector("#data-container4"), // For column D
        document.querySelector("#data-container5"), // For column E
      ];

      // Clear any existing content
      dataContainers.forEach((container) => (container.innerHTML = ""));

      rows.forEach((row, rowIndex) => {
        if (rowIndex === 0) return; // Skip header row

        const cells = row.querySelectorAll("td");

        dataContainers.forEach((container, index) => {
          if (cells[index]) {
            const cellText = cells[index].innerText.trim();
            const h5 = document.createElement("h5");
            h5.textContent = cellText;
            container.appendChild(h5);
          }
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching the sheet:", error);
    });
});
