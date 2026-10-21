import {
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  TEST_USERS,
  PROFILE_CONTACT,
  INITIAL_PROJECTS,
  INITIAL_SETUP,
  INITIAL_COUPLE_DATA,
  INITIAL_SHELF_DATA
} from './data.js';

// Inicializar Cliente Supabase
const { createClient } = window.supabase;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Estado da Aplicação
let currentUser = JSON.parse(localStorage.getItem('jg_user')) || null;
let projects = [];
let coupleData = { viagens: [], restaurantes: [], filmes: [], jogos: [] };
let couplePhotos = [];
let shelfData = { jogos: [], filmes: [], series: [], concertos: [] };

let activeProjectFilter = 'all';

// Estado Casal
let activeCat = 'viagens';
let coupleStatusFilter = 'all';
let coupleSortBy = 'pending-first';
let coupleSearchQuery = '';

// Estado Biblioteca Cultural
let activeShelfCat = 'jogos';
let shelfSearchQuery = '';
let shelfStatusFilter = 'all';
let shelfSortBy = 'active-first';

// Datas do Casal (1/01/2026 e 1/04/2026)
const DATE_TOGETHER = new Date(2026, 0, 1, 0, 0, 0);
const DATE_DATING = new Date(2026, 3, 1, 0, 0, 0);

// ==================== INICIALIZAÇÃO ====================
document.addEventListener('DOMContentLoaded', async () => {
  renderSetup();
  renderAboutContact();
  updateAuthUI();
  startRelationshipTimers();
  setupNavigation();
  setupCaseStudyModal();
  setupCyberTerminal();
  setupCoupleEvents();
  setupPhotoModalEvents();
  setupShelfEvents();
  setupCMSEvents();
  setupAuthEvents();
  setupBackupReset();
  registerPWA();

  // Carregar dados da nuvem e ativar WebSockets
  await loadAllDataFromSupabase();
  setupRealtimeSubscriptions();

  refreshIcons();
});

function refreshIcons() {
  if (window.lucide) window.lucide.createIcons();
}

function toast(msg) {
  const box = document.getElementById('toast-box');
  const el = document.createElement('div');
  el.className = 'toast';
  el.textContent = msg;
  box.appendChild(el);
  setTimeout(() => el.remove(), 2800);
}

// ==================== CARREGAMENTO DE DADOS SUPABASE ====================
async function loadAllDataFromSupabase() {
  try {
    // 1. Projetos
    const { data: projData } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (projData && projData.length > 0) {
      projects = projData;
    } else {
      // Se a tabela estiver vazia, popula com os projetos iniciais
      await supabase.from('projects').insert(INITIAL_PROJECTS.map(p => ({
        title: p.title,
        category: p.category,
        image: p.image,
        description: p.description,
        problem: p.problem,
        architecture: p.architecture,
        challenges: p.challenges,
        stack: p.stack,
        status: p.status,
        link: p.link
      })));
      const { data: refetched } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      projects = refetched || [];
    }
    renderProjects();

    // 2. Fotos do Casal
    const { data: photos } = await supabase.from('couple_photos').select('*').order('id', { ascending: true });
    if (photos && photos.length > 0) {
      couplePhotos = photos;
      renderCouplePhotos();
    }

    // 3. Espaço de Casal
    const { data: cItems } = await supabase.from('couple_items').select('*').order('created_at', { ascending: false });
    if (cItems && cItems.length > 0) {
      coupleData = { viagens: [], restaurantes: [], filmes: [], jogos: [] };
      cItems.forEach(i => {
        if (coupleData[i.category]) {
          coupleData[i.category].push({
            id: i.id,
            title: i.title,
            meta: i.meta,
            notes: i.notes,
            mapsUrl: i.maps_url,
            done: i.done,
            checklist: i.checklist || []
          });
        }
      });
    } else {
      // Se a tabela estiver vazia, popula com os dados iniciais
      const seedItems = [];
      Object.keys(INITIAL_COUPLE_DATA).forEach(cat => {
        INITIAL_COUPLE_DATA[cat].forEach(item => {
          seedItems.push({
            category: cat,
            title: item.title,
            meta: item.meta,
            notes: item.notes,
            maps_url: item.mapsUrl || '',
            done: item.done,
            checklist: item.checklist || []
          });
        });
      });
      await supabase.from('couple_items').insert(seedItems);
      const { data: refetchedItems } = await supabase.from('couple_items').select('*').order('created_at', { ascending: false });
      refetchedItems?.forEach(i => {
        if (coupleData[i.category]) {
          coupleData[i.category].push({
            id: i.id,
            title: i.title,
            meta: i.meta,
            notes: i.notes,
            mapsUrl: i.maps_url,
            done: i.done,
            checklist: i.checklist || []
          });
        }
      });
    }
    renderCoupleSection();

    // 4. Biblioteca Cultural
    const { data: sItems } = await supabase.from('shelf_items').select('*').order('created_at', { ascending: false });
    if (sItems && sItems.length > 0) {
      shelfData = { jogos: [], filmes: [], series: [], concertos: [] };
      sItems.forEach(i => {
        if (shelfData[i.category]) {
          shelfData[i.category].push({
            id: i.id,
            title: i.title,
            meta: i.meta,
            status: i.status,
            rating: i.rating,
            cover: i.cover,
            review: i.review
          });
        }
      });
    } else {
      const seedShelf = [];
      Object.keys(INITIAL_SHELF_DATA).forEach(cat => {
        INITIAL_SHELF_DATA[cat].forEach(item => {
          seedShelf.push({
            category: cat,
            title: item.title,
            meta: item.meta,
            status: item.status,
            rating: item.rating,
            cover: item.cover,
            review: item.review
          });
        });
      });
      await supabase.from('shelf_items').insert(seedShelf);
      const { data: refetchedShelf } = await supabase.from('shelf_items').select('*').order('created_at', { ascending: false });
      refetchedShelf?.forEach(i => {
        if (shelfData[i.category]) {
          shelfData[i.category].push({
            id: i.id,
            title: i.title,
            meta: i.meta,
            status: i.status,
            rating: i.rating,
            cover: i.cover,
            review: i.review
          });
        }
      });
    }
    renderShelf();

  } catch (err) {
    console.error("Erro a carregar dados do Supabase:", err);
  }
}

// ==================== SINCRONIZAÇÃO EM TEMPO REAL (REALTIME) ====================
function setupRealtimeSubscriptions() {
  supabase
    .channel('schema-db-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'couple_items' }, async () => {
      const { data } = await supabase.from('couple_items').select('*').order('created_at', { ascending: false });
      coupleData = { viagens: [], restaurantes: [], filmes: [], jogos: [] };
      data?.forEach(i => {
        if (coupleData[i.category]) {
          coupleData[i.category].push({
            id: i.id,
            title: i.title,
            meta: i.meta,
            notes: i.notes,
            mapsUrl: i.maps_url,
            done: i.done,
            checklist: i.checklist || []
          });
        }
      });
      renderCoupleSection();
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'couple_photos' }, async () => {
      const { data } = await supabase.from('couple_photos').select('*').order('id', { ascending: true });
      if (data) {
        couplePhotos = data;
        renderCouplePhotos();
      }
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'shelf_items' }, async () => {
      const { data } = await supabase.from('shelf_items').select('*').order('created_at', { ascending: false });
      shelfData = { jogos: [], filmes: [], series: [], concertos: [] };
      data?.forEach(i => {
        if (shelfData[i.category]) {
          shelfData[i.category].push({
            id: i.id,
            title: i.title,
            meta: i.meta,
            status: i.status,
            rating: i.rating,
            cover: i.cover,
            review: i.review
          });
        }
      });
      renderShelf();
    })
    .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, async () => {
      const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      if (data) {
        projects = data;
        renderProjects();
      }
    })
    .subscribe();
}

// ==================== PWA ====================
function registerPWA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }

  let deferredPrompt = null;
  const installBtn = document.getElementById('install-pwa-btn');

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.classList.remove('hidden');
  });

  installBtn?.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installBtn.classList.add('hidden');
  });
}

// ==================== CONTADORES DE TEMPO ====================
function startRelationshipTimers() {
  const update = () => {
    const now = new Date();
    renderSingleTimer(DATE_TOGETHER, now, 'timer-together', 'timer-together-days');
    renderSingleTimer(DATE_DATING, now, 'timer-dating', 'timer-dating-days');
  };
  update();
  setInterval(update, 1000);
}

function renderSingleTimer(startDate, now, digitsId, subId) {
  const diffMs = Math.max(0, now - startDate);
  const totalSeconds = Math.floor(diffMs / 1000);
  const totalDays = Math.floor(totalSeconds / 86400);

  let months = (now.getFullYear() - startDate.getFullYear()) * 12 + (now.getMonth() - startDate.getMonth());
  let tempDate = new Date(startDate);
  tempDate.setMonth(tempDate.getMonth() + months);
  if (tempDate > now) {
    months--;
    tempDate = new Date(startDate);
    tempDate.setMonth(tempDate.getMonth() + months);
  }
  const remDays = Math.floor((now - tempDate) / 86400000);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const digitsEl = document.getElementById(digitsId);
  const subEl = document.getElementById(subId);

  if (digitsEl) {
    digitsEl.textContent = `${months}M : ${remDays}D : ${String(hours).padStart(2, '0')}H : ${String(mins).padStart(2, '0')}M : ${String(secs).padStart(2, '0')}S`;
  }
  if (subEl) {
    subEl.textContent = `Total acumulado: ${totalDays} dias juntos`;
  }
}

// ==================== NAVEGAÇÃO ====================
function setupNavigation() {
  const triggers = document.querySelectorAll('.nav-trigger');
  const panels = document.querySelectorAll('.view-panel');

  const switchView = (target) => {
    triggers.forEach(b => b.classList.toggle('active', b.dataset.view === target));
    panels.forEach(p => p.classList.remove('active'));
    document.getElementById(`view-${target}`)?.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.view) switchView(btn.dataset.view);
    });
  });

  document.getElementById('brand-home').addEventListener('click', () => switchView('portfolio'));

  document.querySelectorAll('[data-goto-view]').forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.gotoView));
  });

  const subTabs = document.querySelectorAll('.sub-tab');
  const subPanels = document.querySelectorAll('.subview-panel');
  subTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      subTabs.forEach(t => t.classList.remove('active'));
      subPanels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`subview-${tab.dataset.subview}`).classList.add('active');
    });
  });

  document.querySelectorAll('#project-filters .filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#project-filters .filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeProjectFilter = chip.dataset.filter;
      renderProjects();
    });
  });
}

// ==================== PORTEFÓLIO & CASE STUDY ====================
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  const list = activeProjectFilter === 'all'
    ? projects
    : projects.filter(p => p.status === activeProjectFilter);

  grid.innerHTML = list.map(p => `
    <article class="project-card">
      <div class="project-cover">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <span class="cover-badge mono">${p.status}</span>
      </div>
      <div class="project-body">
        <div>
          <span class="mono red-text">// ${p.category.toUpperCase()}</span>
          <h3>${p.title}</h3>
          <p>${p.description}</p>
        </div>
        <div>
          <div class="stack-tags">
            ${(p.stack || []).map(s => `<span class="stack-tag mono">${s}</span>`).join('')}
          </div>
          <div class="project-actions-row">
            <button type="button" class="repo-link mono open-case-btn" data-proj-id="${p.id}">
              <i data-lucide="cpu"></i> CASE STUDY TÉCNICO
            </button>
            <a href="${p.link}" target="_blank" class="repo-link mono">
              GITHUB <i data-lucide="arrow-up-right"></i>
            </a>
          </div>
        </div>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.open-case-btn').forEach(btn => {
    btn.addEventListener('click', () => openCaseStudy(Number(btn.dataset.projId)));
  });

  refreshIcons();
}

function setupCaseStudyModal() {
  const modal = document.getElementById('case-study-modal');
  document.getElementById('close-case-modal').addEventListener('click', () => modal.classList.add('hidden'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });
}

function openCaseStudy(id) {
  const p = projects.find(item => item.id === id);
  if (!p) return;

  const content = document.getElementById('case-study-content');
  content.innerHTML = `
    <span class="mono red-text">// CASE STUDY TÉCNICO // ${p.category.toUpperCase()}</span>
    <h2 style="margin-top:0.25rem;">${p.title}</h2>
    <img src="${p.image}" alt="${p.title}" class="case-banner">

    <div class="case-block">
      <h4 class="mono">01 // O PROBLEMA & OBJETIVO</h4>
      <p>${p.problem || p.description}</p>
    </div>

    <div class="case-block">
      <h4 class="mono">02 // ARQUITETURA & IMPLEMENTAÇÃO</h4>
      <p>${p.architecture || "Arquitetura modular desenhada à medida dos requisitos."}</p>
    </div>

    <div class="case-block">
      <h4 class="mono">03 // DESAFIOS TÉCNICOS SUPERADOS</h4>
      <p>${p.challenges || "Otimização de recursos e fiabilidade em execução."}</p>
    </div>

    <div class="stack-tags" style="margin-top:1rem;">
      ${(p.stack || []).map(s => `<span class="stack-tag mono">${s}</span>`).join('')}
    </div>

    <a href="${p.link}" target="_blank" class="btn-red full-w" style="margin-top:0.5rem;">
      VER NO GITHUB <i data-lucide="external-link"></i>
    </a>
  `;

  document.getElementById('case-study-modal').classList.remove('hidden');
  refreshIcons();
}

// ==================== SETUP & SOBRE/CONTACTO ====================
function renderSetup() {
  const grid = document.getElementById('setup-grid');
  grid.innerHTML = INITIAL_SETUP.map(group => `
    <div class="cyber-card uses-box">
      <h3><i data-lucide="${group.icon}"></i> ${group.category}</h3>
      <ul class="uses-list">
        ${group.items.map(item => `
          <li>
            <strong class="mono">${item.name}</strong>
            <span>${item.detail}</span>
          </li>
        `).join('')}
      </ul>
    </div>
  `).join('');
  refreshIcons();
}

function renderAboutContact() {
  document.getElementById('about-location').textContent = `📍 ${PROFILE_CONTACT.location} // ${PROFILE_CONTACT.role}`;
  document.getElementById('about-bio-text').textContent = PROFILE_CONTACT.bio;
  document.getElementById('link-github').href = PROFILE_CONTACT.github;
  document.getElementById('link-linkedin').href = PROFILE_CONTACT.linkedin;
  document.getElementById('link-instagram').href = PROFILE_CONTACT.instagram;

  const copyCard = document.getElementById('copy-email-card');
  copyCard.addEventListener('click', () => {
    navigator.clipboard.writeText(PROFILE_CONTACT.email);
    document.getElementById('copy-email-badge').textContent = 'COPIADO!';
    document.getElementById('display-email-text').textContent = PROFILE_CONTACT.email;
    toast(`E-mail copiado: ${PROFILE_CONTACT.email}`);
    setTimeout(() => {
      document.getElementById('copy-email-badge').textContent = 'COPIAR';
    }, 3000);
  });
}

// ==================== TERMINAL CYBERPUNK ====================
function setupCyberTerminal() {
  const modal = document.getElementById('terminal-modal');
  const openBtn = document.getElementById('open-terminal-btn');
  const heroBtn = document.getElementById('hero-terminal-btn');
  const closeBtn = document.getElementById('close-terminal');
  const form = document.getElementById('terminal-form');
  const input = document.getElementById('terminal-input');
  const output = document.getElementById('terminal-output');

  const openTerm = () => {
    modal.classList.remove('hidden');
    input.focus();
  };

  openBtn.addEventListener('click', openTerm);
  heroBtn?.addEventListener('click', openTerm);
  closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

  document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key.toLowerCase() === 't') {
      e.preventDefault();
      openTerm();
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const raw = input.value.trim();
    if (!raw) return;

    const cmd = raw.toLowerCase();
    input.value = '';

    const printLine = (html) => {
      const div = document.createElement('div');
      div.innerHTML = html;
      output.appendChild(div);
      output.scrollTop = output.scrollHeight;
    };

    printLine(`<span class="red-text">jg@sys:~$</span> ${raw}`);

    switch (cmd) {
      case 'help':
        printLine(`Comandos disponíveis:
          <br>• <span class="red-text">whoami</span> : Perfil de Diogo Guerreiro
          <br>• <span class="red-text">skills</span> : Stack tecnológica
          <br>• <span class="red-text">projects</span> : Listar projetos na base de dados
          <br>• <span class="red-text">setup</span> : Hardware principal
          <br>• <span class="red-text">contact</span> : Copiar e-mail
          <br>• <span class="red-text">login</span> : Acesso reservado
          <br>• <span class="red-text">clear</span> : Limpar ecrã`);
        break;
      case 'whoami':
        printLine(`${PROFILE_CONTACT.name} (@${PROFILE_CONTACT.handle}) — ${PROFILE_CONTACT.role}. Baseado em ${PROFILE_CONTACT.location}.`);
        break;
      case 'skills':
        printLine(`>> CODE: C, C++, Kotlin, JS, SQL, Git<br>>> HARDWARE: ESP32-CAM, IoT<br>>> CREATIVE: DaVinci Resolve, After Effects, Photoshop`);
        break;
      case 'projects':
        printLine(projects.map(p => `• <strong>${p.title}</strong> [${p.status}] — ${(p.stack || []).join(', ')}`).join('<br>'));
        break;
      case 'setup':
        printLine(`Desktop i7-10700 | RTX 2060 Super | 16GB RAM | Canon EOS M50 Mark II | Poco X7 Pro`);
        break;
      case 'contact':
        navigator.clipboard.writeText(PROFILE_CONTACT.email);
        printLine(`E-mail (${PROFILE_CONTACT.email}) copiado para o clipboard!`);
        break;
      case 'login':
        modal.classList.add('hidden');
        document.getElementById('login-modal').classList.remove('hidden');
        break;
      case 'clear':
        output.innerHTML = '';
        break;
      default:
        printLine(`<span class="muted">Comando não reconhecido: "${raw}". Escreve <span class="red-text">help</span>.</span>`);
    }
  });
}

// ==================== MURAL DE FOTOS (SUPABASE) ====================
function renderCouplePhotos() {
  const container = document.getElementById('couple-photos-grid');
  container.innerHTML = couplePhotos.map(photo => `
    <div class="couple-photo-card">
      <img src="${photo.url}" alt="${photo.caption}">
      <div class="photo-overlay">
        <span class="photo-caption">${photo.caption}</span>
        <button class="edit-photo-btn" data-photo-id="${photo.id}" title="Trocar Fotografia">
          <i data-lucide="camera" style="width:15px; height:15px;"></i>
        </button>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.edit-photo-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.photoId);
      const current = couplePhotos.find(p => p.id === id);
      if (!current) return;

      document.getElementById('photo-slot-id').value = id;
      document.getElementById('photo-url-input').value = current.url.startsWith('data:') ? '' : current.url;
      document.getElementById('photo-caption-input').value = current.caption;
      document.getElementById('photo-file-input').value = '';
      document.getElementById('photo-modal').classList.remove('hidden');
    });
  });

  refreshIcons();
}

function setupPhotoModalEvents() {
  const modal = document.getElementById('photo-modal');
  document.getElementById('close-photo-modal').addEventListener('click', () => modal.classList.add('hidden'));

  document.getElementById('photo-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const slotId = Number(document.getElementById('photo-slot-id').value);
    const fileInput = document.getElementById('photo-file-input');
    const urlInput = document.getElementById('photo-url-input').value.trim();
    const caption = document.getElementById('photo-caption-input').value.trim();

    const updateInSupabase = async (finalUrl) => {
      await supabase.from('couple_photos').upsert({ id: slotId, url: finalUrl, caption });
      modal.classList.add('hidden');
      toast('Fotografia atualizada na nuvem!');
    };

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();
      reader.onload = async (ev) => await updateInSupabase(ev.target.result);
      reader.readAsDataURL(fileInput.files[0]);
    } else if (urlInput) {
      await updateInSupabase(urlInput);
    } else {
      const existing = couplePhotos.find(p => p.id === slotId);
      await updateInSupabase(existing.url);
    }
  });
}

// ==================== ESPAÇO DE CASAL (SUPABASE) ====================
const FORM_PLACEHOLDERS = {
  viagens: { title: "Destino (ex: Escócia, Londres...)", meta: "Data prevista (ex: Março 2027)" },
  restaurantes: { title: "Nome do Restaurante", meta: "Tipo de cozinha / Zona" },
  filmes: { title: "Título do Filme ou Série", meta: "Género / Plataforma" },
  jogos: { title: "Nome do Jogo", meta: "Modo (Co-op, PC, Split-screen)" }
};

function setupCoupleEvents() {
  document.querySelectorAll('#couple-cat-tabs .cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#couple-cat-tabs .cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.cat;
      document.getElementById('random-drawer').classList.add('hidden');
      syncCoupleFormFields();
      renderCoupleSection();
    });
  });

  document.getElementById('couple-search').addEventListener('input', (e) => {
    coupleSearchQuery = e.target.value.trim().toLowerCase();
    renderCoupleSection();
  });

  document.querySelectorAll('#couple-status-filter .seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#couple-status-filter .seg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      coupleStatusFilter = btn.dataset.status;
      renderCoupleSection();
    });
  });

  document.getElementById('couple-sort').addEventListener('change', (e) => {
    coupleSortBy = e.target.value;
    renderCoupleSection();
  });

  document.getElementById('add-couple-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('c-title').value.trim();
    const meta = document.getElementById('c-meta').value.trim();
    const notes = document.getElementById('c-notes').value.trim();
    const mapsUrl = document.getElementById('c-maps').value.trim();

    if (!title) return;

    await supabase.from('couple_items').insert([{
      category: activeCat,
      title,
      meta,
      notes: notes || "Sem notas adicionais",
      maps_url: activeCat === 'restaurantes' ? mapsUrl : "",
      done: false,
      checklist: activeCat === 'viagens' ? [] : undefined
    }]);

    e.target.reset();
    toast(`Adicionado a ${activeCat.toUpperCase()}!`);
  });

  document.getElementById('random-btn').addEventListener('click', () => {
    const pending = coupleData[activeCat].filter(i => !i.done);
    if (!pending.length) {
      toast('Não há itens pendentes nesta categoria!');
      return;
    }
    const pick = pending[Math.floor(Math.random() * pending.length)];
    document.getElementById('random-pick-title').textContent = `${pick.title} [${pick.meta}]`;
    document.getElementById('random-pick-notes').textContent = pick.notes;
    document.getElementById('random-drawer').classList.remove('hidden');
  });

  document.getElementById('close-random').addEventListener('click', () => {
    document.getElementById('random-drawer').classList.add('hidden');
  });

  syncCoupleFormFields();
}

function syncCoupleFormFields() {
  const cfg = FORM_PLACEHOLDERS[activeCat];
  document.getElementById('c-title').placeholder = cfg.title;
  document.getElementById('c-meta').placeholder = cfg.meta;

  const mapsInput = document.getElementById('c-maps');
  if (activeCat === 'restaurantes') {
    mapsInput.classList.remove('hidden');
  } else {
    mapsInput.classList.add('hidden');
    mapsInput.value = '';
  }
}

function renderCoupleSection() {
  Object.keys(coupleData).forEach(k => {
    const el = document.getElementById(`cnt-${k}`);
    if (el) el.textContent = coupleData[k].length;
  });

  const rawList = coupleData[activeCat] || [];
  const doneCount = rawList.filter(i => i.done).length;
  const pct = rawList.length ? Math.round((doneCount / rawList.length) * 100) : 0;

  document.getElementById('prog-label').textContent = `${activeCat.toUpperCase()} // ${doneCount} DE ${rawList.length} CONCLUÍDOS`;
  document.getElementById('prog-pct').textContent = `${pct}%`;
  document.getElementById('prog-bar').style.width = `${pct}%`;

  let filtered = rawList.filter(item => {
    if (coupleStatusFilter === 'pending' && item.done) return false;
    if (coupleStatusFilter === 'done' && !item.done) return false;
    if (coupleSearchQuery) {
      const hay = `${item.title} ${item.meta} ${item.notes}`.toLowerCase();
      return hay.includes(coupleSearchQuery);
    }
    return true;
  });

  filtered.sort((a, b) => {
    if (coupleSortBy === 'pending-first') {
      if (a.done !== b.done) return a.done ? 1 : -1;
      return b.id - a.id;
    }
    if (coupleSortBy === 'newest') return b.id - a.id;
    if (coupleSortBy === 'az') return a.title.localeCompare(b.title, 'pt');
    return 0;
  });

  const grid = document.getElementById('couple-cards-grid');
  if (!filtered.length) {
    grid.innerHTML = `<div class="cyber-card muted mono" style="padding:1.5rem; grid-column: 1/-1; text-align:center;">Nenhum registo encontrado nesta vista.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const checklist = item.checklist || [];
    const subDone = checklist.filter(c => c.done).length;

    return `
      <div class="c-card ${item.done ? 'done' : ''}" data-id="${item.id}">
        <div>
          <div class="c-card-top">
            <h4>${item.title}</h4>
            <span class="c-meta-tag mono">${item.meta}</span>
          </div>
          <p class="muted" style="font-size:0.86rem; margin-top:0.45rem;">${item.notes}</p>
          
          ${item.mapsUrl ? `
            <a href="${item.mapsUrl}" target="_blank" rel="noopener" class="maps-btn mono">
              <i data-lucide="map-pin" style="width:14px; height:14px;"></i> ABRIR NO GOOGLE MAPS
            </a>
          ` : ''}

          ${activeCat === 'viagens' ? `
            <div class="trip-checklist-box">
              <div class="trip-checklist-head mono">
                <span>// CHECKLIST DE VIAGEM</span>
                <span class="red-text">${subDone}/${checklist.length}</span>
              </div>
              <ul class="subcheck-list">
                ${checklist.map(sub => `
                  <li class="subcheck-item ${sub.done ? 'sub-done' : ''}" data-sub-id="${sub.id}">
                    <label>
                      <input type="checkbox" class="toggle-subcheck" ${sub.done ? 'checked' : ''}>
                      <span>${sub.text}</span>
                    </label>
                    <button type="button" class="subcheck-del" title="Remover tarefa">&times;</button>
                  </li>
                `).join('')}
              </ul>
              <form class="subcheck-add-form">
                <input type="text" placeholder="Nova tarefa (ex: Reservar hotel)..." required>
                <button type="submit">+</button>
              </form>
            </div>
          ` : ''}
        </div>

        <div class="c-card-bottom">
          <label class="check-wrap mono">
            <input type="checkbox" class="toggle-c-done" ${item.done ? 'checked' : ''}>
            <span>${item.done ? 'CONCLUÍDO' : 'MARCAR FEITO'}</span>
          </label>
          <button class="del-btn" title="Apagar">
            <i data-lucide="trash-2" style="width:16px; height:16px;"></i>
          </button>
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.toggle-c-done').forEach(chk => {
    chk.addEventListener('change', async (e) => {
      const id = Number(e.target.closest('.c-card').dataset.id);
      await supabase.from('couple_items').update({ done: e.target.checked }).eq('id', id);
    });
  });

  grid.querySelectorAll('.del-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = Number(e.target.closest('.c-card').dataset.id);
      await supabase.from('couple_items').delete().eq('id', id);
      toast('Item removido da nuvem.');
    });
  });

  if (activeCat === 'viagens') {
    grid.querySelectorAll('.toggle-subcheck').forEach(subChk => {
      subChk.addEventListener('change', async (e) => {
        const cardId = Number(e.target.closest('.c-card').dataset.id);
        const subId = Number(e.target.closest('.subcheck-item').dataset.subId);
        const trip = coupleData.viagens.find(t => t.id === cardId);
        if (!trip) return;
        const updated = (trip.checklist || []).map(s => s.id === subId ? { ...s, done: e.target.checked } : s);
        await supabase.from('couple_items').update({ checklist: updated }).eq('id', cardId);
      });
    });

    grid.querySelectorAll('.subcheck-del').forEach(delBtn => {
      delBtn.addEventListener('click', async (e) => {
        const cardId = Number(e.target.closest('.c-card').dataset.id);
        const subId = Number(e.target.closest('.subcheck-item').dataset.subId);
        const trip = coupleData.viagens.find(t => t.id === cardId);
        if (!trip) return;
        const updated = (trip.checklist || []).filter(s => s.id !== subId);
        await supabase.from('couple_items').update({ checklist: updated }).eq('id', cardId);
      });
    });

    grid.querySelectorAll('.subcheck-add-form').forEach(subForm => {
      subForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const cardId = Number(e.target.closest('.c-card').dataset.id);
        const input = subForm.querySelector('input');
        const text = input.value.trim();
        if (!text) return;
        const trip = coupleData.viagens.find(t => t.id === cardId);
        if (!trip) return;
        const updated = [...(trip.checklist || []), { id: Date.now(), text, done: false }];
        await supabase.from('couple_items').update({ checklist: updated }).eq('id', cardId);
      });
    });
  }

  refreshIcons();
}

// ==================== BIBLIOTECA CULTURAL (SUPABASE) ====================
const SHELF_CONFIG = {
  jogos: { title: "Nome do Jogo (ex: Counter-Strike 2)", meta: "Plataforma / Género", activeLabel: "🔥 A Jogar Agora", doneLabel: "✅ Jogo Terminado" },
  filmes: { title: "Título do Filme", meta: "Ano / Realizador", activeLabel: "🎬 A Ver Agora", doneLabel: "✅ Filme Assistido" },
  series: { title: "Nome da Série", meta: "Temporadas / Plataforma", activeLabel: "📺 A Acompanhar Agora", doneLabel: "✅ Série Assistida" },
  concertos: { title: "Banda / Artista & Festival", meta: "Local / Ano", activeLabel: "🎫 Bilhete Comprado / Próximo", doneLabel: "✅ Concerto Assistido" }
};

function setupShelfEvents() {
  document.querySelectorAll('#shelf-cat-tabs .cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#shelf-cat-tabs .cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeShelfCat = btn.dataset.shelfCat;
      syncShelfFormPlaceholders();
      renderShelf();
    });
  });

  document.getElementById('shelf-search').addEventListener('input', (e) => {
    shelfSearchQuery = e.target.value.trim().toLowerCase();
    renderShelf();
  });

  document.querySelectorAll('#shelf-status-filter .seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#shelf-status-filter .seg-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      shelfStatusFilter = btn.dataset.sstatus;
      renderShelf();
    });
  });

  document.getElementById('shelf-sort').addEventListener('change', (e) => {
    shelfSortBy = e.target.value;
    renderShelf();
  });

  document.getElementById('add-shelf-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('s-title').value.trim();
    const meta = document.getElementById('s-meta').value.trim();
    const status = document.getElementById('s-status').value;
    const rating = Number(document.getElementById('s-rating').value);
    const cover = document.getElementById('s-cover').value.trim();
    const review = document.getElementById('s-review').value.trim();

    if (!title) return;

    await supabase.from('shelf_items').insert([{
      category: activeShelfCat,
      title,
      meta,
      status,
      rating,
      cover: cover || "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
      review
    }]);

    e.target.reset();
    syncShelfFormPlaceholders();
    toast(`Adicionado a ${activeShelfCat.toUpperCase()}!`);
  });

  syncShelfFormPlaceholders();
}

function syncShelfFormPlaceholders() {
  const cfg = SHELF_CONFIG[activeShelfCat];
  document.getElementById('s-title').placeholder = cfg.title;
  document.getElementById('s-meta').placeholder = cfg.meta;
  document.getElementById('opt-status-done').textContent = cfg.doneLabel;
  document.getElementById('opt-status-active').textContent = cfg.activeLabel;
}

function renderShelfStats() {
  const doneJogos = (shelfData.jogos || []).filter(i => i.status === 'completed').length;
  const doneFilmes = (shelfData.filmes || []).filter(i => i.status === 'completed').length;
  const doneSeries = (shelfData.series || []).filter(i => i.status === 'completed').length;
  const doneConcertos = (shelfData.concertos || []).filter(i => i.status === 'completed').length;

  const statsBar = document.getElementById('shelf-stats-bar');
  statsBar.innerHTML = `
    <div class="shelf-stat-item">
      <span class="mono muted">JOGOS TERMINADOS</span>
      <span class="shelf-stat-num mono">${doneJogos}</span>
    </div>
    <div class="shelf-stat-item">
      <span class="mono muted">FILMES ASSISTIDOS</span>
      <span class="shelf-stat-num mono">${doneFilmes}</span>
    </div>
    <div class="shelf-stat-item">
      <span class="mono muted">SÉRIES ASSISTIDAS</span>
      <span class="shelf-stat-num mono">${doneSeries}</span>
    </div>
    <div class="shelf-stat-item">
      <span class="mono muted">CONCERTOS VISTOS</span>
      <span class="shelf-stat-num mono">${doneConcertos}</span>
    </div>
  `;
}

function renderShelf() {
  renderShelfStats();

  Object.keys(shelfData).forEach(k => {
    const el = document.getElementById(`scnt-${k}`);
    if (el) el.textContent = shelfData[k].length;
  });

  const rawList = shelfData[activeShelfCat] || [];
  const cfg = SHELF_CONFIG[activeShelfCat];

  let filtered = rawList.filter(item => {
    if (shelfStatusFilter !== 'all' && item.status !== shelfStatusFilter) return false;
    if (!shelfSearchQuery) return true;
    const hay = `${item.title} ${item.meta} ${item.review}`.toLowerCase();
    return hay.includes(shelfSearchQuery);
  });

  filtered.sort((a, b) => {
    if (shelfSortBy === 'active-first') {
      if (a.status !== b.status) return a.status === 'active' ? -1 : 1;
      return b.rating - a.rating;
    }
    if (shelfSortBy === 'rating') return b.rating - a.rating;
    if (shelfSortBy === 'newest') return b.id - a.id;
    if (shelfSortBy === 'az') return a.title.localeCompare(b.title, 'pt');
    return 0;
  });

  const grid = document.getElementById('shelf-grid');
  if (!filtered.length) {
    grid.innerHTML = `<div class="cyber-card muted mono" style="padding:1.5rem; grid-column: 1/-1; text-align:center;">Nenhum registo encontrado em ${activeShelfCat.toUpperCase()}.</div>`;
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <article class="project-card" data-id="${item.id}">
      <div class="project-cover">
        <img src="${item.cover}" alt="${item.title}" loading="lazy">
        <span class="cover-badge mono ${item.status === 'active' ? 'active-pulse' : ''}">
          ${item.status === 'active' ? cfg.activeLabel : cfg.doneLabel}
        </span>
      </div>
      <div class="project-body">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="mono red-text">// ${item.meta}</span>
            <span class="red-text">${'★'.repeat(item.rating)}${'☆'.repeat(5 - item.rating)}</span>
          </div>
          <h3>${item.title}</h3>
          <p>"${item.review}"</p>
        </div>
        <div class="project-actions-row">
          <button type="button" class="repo-link mono toggle-shelf-status">
            <i data-lucide="repeat"></i> ${item.status === 'active' ? 'PASSAR A CONCLUÍDO' : 'MARCAR EM CURSO'}
          </button>
          <button type="button" class="del-btn del-shelf-btn" title="Apagar registo">
            <i data-lucide="trash-2" style="width:16px; height:16px;"></i>
          </button>
        </div>
      </div>
    </article>
  `).join('');

  grid.querySelectorAll('.toggle-shelf-status').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = Number(e.target.closest('.project-card').dataset.id);
      const cur = rawList.find(i => i.id === id);
      if (!cur) return;
      const nextStatus = cur.status === 'active' ? 'completed' : 'active';
      await supabase.from('shelf_items').update({ status: nextStatus }).eq('id', id);
      toast('Estado atualizado!');
    });
  });

  grid.querySelectorAll('.del-shelf-btn').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = Number(e.target.closest('.project-card').dataset.id);
      await supabase.from('shelf_items').delete().eq('id', id);
      toast('Registo removido da nuvem.');
    });
  });

  refreshIcons();
}

// ==================== CMS ADMIN (SUPABASE) ====================
function setupCMSEvents() {
  document.getElementById('add-project-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (currentUser?.role !== 'admin') return;

    const title = document.getElementById('p-title').value.trim();
    const category = document.getElementById('p-cat').value.trim();
    const image = document.getElementById('p-img').value.trim();
    const description = document.getElementById('p-desc').value.trim();
    const problem = document.getElementById('p-problem').value.trim();
    const architecture = document.getElementById('p-arch').value.trim();
    const challenges = document.getElementById('p-challenges').value.trim();
    const stack = document.getElementById('p-stack').value.split(',').map(s => s.trim()).filter(Boolean);
    const status = document.getElementById('p-status').value;

    await supabase.from('projects').insert([{
      title,
      category,
      image,
      description,
      problem: problem || description,
      architecture: architecture || "Arquitetura modular.",
      challenges: challenges || "Implementação e testes práticos.",
      stack,
      status,
      link: "https://github.com"
    }]);

    e.target.reset();
    toast('Projeto publicado com sucesso na base de dados!');
  });
}

// ==================== LOGIN ====================
function setupAuthEvents() {
  const authBtn = document.getElementById('auth-btn');
  const mobAuthBtn = document.getElementById('mob-auth-trigger');
  const modal = document.getElementById('login-modal');
  const closeBtn = document.getElementById('close-login');
  const form = document.getElementById('login-form');
  const errEl = document.getElementById('login-err');

  const handleAuthClick = () => {
    if (currentUser) {
      currentUser = null;
      localStorage.removeItem('jg_user');
      updateAuthUI();
      document.querySelector('[data-view="portfolio"]').click();
      toast('Sessão terminada.');
    } else {
      modal.classList.remove('hidden');
    }
  };

  authBtn.addEventListener('click', handleAuthClick);
  mobAuthBtn.addEventListener('click', handleAuthClick);
  closeBtn.addEventListener('click', () => modal.classList.add('hidden'));

  document.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.key.toLowerCase() === 'l' && !currentUser) {
      modal.classList.remove('hidden');
    }
  });

  document.querySelectorAll('[data-quick-user]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('login-user').value = btn.dataset.quickUser;
      document.getElementById('login-pass').value = '123';
      form.requestSubmit();
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const rawUser = document.getElementById('login-user').value.trim().toLowerCase();
    const pass = document.getElementById('login-pass').value;

    const account = TEST_USERS[rawUser];
    if (account && account.password === pass) {
      currentUser = {
        username: account.username,
        displayName: account.displayName,
        role: account.role,
        avatar: account.avatar
      };
      localStorage.setItem('jg_user', JSON.stringify(currentUser));
      modal.classList.add('hidden');
      errEl.classList.add('hidden');
      form.reset();
      updateAuthUI();
      document.querySelector('[data-view="private"]').click();
      toast(`Bem-vindo, ${currentUser.username}!`);
    } else {
      errEl.classList.remove('hidden');
    }
  });
}

function updateAuthUI() {
  const authBtn = document.getElementById('auth-btn');
  const mobLabel = document.getElementById('mob-auth-label');
  const privateNavs = document.querySelectorAll('.private-nav-item');
  const userChip = document.getElementById('user-chip');
  const adminTab = document.querySelector('.admin-only');

  if (currentUser) {
    authBtn.innerHTML = `<i data-lucide="log-out"></i> <span>SAIR</span>`;
    mobLabel.textContent = 'Sair';
    privateNavs.forEach(el => el.classList.remove('hidden'));
    userChip.classList.remove('hidden');

    document.getElementById('chip-avatar').textContent = currentUser.avatar;
    document.getElementById('chip-name').textContent = currentUser.username;
    document.getElementById('private-welcome').textContent = `OLÁ, ${currentUser.username.toUpperCase()}`;
    document.getElementById('role-tag').textContent = currentUser.role === 'admin'
      ? '// ADMIN: JUSTGUERREIRO'
      : '// ACESSO CASAL ❤️';

    adminTab.classList.toggle('hidden', currentUser.role !== 'admin');
  } else {
    authBtn.innerHTML = `<i data-lucide="key-round"></i> <span>LOGIN</span>`;
    mobLabel.textContent = 'Login';
    privateNavs.forEach(el => el.classList.add('hidden'));
    userChip.classList.add('hidden');
    adminTab.classList.add('hidden');
  }

  refreshIcons();
}

// ==================== BACKUP & RESET ====================
function setupBackupReset() {
  document.getElementById('export-btn').addEventListener('click', () => {
    const data = { projects, coupleData, couplePhotos, shelfData };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'justguerreiro-supabase-backup.json';
    a.click();
    toast('Backup exportado da nuvem!');
  });

  document.getElementById('reset-btn').addEventListener('click', async () => {
    toast('Para repor os dados, executa a query inicial no Supabase.');
  });
}