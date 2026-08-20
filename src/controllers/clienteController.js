const Cliente = require('../models/cliente');

// GET /clientes — devuelve todos los registros
const obtenerTodos = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los clientes', detalle: error.message });
  }
};

// GET /clientes/:id — devuelve un cliente por su ID
const obtenerUno = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);

    if (!cliente) {
      return res.status(404).json({
        error: `No se encontró el cliente con ID ${req.params.id}`
      });
    }

    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el cliente', detalle: error.message });
  }
};

// POST /clientes — crea un nuevo cliente
const crear = async (req, res) => {
  try {
    const { nombre, telefono } = req.body;

    if (!nombre || !telefono) {
      return res.status(400).json({
        error: 'nombre y telefono son obligatorios'
      });
    }

    const nuevo = await Cliente.create({
      nombre,
      telefono
    });

    res.status(201).json(nuevo);

  } catch (error) {
    res.status(500).json({
      error: 'Error al crear el cliente',
      detalle: error.message
    });
  }
};

// PUT /clientes/:id — actualiza un cliente existente
const actualizar = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);

    if (!cliente) {
      return res.status(404).json({
        error: `No se encontró el cliente con ID ${req.params.id}`
      });
    }

    const { nombre, telefono } = req.body;

    if (!nombre || !telefono) {
      return res.status(400).json({
        error: 'nombre y telefono son obligatorios'
      });
    }

    await cliente.update({
      nombre,
      telefono
    });

    res.json(cliente);

  } catch (error) {
    res.status(500).json({
      error: 'Error al actualizar el cliente',
      detalle: error.message
    });
  }
};

// DELETE /clientes/:id — elimina un cliente
const eliminar = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);

    if (!cliente) {
      return res.status(404).json({
        error: `No se encontró el cliente con ID ${req.params.id}`
      });
    }

    await cliente.destroy();

    res.json({
      mensaje: 'Cliente eliminado',
      eliminado: cliente
    });

  } catch (error) {
    res.status(500).json({
      error: 'Error al eliminar el cliente',
      detalle: error.message
    });
  }
};

module.exports = {
  obtenerTodos,
  obtenerUno,
  crear,
  actualizar,
  eliminar
};