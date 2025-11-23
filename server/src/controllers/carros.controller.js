import { pool } from "../config/db.js";

export const getCars = async (req, res) => {
  try {
    const { marca, modelo, anio, departamento } = req.query;

    // Agregamos 'u.nombre' y 'u.departamento' al SELECT para que el frontend reciba esa info útil
    let query = `
      SELECT v.*, u.nombre as nombreDuenio, u.departamento 
      FROM Vehiculos v
      INNER JOIN Usuarios u ON v.propietarioId = u.id
      WHERE v.activo = 1
    `;
    
    const queryParams = [];

    
    if (marca) {
      query += " AND v.marca = ?";
      queryParams.push(marca);
    }

    if (modelo) {
      query += " AND v.modelo = ?";
      queryParams.push(modelo);
    }

    if (anio) {
      query += " AND v.anio = ?";
      queryParams.push(anio);
    }
    if (departamento) {
      query += " AND u.departamento = ?";
      queryParams.push(departamento);
    }

    const [rows] = await pool.query(query, queryParams);
    res.json(rows);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCar = async (req, res) => {
  if (req.user.rol !== 'propietario' && req.user.rol !== 'admin') {
    return res.status(403).json({ message: "Acceso denegado. Solo los propietarios pueden publicar vehículos." });
  }

  const { tipoId, marca, modelo, anio, precioPorDia, imagenURL, descripcion } = req.body;
  const propietarioId = req.user.id; 

  try {
    const [result] = await pool.query(
      "INSERT INTO Vehiculos (propietarioId, tipoId, marca, modelo, anio, precioPorDia, imagenURL, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [propietarioId, tipoId, marca, modelo, anio, precioPorDia, imagenURL, descripcion]
    );

    res.json({
      id: result.insertId,
      marca,
      modelo,
      message: "Vehículo publicado exitosamente"
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// aun en desarrollo

/* export const getCarsByLocation = async (req, res) => {
  const { departamento } = req.params;
  // Consulta duenios de carro por departamento
  try {
    const query = 
    `
      SELECT v.*, u.nombre as nombreDuenio, u.departamento 
      FROM Vehiculos v
      INNER JOIN Usuarios u ON v.propietarioId = u.id
      WHERE u.departamento = ? AND v.activo = 1
    `;
    
    const [rows] = await pool.query(query, [departamento]);
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}; */