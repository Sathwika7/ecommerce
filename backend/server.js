const express = require('express');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 3000; 
const cors = require('cors');
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecommerce"
});

db.connect((err) => {
   if (err) {
      console.error('Error connecting to the database:', err);
      return;
   }
   console.log('Connected to the database');
});


app.post("/registration", (req, res) => {
   console.log("hello");
   const {email, password,username}= req.body;
   db.query(
     "INSERT INTO userdata (username, password, email) VALUES (?, ?, ?)",
     [username, password, email],
     (err, results) => {
       if (err) {
         console.error("Error inserting user details:", err);
         res.status(500).json({ message: "Error inserting user details" });
       } else {
         res.status(201).json({ message: "User registered successfully" });
       }
     }
   );
 });

 app.post("/logindata", (req, res) => {
  const {email, password} = req.body;
  console.log("server side",email,password);
  db.query(
    "SELECT * FROM userdata WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) {
        console.error("Error checking user details:", err);
        res.status(500).json({ message: "Error checking user details" });
      } else {
        console.log(email,password);
        if (results.length > 0) { 
          const user = results[0]; // Assuming the first result contains the user data
          console.log('User data from DB:', user);
          // Send the user data in the response
          res.status(200).json({ user });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      }
    }
  );
});


app.post("/addToCart", (req, res) => {
  const { email, productid } = req.body;
  // Check if a row with the given email and product ID exists
  const checkExistenceSql = "SELECT * FROM usercart WHERE email = ? AND productid = ?";
  db.query(checkExistenceSql, [email, productid], (err, rows) => {
    if (err) {
      console.error("Error checking cart item existence:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (rows.length === 0) {
        // If no rows exist, insert a new record with quantity as 1
        const insertSql = "INSERT INTO usercart (email, productid, quantity) VALUES (?, ?, ?)";
        db.query(insertSql, [email, productid, 1], (insertErr) => {
          if (insertErr) {
            console.error("Error adding item to cart:", insertErr);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            res.status(200).json({ message: "Item added to cart" });
          }
        });
      } else {
        // If a row exists, update the quantity by increasing it by 1
        const existingQuantity = rows[0].quantity;
        const updateSql = "UPDATE usercart SET quantity = ? WHERE email = ? AND productid = ?";
        db.query(updateSql, [existingQuantity + 1, email, productid], (updateErr) => {
          if (updateErr) {
            console.error("Error updating item quantity:", updateErr);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            res.status(200).json({ message: "Item quantity updated in cart" });
          }
        });
      }
    }
  });
});

app.post("/deleteFromCart", (req, res) => {
  const { email, productid } = req.body;
  console.log("server side",email,productid);
  // Check if the product exists in the user's cart.
  const selectSql = "SELECT * FROM usercart WHERE email = ? AND productid = ?";
  db.query(selectSql, [email, productid], (selectErr, selectResult) => {
    if (selectErr) {
      console.error("Error checking if product exists in cart:", selectErr);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (selectResult.length > 0) {
        // Product exists in the cart, so update the quantity.
        const existingQuantity = selectResult[0].quantity;
        if (existingQuantity > 1) {
          // If quantity is greater than 1, decrement it.
          const updateSql = "UPDATE usercart SET quantity = ? WHERE email = ? AND productid = ?";
          db.query(updateSql, [existingQuantity - 1, email, productid], (updateErr) => {
            if (updateErr) {
              console.error("Error updating item quantity:", updateErr);
              res.status(500).json({ error: "Internal Server Error" });
            } else {
              res.status(200).json({ message: "Item quantity decremented in cart" });
            }
          });
        } else {
          // If quantity is 1, delete the row.
          const deleteSql = "DELETE FROM usercart WHERE email = ? AND productid = ?";
          db.query(deleteSql, [email, productid], (deleteErr, deleteResult) => {
            if (deleteErr) {
              console.error("Error deleting cart item:", deleteErr);
              res.status(500).json({ error: "Internal Server Error" });
            } else {
              res.status(200).json({ message: "Cart item deleted successfully" });
            }
          });
        }
      } else {
        // Product does not exist in the cart.
        res.status(404).json({ message: "Item not found in cart" });
      }
    }
  });
});

app.get('/api/productsinfo', (req, res) => {
    const query = 'SELECT * FROM products'; 
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(results);
      }
    });
  });

app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id; // Get the product ID from the URL parameter
    const query = `SELECT * FROM products WHERE id = ?`; 
    db.query(query, [productId], (err, results) => {
       if (err) {
          console.error('Error querying the database:', err);
          res.status(500).json({ error: 'Internal Server Error' });
       } else if (results.length === 0) {
          // Handle the case where the product with the given ID is not found
          res.status(404).json({ error: 'Product not found' });
       } else {
          // Return the product details
          res.json(results[0]);
       }
    });
 });
 
app.get("/cart", (req, res) => {
  console.log("Hello cart!");
  const email = req.query.email; // Use req.query to get query parameters
  const query = `
    SELECT
      p.title,
      p.image,
      p.price,
      u.productid,
      u.quantity
    FROM
      products AS p
    INNER JOIN
      usercart AS u
    ON
      p.id = u.productid
    WHERE
      u.email = ?`;
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      // Return cart details as JSON response
      res.json(results);
      console.log(results);
    }
  });
});


app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
