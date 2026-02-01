/* ================= COMMON ================= */
let allCustomerData = JSON.parse(localStorage.getItem("allCustomerData")) || [];

/* ================= ADD CUSTOMER PAGE ================= */
const customerData = document.querySelector(".add_customer");

if (customerData) {
  const allInput = customerData.querySelectorAll("input");

  customerData.addEventListener("submit", (e) => {
    e.preventDefault();

    allCustomerData.push({
      name: allInput[0].value,
      email: allInput[1].value,
      number: allInput[2].value,
      address: allInput[3].value,
      // faltudimag
      date: allInput[4].value,
      country: allInput[5].value,
      state: allInput[6].value
    });

    localStorage.setItem("allCustomerData", JSON.stringify(allCustomerData));

    swal("Data inserted", "Successfully", "success");
    customerData.reset();
  });
}

/* ================= CUSTOMER LIST PAGE ================= */
const customerList = document.querySelector(".customer-list");

if (customerList) {
  const renderCustomers = () => {
    customerList.innerHTML = "";

    allCustomerData.forEach((data, index) => {
      customerList.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${data.name}</td>
          <td>${data.email}</td>
          <td>${data.number}</td>
          <td>${data.address}</td>
          <td>
            <button onclick="customerDetail(${index})" class="btn0">view</button>
            <button onclick="editCustomer(${index})" class="btn1">Edit</button>
            <button onclick="deleteCustomer(${index})" class="btn2">Delete</button>
          </td>
        </tr>
      `;
    });
  };

  renderCustomers();
}

/* ================= DELETE ================= */
function deleteCustomer(index) {
  swal({
    title: "Are you sure?",
    text: "Once deleted, data cannot be recovered!",
    icon: "warning",
    buttons: true,
    dangerMode: true
  }).then((willDelete) => {
    if (willDelete) {
      allCustomerData.splice(index, 1);
      localStorage.setItem("allCustomerData", JSON.stringify(allCustomerData));
      location.reload();
    }
  });
}

/* ================= EDIT REDIRECT ================= */
function editCustomer(index) {
  window.location.href = `edite_customer.html?index=${index}`;
}

/* ================= EDIT PAGE ================= */
const editForm = document.querySelector(".edite_customer");

if (editForm) {
  const params = new URLSearchParams(window.location.search);
  const index = params.get("index");

  if (index === null || !allCustomerData[index]) {
    alert("No customer found");
  } else {
    const inputs = editForm.querySelectorAll("input");
    const data = allCustomerData[index];

    inputs[0].value = data.name;
    inputs[1].value = data.email;
    inputs[2].value = data.number;
    inputs[3].value = data.address;

    editForm.addEventListener("submit", (e) => {
      e.preventDefault();

      allCustomerData[index] = {
        name: inputs[0].value,
        email: inputs[1].value,
        number: inputs[2].value,
        address: inputs[3].value
      };

      localStorage.setItem("allCustomerData", JSON.stringify(allCustomerData));
      swal("Updated", "Customer updated successfully", "success")
        .then(() => {
          window.location.href = "customers.html";
        });
    });
  }
}

/* ================= CUSTOMER DETAIL REDIRECT ================= */
function customerDetail(index) {
  window.location.href = `customer_detail.html?index=${index}`;
}
/* ================= CUSTOMER DETAIL PAGE ================= */
const customerDetails = document.querySelector(".customer_detail");

if (customerDetails) {
  const params = new URLSearchParams(window.location.search);
  const index = params.get("index");
  let allCustomerData = JSON.parse(localStorage.getItem("allCustomerData")) || [];

  if(index === null || ! allCustomerData[index]){
    alert("No Customer Data Found");
  }
  const data = allCustomerData[index];

  document.getElementById("name").innerText = data.name;
  document.getElementById("email").innerText = data.email;
  document.getElementById("number").innerText = data.number;
  document.getElementById("address").innerText = data.address;
  // faltudimag
  document.getElementById("date").innerText = data.date;
  document.getElementById("country").innerText = data.country;
  document.getElementById("state").innerText = data.state;


}  
