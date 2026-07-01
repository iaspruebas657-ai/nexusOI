/**
 * Nexus Pro v9.0 - Configuration
 * Centralized application constants and feature flags
 */

export const CONFIG = {
    // Application Info
    APP_NAME: 'Nexus Pro',
    VERSION: '9.0.0',
    STORAGE_KEY: 'nexus_pro_v9_0',
    LEGACY_STORAGE_KEY: 'nexus_pro_v8_5',

    // Limits
    PROJECT_LIMIT: 50,
    MAX_TASK_TITLE_LENGTH: 200,
    MAX_PROJECT_NAME_LENGTH: 100,
    MAX_HABIT_NAME_LENGTH: 50,

    // Gamification
    XP: {
        TASK_COMPLETE: 10,
        HABIT_COMPLETE: 15,
        FOCUS_MINUTE: 1,
        PROJECT_COMPLETE: 50,
        LEVEL_MULTIPLIER: 1.2,
        INITIAL_LEVEL_XP: 100
    },

    // Focus Timer (seconds)
    FOCUS: {
        WORK: 25 * 60,
        SHORT_BREAK: 5 * 60,
        LONG_BREAK: 15 * 60,
        TICK_INTERVAL: 1000
    },

    // UI
    TOAST_DURATION: 3000,
    DEBOUNCE_SEARCH: 300,
    DEBOUNCE_AUTOSAVE: 1000,
    ANIMATION_DURATION: 300,

    // Alarms
    ALARM_CHECK_INTERVAL: 2000,

    // Performance
    PERFORMANCE_THRESHOLD: 16.67, // 60fps

    // Messages
    MESSAGES: {
        TASK_CREATED: 'Tarea creada exitosamente',
        TASK_UPDATED: 'Tarea actualizada',
        TASK_DELETED: 'Tarea eliminada',
        PROJECT_SAVED: 'Proyecto guardado',
        PROJECT_DELETED: 'Proyecto eliminado',
        HABIT_CREATED: 'Hábito creado',
        LEVEL_UP: '¡NIVEL SUBIDO!',
        CYCLE_COMPLETE: 'Ciclo Completado',
        ERROR_REQUIRED: 'Campo obligatorio',
        ERROR_NAME: 'Falta el nombre',
        ERROR_SAVE: 'Error al guardar',
        ERROR_LOAD: 'Error al cargar datos',
        NOTIFICATIONS_ENABLED: 'Notificaciones activadas',
        API_KEY_SAVED: 'API Key guardada de forma segura',
        DATA_EXPORTED: 'Datos exportados',
        DATA_IMPORTED: 'Datos importados correctamente'
    },

    // Feature Flags
    FEATURES: {
        ENCRYPTION_ENABLED: true,
        PERFORMANCE_MONITORING: true,
        A11Y_ANNOUNCEMENTS: true,
        CONFETTI_ENABLED: true
    }
};

export default CONFIG;
