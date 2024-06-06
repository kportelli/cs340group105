// edit sql so invoices updates when invoicedetails is added
// take value input from invoicedetails and use in update statement to invoices
//this would be a query that runs when submit hits

// add a new invoice when gardener created? or is this happening
// in the invoicedetails query?

//`UPDATE Invoices SET totalCost = totalCost +
//'${data.lineTotal)' WHERE Invoices.invoiceID = '$(data.invoiceID)'`

// new gardener does not create invoice: new invoice created manually via Add Invoice
// invoices needs full gardener id drop down
// invoices does not need Total Cost input as this comes from InvoiceDetails
// implies that InvoiceDetails will need a preexisting Invoice: otherwise prohibit

// either way works re: separating intersection tables or not 

