const { db } = require("../db");

const getUsers = (_, res) => {
    const q = "SELECT * FROM usuario";
    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    })
}

const addUser = (req, res) => {
    const q = 
    "INSERT INTO usuario (`nombre`, `correo`, `telefono`, `fecha_nacimiento`) VALUES(?)";

    const values = [
        req.body.nombre,
        req.body.correo,
        req.body.telefono,
        req.body.fecha_nacimiento,
    ];

    db.query(q, [values], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuario creado exitosamente");
    })
}

const updateUser = (req, res) => {
    const q = 
    "UPDATE usuario SET `nombre` = ?, `correo` = ?, `telefono` = ?, `fecha_nacimiento` = ? WHERE `id` = ?";

    const values = [
        req.body.nombre,
        req.body.correo,
        req.body.telefono,
        req.body.fecha_nacimiento,
    ];

    db.query(q, [...values, req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuario actualizado exitosamente");
    })
}

const deleteUser = (req, res) => {
    const q = "DELETE FROM usuario WHERE `id` = ?";

    db.query(q, [req.params.id], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuario eliminado exitosamente");
    })
}

module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser,
};