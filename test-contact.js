fetch("http://localhost:3000/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ firstName: "Test", lastName: "User", email: "test@example.com", message: "Hello" })
})
  .then(async (res) => {
    console.log("Status:", res.status);
    console.log("Text:", await res.text());
  })
  .catch((err) => console.error(err));
