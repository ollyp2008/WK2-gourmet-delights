
// STEP 1: Replace with YOUR Supabase project details
// Go to your Supabase project settings to find these values
const API_URL = "https://bkmxdyzteyqwvbxdgqsp.supabase.co"; // Replace with your project URL
const API_KEY = "sb_publishable_PgKAlPDbJbo6rVQ5-yKP-Q_A_RRQMcM"; // Replace with your public anon key

// STEP 2: Update table names to match YOUR normalized database
// Replace these with your actual table names from your 3NF design
const USERS_TABLE = "tbl_user"; // Change to your main entity table
const RECIPES_TABLE = "tbl_recipe"; // Change to your second entity table
const INGREDIENTS_TABLE = "tbl_ingredients"; // Change to your third entity table (if you have one)
const RECIPE_INGREDIENTS_TABLE = "tbl_recipe_ingredients"; // Change to your junction table name
const USER_RECIPES_TABLE = "tbl_user_recipes"; // Change to another junction table (if you have one)
// ADD MORE CONSTANTS HERE if you have additional tables (4th, 5th, 6th tables)

// STEP 3: Modify this function for YOUR main entity table
// This loads your primary table (e.g., customers, students, products)
async function loadUsers() {
  // EDIT: Update the select query to match YOUR table structure and any joins you need
  // Example: ?select=*,your_related_table(column_name) for joins
  const response = await fetch(`${API_URL}/rest/v1/${USERS_TABLE}?select=*,tbl_loyalty(loyalty_points)`, {
    method: "GET",
    headers: {
      "apikey": API_KEY,
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    }
  });

  // EDIT: Change "users-body" to match your HTML table ID
  const tbody = document.getElementById("users-body");
  tbody.innerHTML = "";

  // Handle API errors - UPDATE the colspan number to match your table columns
  if (!response.ok) {
    tbody.innerHTML = "<tr><td colspan='4'>Error loading data.</td></tr>";
    return;
  }

  // STEP 4: Update the table row content to match YOUR table columns
  // Replace row.user_id, row.user_name, etc. with YOUR actual column names
  const data = await response.json();
  data.forEach(row => {
    const tr = document.createElement("tr");
    const loyaltyPoints = row.tbl_loyalty?.[0]?.loyalty_points ?? "N/A";
    tr.innerHTML = `
      <td>${row.user_id}</td>
      <td>${row.user_name}</td>
      <td>${row.user_email}</td>
      <td>${loyaltyPoints}</td>
    `;
    tbody.appendChild(tr);
  });
}

// STEP 5: Modify this function for YOUR second entity table
// Rename function and update for your second main table (e.g., loadProducts, loadCourses)
async function loadRecipes() {
  // EDIT: Update to fetch YOUR second table data
  const response = await fetch(`${API_URL}/rest/v1/${RECIPES_TABLE}?select=*`, {
    method: "GET",
    headers: {
      "apikey": API_KEY,
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    }
  });

  // EDIT: Change "recipes-body" to match your HTML table ID
  const tbody = document.getElementById("recipes-body");
  tbody.innerHTML = "";

  // Handle API errors - UPDATE colspan to match your columns
  if (!response.ok) {
    tbody.innerHTML = "<tr><td colspan='3'>Error loading data.</td></tr>";
    return;
  }

  // STEP 6: Update to display YOUR table's columns
  // Replace row.recipe_id, row.recipe_name, etc. with YOUR column names
  const data = await response.json();
  data.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.recipe_id}</td>
      <td>${row.recipe_name}</td>
      <td>${row.recipe_difficulty}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Function to fetch and display all ingredients from the database
async function loadIngredients() {
  // Make API request to get all ingredient records
  const response = await fetch(`${API_URL}/rest/v1/${INGREDIENTS_TABLE}?select=*`, {
    method: "GET",
    headers: {
      "apikey": API_KEY,
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    }
  });

  // Get table body and clear existing content
  const tbody = document.getElementById("ingredients-body");
  tbody.innerHTML = "";

  // Handle API errors
  if (!response.ok) {
    tbody.innerHTML = "<tr><td colspan='2'>Error loading ingredients.</td></tr>";
    return;
  }

  // Parse response and create table rows for each ingredient
  const data = await response.json();
  data.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.ingredient_id}</td>
      <td>${row.ingredient_name}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Function to fetch and display recipe-ingredient relationships from the junction table
async function loadRecipeIngredients() {
  // Make API request to get all recipe-ingredient relationship records
  const response = await fetch(`${API_URL}/rest/v1/${RECIPE_INGREDIENTS_TABLE}?select=*`, {
    method: "GET",
    headers: {
      "apikey": API_KEY,
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    }
  });

  // Get table body and clear existing content
  const tbody = document.getElementById("ri-body");
  tbody.innerHTML = "";

  // Handle API errors
  if (!response.ok) {
    tbody.innerHTML = "<tr><td colspan='3'>Error loading recipe ingredients.</td></tr>";
    return;
  }

  // Parse response and create table rows showing recipe-ingredient relationships
  const data = await response.json();
  data.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.recipe_id}</td>
      <td>${row.ingredients_id}</td>
      <td>${row.quantity_value} ${row.quantity_unit}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Function to fetch and display user-recipe relationships
async function loadUserRecipes() {
  // Make API request to get all user-recipe records
  const response = await fetch(`${API_URL}/rest/v1/${USER_RECIPES_TABLE}?select=*`, {
    method: "GET",
    headers: {
      "apikey": API_KEY,
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    }
  });

  // Get table body and clear existing content
  const tbody = document.getElementById("user-recipes-body");
  tbody.innerHTML = "";

  // Handle API errors
  if (!response.ok) {
    tbody.innerHTML = "<tr><td colspan='3'>Error loading user recipes.</td></tr>";
    return;
  }

  // Parse response and create table rows for each user-recipe relationship
  const data = await response.json();
  data.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.user_id}</td>
      <td>${row.recipe_id}</td>
      <td>${new Date(row.date).toLocaleDateString()}</td>
    `;
    tbody.appendChild(tr);
  });
}

// STEP 13: Update this function to add records to YOUR main table
// Change function name and parameters to match your needs
async function addUser(name, email) {
  // EDIT: Update the POST request for YOUR table structure
  const response = await fetch(`${API_URL}/rest/v1/${USERS_TABLE}`, {
    method: "POST",
    headers: {
      "apikey": API_KEY,
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    // STEP 14: Update the JSON body with YOUR table's column names
    body: JSON.stringify({
      user_name: name, // Replace with your actual column name
      user_email: email // Replace with your actual column name
    })
  });

  // Handle response and reload users table
  if (response.ok) {
    loadUsers(); // Refresh the users table
    return true;
  } else {
    console.error("Error adding user:", await response.text());
    return false;
  }
}

// STEP 15: Update function calls to match YOUR renamed functions
document.addEventListener("DOMContentLoaded", () => {
  // EDIT: Call YOUR load functions here - add/remove as needed for your tables
  loadUsers(); // Replace with your function name
  loadRecipes(); // Replace with your function name
  loadIngredients(); // DELETE if you don't have this table
  loadRecipeIngredients(); // Replace with your junction table function
  loadUserRecipes(); // DELETE if you don't have this table

  // Handle form submission for adding new users
  const form = document.getElementById("data-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent page reload
    
    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    
    // Validate inputs
    if (!name || !email) {
      alert("Please fill in both name and email");
      return;
    }
    
    // Add user to database
    const success = await addUser(name, email);
    if (success) {
      // Clear form on success
      form.reset();
      alert("User added successfully!");
    } else {
      alert("Error adding user. Please try again.");
    }
  });
});

// STEP 17: ADD MORE FUNCTIONS HERE if you have additional tables (4th, 5th, 6th tables)
// Copy the pattern from the functions above and modify for your extra tables
// Remember to:
// 1. Add table constants at the top
// 2. Create load functions for each table
// 3. Update the HTML with corresponding table sections
// 4. Call the functions in the DOMContentLoaded event