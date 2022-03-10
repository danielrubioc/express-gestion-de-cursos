const express = require("express");
const {
    getCursos,
    createCurso,
    editCurso,
    deleteCurso,
} = require("./database/db");
const app = express();

//middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.get("/", async (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/cursos", async (req, res) => {
    const resp = await getCursos();
    return res.json(resp);
});

app.post("/curso", async (req, res) => {
    const {
        nombre,
        nivelTecnico: nivel,
        fechaInicio: fecha,
        duracion,
    } = req.body;

    const resp = await createCurso({ nombre, nivel, fecha, duracion });
    return res.json(resp);
});

app.put("/curso", async (req, res) => {
    const {
        id,
        nombre,
        nivelTecnico: nivel,
        fechaInicio: fecha,
        duracion,
    } = req.body;

    const resp = await editCurso({ id, nombre, nivel, fecha, duracion });
    return res.json(resp);
});

app.delete("/curso/:id", async (req, res) => {
    const { id } = req.params;
    const resp = await deleteCurso(id);
    return res.json(resp);
});

app.listen(3000, () => console.log("servidor ok"));
