const fs = require('fs');

const orbitas = ['Organización', 'Ruta de oportunidad', 'Base comercial', 'Impacto de marketing', 'Tracking', 'Automatización/alianzas'];
const weeks = [
    { phase: 'Discovery', startDay: 1, endDay: 7 },
    { phase: 'Validation', startDay: 8, endDay: 14 },
    { phase: 'Build Offer', startDay: 15, endDay: 21 },
    { phase: 'Execution & Sales', startDay: 22, endDay: 30 }
];

const missionTemplates = [
    { title: "Diagnóstico inicial del emprendedor", context: "Hoy vas a definir tu punto de partida para saber qué ruta seguir.", reason: "Un emprendedor desordenado necesita claridad antes de elegir qué vender o cómo avanzar.", task: "Completa tu diagnóstico inicial" },
    { title: "Definición del Cliente Ideal", context: "Identificarás exactamente a quién le vas a vender.", reason: "Si le vendes a todos, no le vendes a nadie.", task: "Crea el perfil del cliente" },
    { title: "Análisis de Competencia", context: "Observa qué están haciendo otros en tu mercado.", reason: "Entender el mercado te ayuda a diferenciarte.", task: "Documenta 3 competidores" },
    { title: "Auditoría de Recursos", context: "Haz un inventario de tus habilidades, dinero y tiempo.", reason: "Saber qué tienes te dice hasta dónde puedes llegar hoy.", task: "Lista de recursos actuales" },
    { title: "Diseño de la Oferta Irresistible", context: "Transformar tu servicio en una oferta que no puedan rechazar.", reason: "La gente no compra servicios, compra resultados.", task: "Escribe tu oferta en 1 frase" },
    { title: "Mapa del Viaje del Cliente", context: "Dibuja los pasos desde que no te conocen hasta que compran.", reason: "Si no hay un camino claro, el cliente se pierde.", task: "Dibuja el customer journey" },
    { title: "El Vehículo de Venta", context: "Elige por dónde vas a vender (Llamada, Mensaje, Web).", reason: "Un sistema de ventas necesita un canal principal.", task: "Define tu canal de ventas" },
    { title: "Definición del Precio", context: "Establece un precio basado en valor, no en tiempo.", reason: "Cobrar barato atrae a los peores clientes.", task: "Calcula tu margen y precio" },
    { title: "Creación del Lead Magnet", context: "Crea algo gratis para atraer prospectos.", reason: "La reciprocidad es la herramienta más fuerte en marketing.", task: "Define tu imán de prospectos" },
    { title: "Setup del CRM", context: "Configura donde vas a guardar tus contactos.", reason: "Lead que no se guarda, lead que se pierde.", task: "Crea tu lista de contactos" },
    { title: "Guión de Ventas Base", context: "Escribe las preguntas clave para tu llamada o chat.", reason: "No improvises, sigue un sistema.", task: "Escribe 3 preguntas de cualificación" },
    { title: "Estrategia de Contenido", context: "Define 3 pilares de los que vas a hablar.", reason: "Crear contenido sin estrategia es perder el tiempo.", task: "Define tus 3 pilares" },
    { title: "Grabación del VSL", context: "Graba tu Video Sales Letter o crea tu PDF de ventas.", reason: "Necesitas un vendedor 24/7.", task: "Crea tu material de ventas" },
    { title: "Campaña de Reactivación", context: "Contacta a personas que ya conoces.", reason: "Tu primera venta está en tus contactos actuales.", task: "Envía 10 mensajes" },
    { title: "Lanzamiento de la Oferta", context: "Haz pública tu oferta al mundo.", reason: "Si no ofreces, nadie te compra.", task: "Publica tu oferta" },
    { title: "Seguimiento de Leads", context: "Contacta a los interesados de ayer.", reason: "El 80% de las ventas se hacen en el seguimiento.", task: "Haz seguimiento a 5 leads" },
    { title: "Revisión de Métricas", context: "Analiza cuántos leads, llamadas y ventas tuviste.", reason: "Lo que no se mide, no se mejora.", task: "Registra tus KPIs" },
    { title: "Optimización del Perfil", context: "Mejora tus redes sociales para que vendan.", reason: "Tu perfil es tu tarjeta de presentación moderna.", task: "Actualiza tu biografía" },
    { title: "Cierre de Ventas", context: "Hoy el objetivo es cerrar a los indecisos.", reason: "El dinero en la cuenta es la única métrica real.", task: "Haz 2 llamadas de cierre" },
    { title: "Automatización de Tareas", context: "Automatiza correos o mensajes repetitivos.", reason: "Tu tiempo vale más que tareas manuales.", task: "Configura 1 automatización" },
    { title: "Plan de Referidos", context: "Pide referidos a tus clientes actuales.", reason: "Los referidos son el canal de ventas más barato.", task: "Pide 2 referidos" },
    { title: "Recolección de Testimonios", context: "Pide feedback a los clientes felices.", reason: "La prueba social vende más que tú.", task: "Consigue 1 testimonio" },
    { title: "Análisis de Fricción", context: "Identifica por qué la gente no te compra.", reason: "Reducir fricción aumenta conversión.", task: "Identifica 1 objeción común" },
    { title: "Creación de Alianzas", context: "Busca un socio estratégico que tenga a tu cliente.", reason: "Las alianzas apalancan tu alcance.", task: "Contacta a 1 socio potencial" },
    { title: "Campaña de Outbound", context: "Envía mensajes en frío a clientes ideales.", reason: "A veces tienes que ir tú por el cliente.", task: "Envía 20 mensajes en frío" },
    { title: "Refinamiento de la Oferta", context: "Ajusta tu oferta con el feedback del mercado.", reason: "El mercado te dice qué quiere comprar.", task: "Mejora 1 aspecto de tu oferta" },
    { title: "Plan de Retención", context: "Diseña cómo vas a mantener a tus clientes.", reason: "Es más barato retener que adquirir clientes.", task: "Define tu wow moment" },
    { title: "Delegación Base", context: "Identifica qué puedes delegar.", reason: "No puedes escalar siendo el hombre orquesta.", task: "Lista 3 tareas a delegar" },
    { title: "Proyección a 90 días", context: "Define tu siguiente gran objetivo.", reason: "El crecimiento requiere visión a largo plazo.", task: "Escribe tu objetivo trimestral" },
    { title: "Celebración y Reflexión", context: "Revisa todo lo que lograste en estos 30 días.", reason: "Reconocer el avance te motiva a seguir.", task: "Escribe 3 victorias del mes" }
];

const missions = [];

for (let i = 1; i <= 30; i++) {
    const weekObj = weeks.find(w => i >= w.startDay && i <= w.endDay);
    const tmpl = missionTemplates[i - 1] || missionTemplates[0];
    
    // Assign an orbita stage based on day
    const orbita = orbitas[(i-1) % 6];
    
    missions.push({
        id: `MIS-${String(i).padStart(3, '0')}`,
        day: i,
        week: Math.ceil(i / 7),
        phase: weekObj.phase,
        orbita_stage: orbita,
        title: tmpl.title,
        context: tmpl.context,
        business_reason: tmpl.reason,
        estimated_time: "20 min",
        tasks: [
            { id: "t1", text: tmpl.task, completed: false },
            { id: "t2", text: "Registra los hallazgos", completed: false }
        ],
        expected_output: "Documento o evidencia completada.",
        evidence_type: ["text", "link", "image"],
        evidence_placeholder: "Ingresa aquí el enlace a tu documento, la imagen o el texto descriptivo.",
        approval_criteria: "Evidencia clara y concisa.",
        xp_reward: 50,
        badge_unlock: i === 7 ? "Explorer" : i === 14 ? "Validator" : i === 21 ? "Builder" : i === 30 ? "Executor" : null,
        status: i === 1 ? "unlocked" : "locked"
    });
}

// Override Day 1 exactly as requested
missions[0] = {
  id: "MIS-001",
  day: 1,
  week: 1,
  phase: "Discovery",
  orbita_stage: "Organización",
  title: "Diagnóstico inicial del emprendedor",
  context: "Hoy vas a definir tu punto de partida para saber qué ruta seguir.",
  business_reason: "Un emprendedor desordenado necesita claridad antes de elegir qué vender o cómo avanzar.",
  estimated_time: "20 min",
  tasks: [
    { id: "t1", text: "Completa tu diagnóstico inicial", completed: false },
    { id: "t2", text: "Define tu objetivo principal de 30 días", completed: false },
    { id: "t3", text: "Escribe tu principal bloqueo actual", completed: false }
  ],
  expected_output: "Diagnóstico + objetivo de 30 días",
  evidence_type: ["text", "link", "image"],
  evidence_placeholder: "Escribe tu objetivo de 30 días y tu principal bloqueo actual.",
  approval_criteria: "Debe incluir objetivo, situación actual y bloqueo principal.",
  xp_reward: 50,
  badge_unlock: null,
  status: "unlocked"
};

const output = `export const MISSIONS = ${JSON.stringify(missions, null, 2)};\n`;

fs.writeFileSync('./data/missions.mock.js', output, 'utf8');
console.log('Missions generated.');
