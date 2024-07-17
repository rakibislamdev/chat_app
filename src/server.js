const connectDB = require("./config/db");
const app = require("./app");

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.error(error);
    process.exit(1);
});

app.get("/", (req, res) => {
    res.send("Hello World");
});
