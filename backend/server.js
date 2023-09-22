const express = require('express');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 3000; // Set your desired port
const cors = require('cors');
app.use(cors());
app.use(express.json())
// Create a MySQL database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ecommerce"
});

// Connect to the database
db.connect((err) => {
   if (err) {
      console.error('Error connecting to the database:', err);
      return;
   }
   console.log('Connected to the database');
});

app.get("/", (req,res) =>{
   res.send("Hi from ")
})

app.post("/registration", (req, res) => {
   console.log("hello");
   const {email, password,username}= req.body;
   // Insert user details into the database
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
  // Check if the username and password match a record in the database
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

app.post("http://localhost:3000/addToCart", (req, res) => {
  const { userId, productId, quantity } = req.body;

  // Insert the cart item into the database
  const sql = "INSERT INTO user_cart (user_id, product_id, quantity) VALUES (?, ?, ?)";
  db.query(sql, [userId, productId, quantity], (err, result) => {
    if (err) {
      console.error("Error adding item to cart:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "Item added to cart" });
    }
  });
});

app.delete("/api/deleteFromCart", (req, res) => {
  const { userId, productId } = req.body;

  // Delete the cart item from the database
  const sql = "DELETE FROM user_cart WHERE user_id = ? AND product_id = ?";
  db.query(sql, [userId, productId], (err, result) => {
    if (err) {
      console.error("Error deleting item from cart:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(200).json({ message: "Item deleted from cart" });
    }
  });
});

app.get('/api/productsinfo', (req, res) => {
    const query = 'SELECT * FROM products'; // Replace with your actual query
  
    // Execute the query
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
    const query = `SELECT * FROM products WHERE id = ?`; // Replace with your actual table name
 
    // Execute the query with the product ID as a parameter
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
 
app.get('/api/products/similar/:category', (req, res) => {
    const category = req.params.category; // Get the category from the URL parameter
    const query = `SELECT * FROM products WHERE category = ? AND id <> ? LIMIT 4`; // Replace with your actual table name
 
    // Execute the query with the category and exclude the current product (by ID)
    db.query(query, [category, productId], (err, results) => {
       if (err) {
          console.error('Error querying the database:', err);
          res.status(500).json({ error: 'Internal Server Error' });
       } else {
          // Return similar products
          res.json(results);
       }
    });
});



// Start the server
app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
