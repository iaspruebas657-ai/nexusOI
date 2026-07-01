import { MISSIONS } from './data/missions.mock.js';

class DEOSApp {
    static state = {
        user: {
            kaizen_level: 1,
            xp_total: 0,
            streak_days: 0,
            current_day: 1,
            status: 'active'
        },
        evidence: []
    };

    static init() {
        console.log('🚀 Nexus OS (DEOS) Iniciado');
        this.loadData();
        this.setupEventListeners();
        this.renderDashboard();
    }

    static loadData() {
        const saved = localStorage.getItem('nexus_deos_state');
        if (saved) {
            this.state = JSON.parse(saved);
        } else {
            // Check if old CRM data exists and nuke it for safety in MVP
            localStorage.removeItem('nexus_state');
            this.saveData();
        }
    }

    static saveData() {
        localStorage.setItem('nexus_deos_state', JSON.stringify(this.state));
    }

    static setupEventListeners() {
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

        // Settings
        document.getElementById('btn-reset-progress').addEventListener('click', () => {
            if (confirm('⚠️ ¿Estás seguro de reiniciar todo tu progreso? Esto no se puede deshacer.')) {
                localStorage.removeItem('nexus_deos_state');
                location.reload();
            }
        });

        // Mission Logic
        document.getElementById('evidence-text').addEventListener('input', () => this.validateMissionCompletion());
        document.getElementById('btn-complete-mission').addEventListener('click', () => this.completeMission());
    }

    static navigate(view) {
        ['view-dashboard', 'view-mission', 'view-progress', 'view-settings'].forEach(id => {
            document.getElementById(id).classList.add('hidden');
        });
        document.getElementById(`view-${view}`).classList.remove('hidden');

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
        return MISSIONS.find(m => m.day_number === this.state.user.current_day) || MISSIONS[MISSIONS.length - 1];
    }

    static renderDashboard() {
        const u = this.state.user;
        
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
        document.getElementById('dash-xp').textContent = u.xp_total;
        document.getElementById('dash-streak').textContent = u.streak_days;
        document.getElementById('dash-status').textContent = u.status;

        // Update Action Card
        const mission = this.getCurrentMission();
        document.getElementById('dash-mission-title').textContent = mission.title;
        document.getElementById('dash-mission-desc').textContent = mission.description;

        // Progress
        document.getElementById('dash-progress-text').textContent = `Día ${u.current_day} de 30`;
        document.getElementById('dash-progress-bar').style.width = `${(u.current_day / 30) * 100}%`;
    }

    static renderMission() {
        const mission = this.getCurrentMission();
        document.getElementById('mission-title').textContent = mission.title;
        document.getElementById('mission-context').textContent = mission.context;
        document.getElementById('mission-reason').textContent = mission.business_reason;
        document.getElementById('mission-output').textContent = mission.expected_output;

        const tasksContainer = document.getElementById('mission-tasks');
        tasksContainer.innerHTML = mission.tasks.map((t, index) => `
            <label class="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors">
                <input type="checkbox" class="mission-checkbox mt-1 w-5 h-5 accent-indigo-600" data-index="${index}">
                <span class="text-slate-700 dark:text-slate-300">${t.description}</span>
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

        if (allChecked && evidenceText.length > 5) {
            btn.disabled = false;
            btn.classList.remove('bg-slate-300', 'text-slate-500', 'cursor-not-allowed');
            btn.classList.add('bg-indigo-600', 'text-white', 'hover:bg-indigo-700', 'hover:scale-105');
            btn.innerHTML = '<i class="fas fa-check-circle mr-2"></i> COMPLETE MISSION';
            warning.classList.add('hidden');
        } else {
            btn.disabled = true;
            btn.classList.add('bg-slate-300', 'text-slate-500', 'cursor-not-allowed');
            btn.classList.remove('bg-indigo-600', 'text-white', 'hover:bg-indigo-700', 'hover:scale-105');
            btn.innerHTML = '<i class="fas fa-lock mr-2"></i> COMPLETE MISSION';
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
        this.state.user.xp_total += 500;
        this.state.user.streak_days += 1;
        
        // Level up logic (simple)
        if (this.state.user.xp_total >= this.state.user.kaizen_level * 1000) {
            this.state.user.kaizen_level += 1;
            alert(`🎉 ¡KAIZEN LEVEL UP! Nivel ${this.state.user.kaizen_level}`);
        }

        // Advance Day
        if (this.state.user.current_day < 30) {
            this.state.user.current_day += 1;
        }

        this.saveData();
        
        // Visual Feedback
        alert('✅ Misión completada. Has ganado 500 XP.');
        
        this.renderDashboard();
        this.navigate('dashboard');
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
                    const status = d < currentDay ? 'bg-green-500 text-white' : (d === currentDay ? 'bg-indigo-500 text-white animate-pulse' : 'bg-slate-200 dark:bg-slate-700 text-slate-400');
                    const icon = d < currentDay ? 'fa-check' : (d === currentDay ? 'fa-crosshairs' : 'fa-lock');
                    
                    html += `
                        <div class="flex items-center gap-3 p-2 rounded-lg ${d === currentDay ? 'bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800' : ''}">
                            <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${status}">
                                <i class="fas ${icon}"></i>
                            </div>
                            <span class="text-sm font-bold ${d <= currentDay ? 'text-slate-800 dark:text-white' : 'text-slate-400'}">Día ${d}</span>
                        </div>
                    `;
                }
                container.innerHTML = html;
            } else {
                container.classList.add('opacity-50');
                container.innerHTML = `<p class="text-sm text-slate-500"><i class="fas fa-lock mr-1"></i> Bloqueado.</p>`;
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => DEOSApp.init());
