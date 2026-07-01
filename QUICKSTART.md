# 🚀 Quick Start Guide - Nexus Pro v9.0

## Inicio Rápido (5 minutos)

### Paso 1: Abrir la Aplicación

**Opción A: Live Server (Recomendado)**
1. Abre VS Code
2. Instala la extensión "Live Server"
3. Click derecho en `index.html` → "Open with Live Server"
4. Se abrirá automáticamente en `http://localhost:5500`

**Opción B: Servidor Local**
```bash
# Con Python
python -m http.server 8000

# Con Node.js
npx http-server -p 8000

# Luego abre: http://localhost:8000
```

**Opción C: Directamente en el Navegador**
- Arrastra `index.html` al navegador
- ⚠️ Algunos módulos ES6 pueden no cargar en `file://`

---

### Paso 2: Primera Configuración

1. **Activar Notificaciones** (Opcional)
   - Ve a ⚙️ **Configuración**
   - Click en "Activar Notificaciones de Escritorio"
   - Acepta el permiso del navegador

2. **Crear tu Primera Tarea**
   - Ve a 📋 **Día de Trabajo**
   - Click en "+ Nueva Tarea"
   - Escribe: "Probar Nexus Pro v9.0"
   - Selecciona prioridad: **Alta 🔥**
   - Click en **Guardar**

3. **Completar la Tarea**
   - Marca el checkbox ✅
   - ¡Verás confetti y ganarás 10 XP! 🎉

---

### Paso 3: Crear un Proyecto

1. Click en **"Crear Proyecto"** (botón superior derecho)
2. Completa:
   - **Nombre**: "Mi Primer Proyecto"
   - **Estado**: Activo
   - **Deadline**: Selecciona una fecha
3. Click en **Guardar**
4. Ve a 📁 **Proyectos** para verlo en la tabla

---

### Paso 4: Crear un Hábito

1. Ve a ❤️ **Hábitos**
2. Click en "+ Nuevo Hábito"
3. Escribe: "Ejercicio 30 min"
4. Click en **Crear**
5. Marca el hábito como completado
6. ¡Tu racha aumentará! 🔥

---

### Paso 5: Usar el Focus Timer

1. Ve a ⏱️ **Focus Timer**
2. Selecciona duración: **25m** (Pomodoro)
3. Click en **INICIAR**
4. El timer comenzará a contar
5. Al finalizar:
   - Sonará una alarma
   - Ganarás 25 XP
   - Verás confetti 🎊

---

## 🎯 Funcionalidades Clave

### Gamificación
- **XP por tarea completada**: 10 XP
- **XP por hábito**: 15 XP
- **XP por minuto de foco**: 1 XP
- **Subir de nivel**: Cada nivel requiere más XP

### Navegación por Teclado
- `Tab`: Navegar entre elementos
- `Enter` / `Space`: Activar botones
- `Esc`: Cerrar modales
- `Alt + 1-6`: Ir a secciones (futuro)

### Atajos Útiles
- **Crear Tarea**: Click en "+ Nueva Tarea"
- **Crear Proyecto**: Click en "Crear Proyecto"
- **Buscar Proyectos**: Usa el campo de búsqueda
- **Exportar Datos**: Configuración → "Exportar Backup"

---

## 🔧 Configuración Avanzada

### Personalizar Límites

Edita `config.js`:
```javascript
export const CONFIG = {
    PROJECT_LIMIT: 50,              // Cambiar a 100
    XP: {
        TASK_COMPLETE: 10,          // Cambiar a 20
        HABIT_COMPLETE: 15,         // Cambiar a 30
    }
};
```

### Activar Debug Mode

En la consola del navegador:
```javascript
import { eventBus } from './core/event-bus.js';
eventBus.setDebugMode(true);
```

### Ver Historial de Estado

```javascript
import { state } from './app.js';
console.table(state.getHistory());
```

---

## 📊 Datos de Ejemplo

### Importar Datos de Prueba

1. Crea un archivo `sample-data.json`:
```json
{
    "projects": [
        {
            "id": "1",
            "name": "Proyecto Demo",
            "status": "Activo",
            "deadline": "2025-12-31",
            "tasks": [],
            "progress": 0
        }
    ],
    "tasks": [
        {
            "id": "1",
            "title": "Tarea de ejemplo",
            "priority": "Alta",
            "isUpcoming": false,
            "completed": false
        }
    ],
    "habits": [
        {
            "id": "1",
            "name": "Leer 15 minutos",
            "streak": 5,
            "lastCompleted": null
        }
    ],
    "gamification": {
        "xp": 100,
        "level": 2,
        "nextLevelXp": 120
    },
    "stats": {
        "focusMinutes": 50
    }
}
```

2. Ve a ⚙️ **Configuración**
3. Click en **"Importar"**
4. Selecciona `sample-data.json`
5. ¡Datos cargados! 🎉

---

## 🐛 Solución Rápida de Problemas

### "Los módulos no cargan"
**Causa**: Navegador bloqueando módulos ES6 en `file://`

**Solución**: Usa un servidor local (Live Server, http-server)

---

### "localStorage lleno"
**Causa**: Demasiados datos (límite 5-10MB)

**Solución**:
1. Exporta un backup
2. Borra datos antiguos
3. Importa solo lo necesario

---

### "Notificaciones no funcionan"
**Causa**: Permisos bloqueados

**Solución**:
1. Configuración del navegador → Permisos
2. Permitir notificaciones para el sitio
3. Recargar la página

---

## 📱 Uso en Móvil

### Instalación como PWA (Futuro)
1. Abre en Chrome/Safari móvil
2. Menú → "Añadir a pantalla de inicio"
3. Usa como app nativa

### Navegación Móvil
- **Menú**: Click en ☰ (hamburguesa)
- **Cerrar menú**: Click fuera o en ✕
- **Gestos**: Swipe para cerrar toasts (futuro)

---

## 🎓 Tutoriales

### Tutorial 1: Workflow Diario
1. **Mañana**: Crea tareas para hoy
2. **Durante el día**: Usa Focus Timer
3. **Noche**: Marca hábitos completados
4. **Revisa**: Dashboard para ver progreso

### Tutorial 2: Gestión de Proyectos
1. Crea proyecto con deadline
2. Añade tareas al proyecto (futuro)
3. Monitorea progreso en tabla
4. Marca como completado al finalizar

### Tutorial 3: Construir Hábitos
1. Crea hábito específico ("Leer 15 min")
2. Marca diariamente
3. Observa racha crecer
4. Celebra milestones (7, 30, 100 días)

---

## 📚 Recursos Adicionales

- **README.md**: Documentación completa
- **Walkthrough.md**: Comparativa v8.5 vs v9.0
- **Implementation Plan**: Detalles técnicos
- **Consola del navegador**: Logs de debug

---

## 🆘 Soporte

### Reportar Bug
1. Abre consola del navegador (F12)
2. Reproduce el error
3. Copia el mensaje de error
4. Reporta con pasos para reproducir

### Sugerir Mejora
1. Describe la funcionalidad deseada
2. Explica el caso de uso
3. Propón implementación (opcional)

---

## 🎉 ¡Listo para Empezar!

Ahora tienes todo lo necesario para usar Nexus Pro v9.0 como un profesional.

**Próximos pasos sugeridos**:
1. ✅ Crear 3 tareas para hoy
2. ✅ Configurar 1 hábito diario
3. ✅ Hacer un Pomodoro de 25 minutos
4. ✅ Revisar tu progreso en Dashboard

**¡Disfruta de la productividad! 🚀**

---

*Nexus Pro v9.0 - Professional Edition*
