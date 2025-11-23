import { pool } from "../config/db.js";

export const getCars = async (req, res) => {
  try {
    // Extraemos los posibles filtros de la URL (req.query)
    const { marca, modelo, anio, departamento } = req.query;

    // Iniciamos la consulta base
    let query = 
    `
      SELECT v.* FROM Vehiculos v
      INNER JOIN Usuarios u ON v.propietarioId = u.id
      WHERE v.activo = 1
    `;
    
    const queryParams = [];

    // Si nos enviaron 'marca', agregamos el filtro al SQL
    if (marca) {
      query += " AND marca = ?";
      queryParams.push(marca);
    }

    // Si nos enviaron 'modelo', agregamos el filtro
    if (modelo) {
      query += " AND modelo = ?";
      queryParams.push(modelo);
    }

    // Si nos enviaron 'anio', agregamos el filtro
    if (anio) {
      query += " AND anio = ?";
      queryParams.push(anio);
    }

    // Si nos enviaron 'departamento', filtramos por la ubicación del dueño
    if (departamento) {
      query += " AND departamento = ?";
      queryParams.push(departamento);
    }

    if (departamento) {
      query += " AND departamento = ?";
      queryParams.push(departamento);
    }

    // Ejecutamos la consulta con los parámetros acumulados
    const [rows] = await pool.query(query, queryParams);
    res.json(rows);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCar = async (req, res) => {
  const { propietarioId, tipoId, marca, modelo, anio, precioPorDia, imagenURL, descripcion } = req.body;
  //Crea los vehiculos
  try {
    // Insertar datos usando signos de interrogación (?) para evitar inyección SQL
    const [result] = await pool.query(
      "INSERT INTO Vehiculos (propietarioId, tipoId, marca, modelo, anio, precioPorDia, imagenURL, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [propietarioId, tipoId, marca, modelo, anio, precioPorDia, imagenURL, descripcion]
    );
    res.json({
      id: result.insertId, // MySQL devuelve el ID generado aquí
      marca,
      modelo,
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