## Things to note
For reasons beyond your control, running forever is a bit more complex on the school's FLIP server. Here is how to make it easy, run the following command from the root of your project:
```
alias forever='./node_modules/forever/bin/forever'
```
You must run the forever command from the root of your project (where app.js is located). If you don't it will fail.

```
forever start app.js
```
You can verify that your project will run forever (pun sort-of intended), by closing out of your terminal now. Ensure you are still connected to the OSU VPN and navigate to your web application again. If it loads, `forever` is working.

This guidance on implementing `forever` can be used on any Node.JS project, and can be used in any step outlined in this walkthrough.