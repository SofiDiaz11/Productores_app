import { PrismaClient } from '@prisma/client';
import { mexicoData } from './mexicoData'; // Importar el JSON completo

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed de la base de datos...');

  // ============================================
  // 1. ESTADOS Y CIUDADES DE MÉXICO (ACTUALIZADO)
  // ============================================
  
  console.log('🇲🇽 Importando todos los estados y ciudades de México...');
  let stateCount = 0;
  let cityCount = 0;

  for (const [stateName, stateData] of Object.entries(mexicoData)) {
    // Crear estado
    const state = await prisma.state.upsert({
      where: { code: stateData.code },
      update: {},
      create: {
        name: stateName,
        code: stateData.code,
        order: stateCount,
      }
    });
    stateCount++;
    console.log(`✅ ${stateName} (${stateData.code}) - ${stateData.cities.length} ciudades`);

    // Crear ciudades
    for (const cityName of stateData.cities) {
      await prisma.city.upsert({
        where: { 
          stateId_name: {
            stateId: state.id,
            name: cityName
          }
        },
        update: {},
        create: {
          name: cityName,
          stateId: state.id,
        }
      });
      cityCount++;
    }
  }

  console.log(`📍 ${stateCount} estados creados`);
  console.log(`🏙️ ${cityCount} ciudades creadas`);

  // ============================================
  // 2. CATEGORÍAS Y SUBCATEGORÍAS 
  // ============================================
  
  const categoriesData = [
    {
      name: 'Textil y moda',
      slug: 'textil-y-moda',
      icon: '👕',
      description: 'Ropa, calzado y accesorios artesanales',
      subcategories: ['Ropa casual', 'Ropa artesanal', 'Calzado', 'Accesorios', 'Uniformes y ropa industrial']
    },
    {
      name: 'Cuidado personal y hogar',
      slug: 'cuidado-personal-y-hogar',
      icon: '🧴',
      description: 'Productos naturales para el cuidado personal',
      subcategories: ['Jabones artesanales', 'Cosmética natural', 'Velas', 'Aromaterapia', 'Productos de limpieza ecológicos']
    },
    {
      name: 'Alimentos no perecederos',
      slug: 'alimentos-no-perecederos',
      icon: '🥫',
      description: 'Conservas, dulces y productos alimentarios',
      subcategories: ['Conservas', 'Café y té', 'Mole, salsas', 'Dulces típicos', 'Tortillas, galletas, botanas']
    },
    {
      name: 'Condimentos y especias',
      slug: 'condimentos-y-especias',
      icon: '🌶️',
      description: 'Especias, sal y condimentos artesanales',
      subcategories: ['Sal de mar', 'Mezclas de especias', 'Hierbas secas']
    },
    {
      name: 'Bebidas',
      slug: 'bebidas',
      icon: '🍹',
      description: 'Bebidas artesanales y tradicionales',
      subcategories: ['Mezcal / tequila / sotol', 'Cerveza artesanal', 'Refrescos y jugos naturales']
    },
    {
      name: 'Artesanías y decoración',
      slug: 'artesanias-y-decoracion',
      icon: '🏺',
      description: 'Arte y decoración hecha a mano',
      subcategories: ['Cerámica', 'Textiles para el hogar', 'Juguetes artesanales', 'Arte y decoración']
    },
    {
      name: 'Agricultura y jardinería',
      slug: 'agricultura-y-jardineria',
      icon: '🌱',
      description: 'Semillas, fertilizantes y herramientas',
      subcategories: ['Semillas', 'Fertilizantes orgánicos', 'Herramientas artesanales']
    },
    {
      name: 'Papelería y oficina',
      slug: 'papeleria-y-oficina',
      icon: '📝',
      description: 'Productos de papelería artesanales',
      subcategories: ['Cuadernos artesanales', 'Agendas', 'Material reciclado']
    },
    {
      name: 'Servicios adicionales',
      slug: 'servicios-adicionales',
      icon: '🔧',
      description: 'Servicios especializados para productores',
      subcategories: ['Maquiladoras', 'Diseñadores locales', 'Empaques ecológicos', 'Distribuidores']
    }
  ];

  console.log('📂 Creando categorías y subcategorías...');
  for (const categoryData of categoriesData) {
    const category = await prisma.category.upsert({
      where: { slug: categoryData.slug },
      update: {},
      create: {
        name: categoryData.name,
        slug: categoryData.slug,
        icon: categoryData.icon,
        description: categoryData.description,
      },
    });
    console.log(`   ✅ ${category.name}`);

    // Crear subcategorías
    for (let i = 0; i < categoryData.subcategories.length; i++) {
      const subName = categoryData.subcategories[i];
      const subSlug = `${categoryData.slug}-${subName.toLowerCase().replace(/\s+/g, '-').replace(/[,/]/g, '')}`;
      
      const subcategory = await prisma.subcategory.upsert({
        where: { slug: subSlug },
        update: {},
        create: {
          name: subName,
          slug: subSlug,
          categoryId: category.id,
          order: i,
        }
      });
      console.log(`     ➡️ ${subcategory.name}`);
    }
  }

  // ============================================
  // 3. ETIQUETAS CATEGORIZADAS
  // ============================================
  
  const tags = [
    // Sustentabilidad
    { name: 'Orgánico', slug: 'organico', category: 'SUSTAINABILITY', color: '#10B981', icon: '🌱' },
    { name: 'Sustentable', slug: 'sustentable', category: 'SUSTAINABILITY', color: '#059669', icon: '♻️' },
    
    // Producción
    { name: 'Productor directo', slug: 'productor-directo', category: 'PRODUCTION', color: '#3B82F6', icon: '🏭' },
    { name: 'Fabricación propia', slug: 'fabricacion-propia', category: 'PRODUCTION', color: '#2563EB', icon: '🔨' },
    { name: 'Hecho a mano', slug: 'hecho-a-mano', category: 'PRODUCTION', color: '#1D4ED8', icon: '✋' },
    
    // Comercial
    { name: 'Factura disponible', slug: 'factura-disponible', category: 'COMMERCIAL', color: '#F59E0B', icon: '🧾' },
    { name: 'Pago con tarjeta', slug: 'pago-con-tarjeta', category: 'COMMERCIAL', color: '#D97706', icon: '💳' },
    { name: 'Producto popular', slug: 'producto-popular', category: 'COMMERCIAL', color: '#DC2626', icon: '⭐' },
  ];

  console.log('🏷️ Creando etiquetas...');
  for (const tagData of tags) {
    const tag = await prisma.tag.upsert({
      where: { slug: tagData.slug },
      update: {},
      create: {
        name: tagData.name,
        slug: tagData.slug,
        category: tagData.category as any,
        color: tagData.color,
        icon: tagData.icon,
      },
    });
    console.log(`   ✅ ${tag.name} (${tag.category})`);
  }

  console.log('✅ Seed completado exitosamente!');
  console.log('📊 Resumen:');
  const counts = await Promise.all([
    prisma.state.count(),
    prisma.city.count(),
    prisma.category.count(),
    prisma.subcategory.count(),
    prisma.tag.count(),
  ]);
  
  console.log(`   - Estados: ${counts[0]}`);
  console.log(`   - Ciudades: ${counts[1]}`);
  console.log(`   - Categorías: ${counts[2]}`);
  console.log(`   - Subcategorías: ${counts[3]}`);
  console.log(`   - Etiquetas: ${counts[4]}`);
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });