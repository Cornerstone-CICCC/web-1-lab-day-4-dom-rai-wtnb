document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#employeeForm");
  const employeeList = document.querySelector("#employeeList");
  const photoInput = document.querySelector("#photo");

  if (!form || !employeeList || !photoInput) {
    return;
  }

  const createTextCell = (text) => {
    const cell = document.createElement("td");
    cell.textContent = text;
    return cell;
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    const firstNameInput = form.elements.firstname;
    const lastNameInput = form.elements.lastname;
    const emailInput = form.elements.email;
    const hireDateInput = form.elements.hire_date;
    const photoFile = photoInput.files[0];

    if (!photoFile) {
      photoInput.focus();
      return;
    }

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const hireDate = hireDateInput.value;

    const row = document.createElement("tr");

    const photoCell = document.createElement("td");
    const previewUrl = URL.createObjectURL(photoFile);
    const photo = document.createElement("img");
    photo.src = previewUrl;
    photo.alt = `${firstName} ${lastName}`.trim() || "Employee photo";
    photo.width = 56;
    photo.height = 56;
    photo.loading = "lazy";
    photo.classList.add("employee-photo");
    photo.dataset.previewUrl = previewUrl;
    photoCell.appendChild(photo);
    row.appendChild(photoCell);

    row.appendChild(createTextCell(firstName));
    row.appendChild(createTextCell(lastName));
    row.appendChild(createTextCell(email));
    row.appendChild(createTextCell(hireDate));

    const actionsCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn", "btn--delete");
    deleteButton.addEventListener("click", () => {
      const confirmed = confirm(
        "Are you sure you want to delete this employee?"
      );
      if (!confirmed) {
        return;
      }

      const urlToRevoke = photo.dataset.previewUrl;
      if (urlToRevoke) {
        URL.revokeObjectURL(urlToRevoke);
      }

      row.remove();
    });

    actionsCell.appendChild(deleteButton);
    row.appendChild(actionsCell);

    employeeList.appendChild(row);

    form.reset();
    photoInput.value = "";
    firstNameInput.focus();
  });
});
