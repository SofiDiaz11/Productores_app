🎯 Visión del Proyecto
Crear una plataforma que facilite la conexión directa entre productores mexicanos y consumidores locales, promoviendo el comercio local y los productos nacionales sin procesar pagos, solo facilitando las conexiones.
🚀 Estado Actual del Desarrollo
✅ Implementado (40% del Backend)

Backend Base: Node.js + Express + TypeScript
Base de Datos: PostgreSQL + Prisma ORM
Seguridad: Helmet, CORS, Rate Limiting
Autenticación: Sistema JWT completo (registro y login)
Datos Precargados: 32 estados + ~500 ciudades de México
Schema Completo: 9 categorías + 13 etiquetas específicas para productores
Formulario Multi-paso: Sistema completo para registro de empresas (5 pasos)

🔄 En Desarrollo

Testing del Formulario Multi-paso: Pruebas de integración de los 5 pasos
Endpoints de Consulta: APIs para obtener estados, ciudades y categorías

📋 Próximas Características

API Pública de Búsqueda: Búsqueda de empresas sin autenticación
Filtros Avanzados: Por estado, categoría, etiquetas, rango de precios
Upload de Imágenes: Integración con Cloudinary
Analytics Básicos: Tracking de clicks y visualizaciones

🛠️ Stack Tecnológico
Backend:

Runtime: Node.js 18+
Framework: Express.js
Lenguaje: TypeScript
Base de Datos: PostgreSQL
ORM: Prisma
Autenticación: JWT + bcryptjs
Validación: Zod
Seguridad: Helmet, CORS, express-rate-limit

Desarrollo:

Dev Server: Nodemon + ts-node
Linting: (Pendiente: ESLint + Prettier)
Testing: (Pendiente: Jest)

📊 Arquitectura del Sistema
Sistema de Registro Multi-paso
El registro de empresas se realiza en 5 pasos utilizando una tabla temporal CompanyDraft:

Paso 1: Información general (nombre, año de fundación, tamaño, descripción)
Paso 2: Ubicación y contacto (dirección, email, teléfono, ciudad, estado)
Paso 3: Detalles operativos (tipo de venta, métodos de pago, envíos)
Paso 4: Categorías y productos (categorías, etiquetas, certificaciones)
Paso 5: Información adicional (misión, reel) y activación final

Modelo de Datos
Principales Entidades:

Users: Sistema de autenticación (solo productores)
Companies: Empresas/productores finales (activas)
CompanyDraft: Tabla temporal para registro multi-paso
States/Cities: 32 estados + ciudades principales de México
Categories/Subcategories: 9 categorías específicas para productores mexicanos
Tags: 13 etiquetas (Sustentabilidad, Producción, Comercial)

Relaciones:

One-to-One: User ↔ Company
Many-to-Many: Company ↔ Categories, Company ↔ Tags
One-to-Many: State ↔ Cities, State ↔ Companies 
⚙️ Instalación y Configuración
Prerrequisitos

Node.js 18+
PostgreSQL 12+
npm o yarn

Instalación

Clonar el repositorio
bashgit clone https://github.com/tu-usuario/productores-app.git
cd productores-app

Instalar dependencias
bashnpm install

Configurar variables de entorno
bashcp .env.example .env
# Editar .env con tus configuraciones

Configurar base de datos
bash# Ejecutar migraciones
npx prisma migrate dev

# Ejecutar seed con datos de México
npx prisma db seed

# Generar cliente Prisma
npx prisma generate

Iniciar servidor de desarrollo
bashnpm run dev


Variables de Entorno Requeridas
envDATABASE_URL="postgresql://usuario:password@localhost:5432/productores_db"
JWT_SECRET="tu_jwt_secreto_super_seguro"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV=development
ALLOWED_ORIGINS="http://localhost:3000"
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
MAX_FILE_SIZE="10mb"
🧪 Testing
Pruebas Manuales con Postman/Thunder Client
1. Registro de Usuario:
jsonPOST /api/auth/register
{
  "email": "test@empresa.com",
  "password": "123456",
  "name": "Usuario Test"
}
2. Login:
jsonPOST /api/auth/login
{
  "email": "test@empresa.com", 
  "password": "123456"
}
3. Inicio de Registro de Empresa:
jsonPOST /api/companies/register/step1
Authorization: Bearer <token>
{
  "name": "Mi Empresa",
  "foundingYear": 2020,
  "companySize": "MICROPYME",
  "description": "Una empresa de prueba"
}
🎨 Modelo de Negocio

Usuarios: Solo productores se registran (compradores buscan sin registro)
MVP: Directorio gratuito, sin procesamiento de pagos
Contacto: Email, teléfono, WhatsApp (con tracking de clicks)
Alcance: Solo México inicialmente
Moderación: Sin moderación en MVP

📈 Roadmap
Fase 1 - MVP Backend (En Curso)

 Sistema de autenticación
 Formulario multi-paso para empresas
 Testing completo de endpoints
 API pública de búsqueda
 Deploy inicial

Fase 2 - Frontend (Pendiente)

 Interfaz de registro de productores
 Buscador público de empresas
 Perfiles de empresas
 Sistema de filtros

Fase 3 - Características Avanzadas (Futuro)

 Upload de imágenes/videos
 Analytics y métricas
 Sistema de verificación de empresas
 API para terceros

🤝 Contribuir
Este proyecto está en desarrollo activo. Si quieres contribuir:

Fork del repositorio
Crear rama para tu feature (git checkout -b feature/nueva-caracteristica)
Commit de cambios (git commit -am 'Agregar nueva característica')
Push a la rama (git push origin feature/nueva-caracteristica)
Crear Pull Request

📝 Decisiones Técnicas Importantes

Una empresa por usuario: Simplifica la lógica del MVP
Búsqueda pública sin registro: Los compradores no necesitan cuenta
Formulario multi-paso con persistencia: Permite guardar progreso
Tabla temporal para registro: Evita empresas incompletas en producción
JWT para autenticación: Solo productores necesitan autenticarse

🚧 Problemas Conocidos

 Testing de endpoints multi-paso pendiente
 Falta validación de integridad en algunos campos
 Upload de archivos no implementado
 Rate limiting puede ser muy restrictivo para desarrollo

📊 Métricas del Proyecto

Commits: ~50+ commits
Archivos TypeScript: 15+
Líneas de código: ~2,000+
Endpoints: 11 implementados
Modelos Prisma: 12 modelos
Estados de México: 32 precargados
Ciudades: ~500 precargadas

📄 Licencia
Este proyecto está bajo la Licencia MIT. Ver LICENSE para más detalles.

⭐ Si este proyecto te parece útil, dale una estrella en GitHub!
📧 Contacto: [sofia.dev@outlook.com]
🌐 Estado del Proyecto: En desarrollo activo - MVP Backend al 40%
