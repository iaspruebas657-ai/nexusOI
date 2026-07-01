export const MISSIONS = [
    {
        id: "day-1",
        day_number: 1,
        title: "Día 1: Claridad de Propósito",
        description: "Define la razón de ser de tu negocio y a quién ayudas.",
        context: "Para construir algo grande, necesitas cimientos. Hoy no vas a vender, vas a definir por qué existes.",
        business_reason: "Sin un propósito claro, atraerás a los clientes equivocados.",
        tasks: [
            { id: "t1", description: "Escribe tu declaración de misión en una línea.", status: false },
            { id: "t2", description: "Define 3 problemas principales que resuelves.", status: false }
        ],
        expected_output: "Un texto corto con tu misión y los 3 problemas de tu cliente ideal."
    },
    {
        id: "day-2",
        day_number: 2,
        title: "Día 2: El Perfil de tu Cliente",
        description: "Construye el avatar de tu cliente ideal.",
        context: "Si le vendes a todos, no le vendes a nadie. Hoy vas a ser hiper-específico sobre quién es tu cliente.",
        business_reason: "El marketing es mucho más barato cuando sabes a quién le hablas.",
        tasks: [
            { id: "t1", description: "Ponle un nombre y edad a tu cliente ideal.", status: false },
            { id: "t2", description: "Escribe 2 de sus miedos más grandes.", status: false },
            { id: "t3", description: "Escribe 2 de sus mayores deseos.", status: false }
        ],
        expected_output: "Documento o texto con el perfil detallado de tu Avatar."
    }
];

// Generar el resto de misiones hasta el 30 para el MVP (mock automático)
for (let i = 3; i <= 30; i++) {
    let week = Math.ceil(i / 7);
    let theme = week === 1 ? "Descubrimiento" : week === 2 ? "Validación" : week === 3 ? "Construcción" : "Ejecución";
    
    MISSIONS.push({
        id: `day-${i}`,
        day_number: i,
        title: `Día ${i}: Misión de ${theme}`,
        description: `Esta es tu misión enfocada en ${theme}. Sigue las instrucciones.`,
        context: "La disciplina y la ejecución diaria son lo único que te separa de tus objetivos.",
        business_reason: "Cada paso que tomas aquí impacta tus ingresos a futuro.",
        tasks: [
            { id: "t1", description: "Realiza la acción principal del día.", status: false },
            { id: "t2", description: "Documenta el resultado.", status: false }
        ],
        expected_output: "Evidencia de la acción completada."
    });
}
