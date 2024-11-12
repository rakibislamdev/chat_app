const connectDB = require("./config/db");
const app = require("./app");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port http://localhost:${process.env.PORT}`);
    });
})
.catch((error) => {
    console.error(error);
    process.exit(1);
});

app.get("/", (_, res) => {
    res.send("Welcome to the Chating API");
});

// Routes
app.use("/api/user/", userRoutes);
app.use("/api/message/", messageRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  });
  
  // 404 middleware
  app.use((req, res) => {
    res.status(404).send("Page not found");
  });
