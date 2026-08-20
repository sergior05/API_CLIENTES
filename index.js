require('dotenv').config();

const app = require('./src/app');
const sequelize = require('./src/config/database');

const PORT = process.env.PORT || 3000;

async function iniciar() {
  try {
    // Verificar conexión con PostgreSQL
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida.');

    // Crear o actualizar las tablas según los modelos
    await sequelize.sync({ alter: true });
    console.log('Modelos sincronizados con la base de datos.');

    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`API corriendo en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Error al iniciar la aplicación:', error.message);
    process.exit(1);
  }
}

iniciar();