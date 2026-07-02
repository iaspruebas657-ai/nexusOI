import { MISSIONS } from './data/missions.mock.js';

class DEOSApp {
    static state = {
        user: {
            name: '',
            kaizen_level: 1,
            xp_total: 0,
            streak_days: 0,
            current_day: 1,
            status: 'active'
        },
        missions: [],
        evidence: []
    };

    static init() {
        console.log('🚀 Nexus OS (DEOS) Iniciado');
        this.loadData();
        this.setupEventListeners();
        
        if (!this.state.user.name) {
            this.navigate('onboarding');
        } else {
            this.renderDashboard();
            this.navigate('dashboard');
        }
    }

    static loadData() {
        try {
            const saved = localStorage.getItem('nexus_deos_state');
            if (saved) {
                this.state = JSON.parse(saved);
            }
        } catch (e) {
            console.error("Error loading state:", e);
        }
    }

    static saveData() {
        try {
            localStorage.setItem('nexus_deos_state', JSON.stringify(this.state));
        } catch (e) {
            console.error("Error saving state:", e);
        }
    }

    static setupEventListeners() {
        // Onboarding
        document.getElementById('btn-start-onboarding').addEventListener('click', () => {
            const input = document.getElementById('input-user-name');
            const error = document.getElementById('onboarding-error');
            const name = input.value.trim();
            if (name.length >= 2) {
                this.state.user.name = name;
                this.saveData();
                error.classList.add('hidden');
                this.renderDashboard();
                this.navigate('dashboard');
            } else {
                error.classList.remove('hidden');
            }
        });

        // Navigation
        document.getElementById('nav-dashboard').addEventListener('click', () => this.navigate('dashboard'));
        document.getElementById('nav-progress').addEventListener('click', () => {
            this.navigate('progress');
            this.renderProgress();
        });
        document.getElementById('nav-settings').addEventListener('click', () => this.navigate('settings'));

        document.getElementById('btn-start-mission').addEventListener('click', () => {
            this.navigate('mission');
            this.renderMission();
        });

        // Theme
        document.getElementById('btn-theme-toggle').addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
        });

        // Settings - Reset Demo
        document.getElementById('btn-reset-progress').addEventListener('click', () => {
            if (confirm('⚠️ ¿Estás seguro de reiniciar todo tu progreso? Volverás al Día 1.')) {
                localStorage.removeItem('nexus_deos_state');
                location.reload();
            }
        });

        // Settings - Export Progress
        document.getElementById('btn-export-progress').addEventListener('click', () => this.exportProgress());

        // Mission Logic
        document.getElementById('evidence-text').addEventListener('input', () => this.validateMissionCompletion());
        document.getElementById('btn-complete-mission').addEventListener('click', () => this.completeMission());
        
        // Modal logic
        document.getElementById('btn-close-modal').addEventListener('click', () => {
            this.hideModal();
            this.renderDashboard();
            this.navigate('dashboard');
        });
    }

    static navigate(view) {
        ['view-onboarding', 'view-dashboard', 'view-mission', 'view-progress', 'view-settings'].forEach(id => {
            document.getElementById(id).classList.add('hidden');
        });
        document.getElementById(`view-${view}`).classList.remove('hidden');

        // Hide sidebar on onboarding
        const sidebar = document.getElementById('sidebar');
        if (view === 'onboarding') {
            sidebar.classList.add('hidden');
            sidebar.classList.remove('flex');
            document.querySelector('header').classList.add('hidden');
        } else {
            sidebar.classList.remove('hidden');
            sidebar.classList.add('flex');
            document.querySelector('header').classList.remove('hidden');
        }

        // Update nav UI
        document.querySelectorAll('.nav-btn').forEach(btn => {
            if(!btn.disabled) {
                btn.classList.remove('bg-slate-800', 'border-indigo-500', 'text-white');
                btn.classList.add('text-slate-400', 'border-transparent');
            }
        });
        
        const activeNav = document.getElementById(`nav-${view}`);
        if(activeNav && !activeNav.disabled) {
            activeNav.classList.remove('text-slate-400', 'border-transparent');
            activeNav.classList.add('bg-slate-800', 'border-indigo-500', 'text-white');
        }
        
        // Lock mission nav if not active
        const navMission = document.getElementById('nav-mission');
        if (view === 'mission') {
            navMission.classList.remove('opacity-50', 'text-slate-400', 'border-transparent');
            navMission.classList.add('bg-slate-800', 'border-indigo-500', 'text-white');
        } else {
            navMission.classList.add('opacity-50', 'text-slate-400', 'border-transparent');
            navMission.classList.remove('bg-slate-800', 'border-indigo-500', 'text-white');
        }
    }

    static getCurrentMission() {
        return MISSIONS.find(m => m.day === this.state.user.current_day) || MISSIONS[MISSIONS.length - 1];
    }

    static renderDashboard() {
        const u = this.state.user;
        const mission = this.getCurrentMission();
        
        // Greeting
        document.getElementById('dash-greeting').textContent = `Hola, ${u.name || 'Emprendedor'}`;

        // Update Sidebar
        document.getElementById('nav-level').textContent = u.kaizen_level;
        document.getElementById('nav-xp').textContent = u.xp_total;
        document.getElementById('nav-day').textContent = u.current_day;
        document.getElementById('nav-streak').textContent = u.streak_days;
        
        const nextXp = u.kaizen_level * 1000;
        const xpPercent = Math.min((u.xp_total / nextXp) * 100, 100);
        document.getElementById('nav-xp-bar').style.width = `${xpPercent}%`;

        // Update Dashboard Stats
        document.getElementById('dash-level').textContent = u.kaizen_level;
        document.getElementById('dash-streak').textContent = u.streak_days;
        
        // Update Action Card
        document.getElementById('dash-mission-title').textContent = mission.title;
        document.getElementById('dash-mission-time').textContent = mission.estimated_time;
        document.getElementById('dash-mission-stage').textContent = mission.orbita_stage;

        // Progress
        document.getElementById('dash-current-day').textContent = u.current_day;
        const totalProgress = Math.round(((u.current_day - 1) / 30) * 100);
        document.getElementById('dash-progress-text').textContent = `${totalProgress}% Completado`;
        document.getElementById('dash-progress-bar').style.width = `${totalProgress}%`;
    }

    static renderMission() {
        const mission = this.getCurrentMission();
        document.getElementById('mission-title').textContent = mission.title;
        document.getElementById('mission-badge').textContent = `Fase: ${mission.phase} | Etapa ÓRBITA: ${mission.orbita_stage}`;
        document.getElementById('mission-context').textContent = mission.context;
        document.getElementById('mission-reason').textContent = mission.business_reason;
        
        document.getElementById('mission-output').textContent = mission.expected_output;
        document.getElementById('evidence-text').placeholder = mission.evidence_placeholder || "Ingresa tu evidencia aquí...";

        const tasksContainer = document.getElementById('mission-tasks');
        tasksContainer.innerHTML = mission.tasks.map((t, index) => `
            <label class="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                <input type="checkbox" class="mission-checkbox mt-1 w-6 h-6 accent-indigo-600 rounded" data-index="${index}">
                <span class="text-slate-700 dark:text-slate-300 font-medium">${t.text}</span>
            </label>
        `).join('');

        // Reset Evidence and button
        document.getElementById('evidence-text').value = '';
        this.validateMissionCompletion();

        // Add listeners to checkboxes
        document.querySelectorAll('.mission-checkbox').forEach(cb => {
            cb.addEventListener('change', () => this.validateMissionCompletion());
        });
    }

    static validateMissionCompletion() {
        const checkboxes = Array.from(document.querySelectorAll('.mission-checkbox'));
        const allChecked = checkboxes.length > 0 && checkboxes.every(cb => cb.checked);
        const evidenceText = document.getElementById('evidence-text').value.trim();

        const btn = document.getElementById('btn-complete-mission');
        const warning = document.getElementById('mission-warning');

        // Validation rule: Must have checked all checkboxes and evidence must be >= 5 chars
        if (allChecked && evidenceText.length >= 5) {
            btn.disabled = false;
            btn.classList.remove('bg-slate-300', 'text-slate-500', 'cursor-not-allowed');
            btn.classList.add('bg-indigo-600', 'text-white', 'hover:bg-indigo-700', 'hover:scale-105');
            btn.innerHTML = '<i class="fas fa-check-circle mr-2"></i> Completar misión';
            warning.classList.add('hidden');
        } else {
            btn.disabled = true;
            btn.classList.add('bg-slate-300', 'text-slate-500', 'cursor-not-allowed');
            btn.classList.remove('bg-indigo-600', 'text-white', 'hover:bg-indigo-700', 'hover:scale-105');
            btn.innerHTML = '<i class="fas fa-lock mr-2"></i> Completar misión';
            warning.classList.remove('hidden');
        }
    }

    static completeMission() {
        const mission = this.getCurrentMission();
        const evidenceText = document.getElementById('evidence-text').value.trim();
        
        // Save Evidence
        this.state.evidence.push({
            id: Date.now().toString(),
            mission_id: mission.id,
            type: 'text',
            content: evidenceText,
            timestamp: new Date().toISOString()
        });

        // Update User Progression
        const xpReward = mission.xp_reward || 50;
        this.state.user.xp_total += xpReward;
        this.state.user.streak_days += 1;
        
        // Level up logic
        let levelUp = false;
        if (this.state.user.xp_total >= this.state.user.kaizen_level * 1000) {
            this.state.user.kaizen_level += 1;
            levelUp = true;
        }

        // Advance Day
        if (this.state.user.current_day < 30) {
            this.state.user.current_day += 1;
        }

        this.saveData();
        
        // Show Success Modal
        this.showSuccessModal(xpReward, this.getCurrentMission().title, levelUp);
    }

    static showSuccessModal(xpGained, nextMissionTitle, levelUp) {
        document.getElementById('modal-xp-gained').textContent = \`+\${xpGained} XP\`;
        document.getElementById('modal-next-mission').textContent = nextMissionTitle;
        
        if (levelUp) {
            document.getElementById('modal-xp-gained').textContent += \` | ¡KAIZEN LEVEL UP! Nivel \${this.state.user.kaizen_level}\`;
        }

        const modal = document.getElementById('modal-success');
        const modalContent = document.getElementById('modal-success-content');
        
        modal.classList.remove('hidden');
        // Trigger reflow for animation
        void modal.offsetWidth;
        
        modal.classList.remove('opacity-0');
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    }

    static hideModal() {
        const modal = document.getElementById('modal-success');
        const modalContent = document.getElementById('modal-success-content');
        
        modal.classList.add('opacity-0');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
        
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300); // Matches transition duration
    }

    static exportProgress() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.state, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `deos_progreso_dia_${this.state.user.current_day}.json`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }

    static renderProgress() {
        const currentDay = this.state.user.current_day;
        
        for (let w = 1; w <= 4; w++) {
            const container = document.getElementById(`week-${w}-progress`);
            const startDay = (w - 1) * 7 + 1;
            const endDay = Math.min(w * 7, 30);
            
            if (currentDay >= startDay) {
                container.classList.remove('opacity-50');
                let html = '';
                for (let d = startDay; d <= endDay; d++) {
                    const status = d < currentDay ? 'bg-green-500 text-white shadow-md' : (d === currentDay ? 'bg-indigo-500 text-white animate-pulse shadow-md' : 'bg-slate-200 dark:bg-slate-700 text-slate-400');
                    const icon = d < currentDay ? 'fa-check' : (d === currentDay ? 'fa-crosshairs' : 'fa-lock');
                    
                    const m = MISSIONS.find(mx => mx.day === d) || { title: `Misión ${d}` };
                    
                    html += `
                        <div class="flex items-center gap-3 p-3 rounded-xl transition-all ${d === currentDay ? 'bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800' : 'hover:bg-slate-50 dark:hover:bg-slate-800 border border-transparent'}">
                            <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${status}">
                                <i class="fas ${icon}"></i>
                            </div>
                            <div class="flex flex-col min-w-0">
                                <span class="text-xs font-bold text-slate-500">Día ${d}</span>
                                <span class="text-sm font-bold truncate ${d <= currentDay ? 'text-slate-800 dark:text-white' : 'text-slate-400'}">${m.title}</span>
                            </div>
                        </div>
                    `;
                }
                container.innerHTML = html;
            } else {
                container.classList.add('opacity-50');
                container.innerHTML = `<div class="p-4 bg-slate-100 dark:bg-slate-900 rounded-xl text-center"><p class="text-sm text-slate-500"><i class="fas fa-lock mb-2 block text-2xl"></i> Semana Bloqueada</p></div>`;
            }
        }
    }
}

function initApp() {
    console.log("INIT APP OK");
    DEOSApp.init();
}

// Attach exactly as requested, but handle module deferred timing safely
if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}
