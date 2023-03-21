const express = require('express');
const cors = require('cors');
const cookies = require("cookie-parser");
const morgan = require('morgan');
const {initDb} = require("./db");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const fileRouter = require("./routes/file");
const photoRouter = require("./routes/photo");
const tagRouter = require("./routes/tag");
const {PUBLIC_FILES_DIR} = require("./middleware/upload");

const app = express();

app.use(morgan('combined', {
    skip: function (req, res) { return res.statusCode < 400 }
}));

app.use(express.json());

app.use(cookies());

app.use(
    cors({
        credentials: true, // чтобы работали secured куки
        origin: true // автоматом подставляется текущий сервер в Origin
    })
);

app.get("/", (req, res) => {
    res.status(200).json({ok: true});
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/file", fileRouter);
app.use("/photo", photoRouter);
app.use("/tag", tagRouter);

app.use("/public", express.static(PUBLIC_FILES_DIR))

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(async function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = err;

    if (process.env.NODE_ENV !== 'production') {
        console.error(err);
    }

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err.message });
});

const port = process.env.PORT || 3001;
(async () => {
    await initDb();
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}!`)
    });
})();
