// edit sql so invoices updates when invoicedetails is added
// take value input from invoicedetails and use in update statement to invoices
//this would be a query that runs when submit hits

// add a new invoice when gardener created? or is this happening
// in the invoicedetails query?

//`UPDATE Invoices SET totalCost = totalCost +
//'${data.lineTotal)' WHERE Invoices.invoiceID = '$(data.invoiceID)'`

///


// invoices get:
// SELECT Invoices.*, IFNULL(SUM(InvoiceDetails.lineTotal), 0) AS totalCost
// FROM Invoices
// LEFT JOIN InvoiceDetails ON Invoices.invoiceID = InvoiceDetails.invoiceID
//GROUP BY Invoices.invoiceID;`;

// invoicedetails post:
//         UPDATE Invoices
// SET totalCost = ( SELECT IFNULL(SUM(lineTotal), 0) FROM InvoiceDetails
    ///WHERE invoiceID = ${data.invoiceID})
    // WHERE invoiceID = ${data.invoiceID};`;
    

// new gardener does not create invoice: new invoice created manually via Add Invoice
// invoices needs full gardener id drop down
// invoices does not need Total Cost input as this comes from InvoiceDetails
// implies that InvoiceDetails will need a preexisting Invoice: otherwise prohibit

// either way works re: separating intersection tables or not 

// todo: 

// database reset button try out 

// InvoiceDetails Invoice dropdown menu needs to dynamically update with current list of Invoices, displaying that Invoice's Gardener first & last name

// should it restrict to one Invoice per Gardener?

// figure out what happens to InvoiceDetails and Invoices when a Gardener is deleted

// 