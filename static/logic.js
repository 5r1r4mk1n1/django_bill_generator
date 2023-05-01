

function calculateTotal() {
  let total = 0;
  let table = document.getElementById("tablebody");

  // Loop through each row in the table
  for (let i = 0; i < table.rows.length; i++) {
    // Get the value from the last column of the current row
    let cell = table.rows[i].cells[table.rows[i].cells.length - 1]; // Assuming the last column contains the values to be summed up
    let value = parseFloat(cell.textContent);

    // Add the value to the running total
    total += value;
  }

  return total;
}

 // serial number
function addRow() {
  let amount = document.getElementById("Amount").value;
  if(!Number.isInteger(Number(amount))){
    alert('Please enter an integer for the amount!');}
  else{
  $.ajax({
    url: '/get_no_entries',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      let cnt = data.count;
      let date = data.date;
      let table = document.getElementById("tablebody");

  // Create row element
  let row = document.createElement("tr")

  // get the values entered in the form

  let consignee = document.getElementById("Consignee").value;
  let weight = document.getElementById("Weight").value;
  let amount = document.getElementById("Amount").value;
  let dest = document.getElementById("Dest").value;

  let myArray=[];
  myArray.push(cnt+1)
  myArray.push(date)
  myArray.push(consignee)
  myArray.push(dest)
  myArray.push(weight)
  myArray.push(amount)


  // Create cells
  let c1 = document.createElement("td")
  c1.contentEditable = true;
  c1.innerHTML = cnt+1;
  let c2 = document.createElement("td")
  c2.contentEditable = true;
  c2.innerHTML = date;
  let c3 = document.createElement("td")
  c3.contentEditable = true;
  c3.innerHTML = consignee;
  let c4 = document.createElement("td")
  c4.contentEditable = true;
  c4.innerHTML = dest;
  let c5 = document.createElement("td")
  c5.contentEditable = true;
  c5.innerHTML = weight;
  let c6 = document.createElement("td")
  c6.contentEditable = true;
  c6.innerHTML = amount;

  // Append cells to row
  row.appendChild(c1);
  row.appendChild(c2);
  row.appendChild(c3);
  row.appendChild(c4);
  row.appendChild(c5);
  row.appendChild(c6);

  // Append row to table body
  table.appendChild(row)

  // Call the calculateTotal() function to get the total amount
  let totalAmount = calculateTotal();

  // Update the text content of the last td element with the total amount
  document.getElementById("total-amount").textContent = totalAmount;
  
var csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
  $.ajax({
    url: '/add-item',
    type: 'POST',
    data: {
      'my_array': JSON.stringify(myArray),
      'total' : JSON.stringify(totalAmount),
      'csrfmiddlewaretoken': csrfToken,
    },
    success: function(response) {
      console.log(response);
    }
  });

    }
  });
  // Get the table body element in which you want to add row
}
}



function savechanges() {
  var tableBody = document.getElementById("mytable")
  var rows = tableBody.getElementsByTagName("tr");
  var tableData=[]
  if (rows.length > 0 && rows[0].getElementsByTagName("th").length > 0) {
    var headers = rows[0].getElementsByTagName("th");
    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var rowData = [];
        for (var j = 0; j < cells.length; j++) {
            // Check if the header exists before accessing it
            if (headers[j]) {
                rowData.push(cells[j].textContent);
            }
        }
        tableData.push(rowData);
    }
  }
  
var totalAmount = calculateTotal();
var t = document.getElementById("total-amount")
t.innerHTML=totalAmount
console.log(tableData)
var csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
  $.ajax({
    url: '/savechanges',
    type: 'POST',
    data: {
      'table': JSON.stringify(tableData),
      'total' : JSON.stringify(totalAmount),
      'csrfmiddlewaretoken': csrfToken,
    },
    success: function(response) {
      console.log(response);
    }
  });



}




function deleteRow() {
  var cnt;
  $.ajax({
    url: '/get_no_entries',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      cnt=data.count;
      let elmtTable = document.getElementById("tablebody");
  // rows in the table body 
  let tableRows = elmtTable.getElementsByTagName("tr");
  // number of rows 
  let rowCount = tableRows.length;
  // Delete the last row
  if (rowCount > 0) {
    elmtTable.deleteRow(cnt-1);

  }

  // Call the calculateTotal() function to get the total amount
  let totalAmount = calculateTotal();

  // Update the text content of the last td element with the total amount
  document.getElementById("total-amount").textContent = totalAmount;


var csrfToken = document.getElementsByName("csrfmiddlewaretoken")[0].value;
let rmv=rowCount-1;
  $.ajax({
    url: '/delete-item',
    type: 'POST',
    data: {
      'row': cnt,
      'total': JSON.stringify(totalAmount),
      'csrfmiddlewaretoken': csrfToken,
    },
    success: function(response) {
      console.log(response);
    }
  });
    }
  });
  //the table that should be eliminated
  


}







