// Configuração do Supabase
export const SUPABASE_URL = "https://ykqwudzfhtuhxnkpygxj.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrcXd1ZHpmaHR1aHhua3B5Z3hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1MjA4NjksImV4cCI6MjEwODA5Njg2OX0.iypdLyh5cJe8_mK-pHhz6zHUHZLWcYu6-lUO1lpBNDk";

export const USERS = {
  "justguerreiro": {
    username: "JustGuerreiro",
    password: "diogoxd2002", // Podes alterar a tua password aqui
    displayName: "Diogo Guerreiro",
    role: "admin",
    avatar: "JG",
    defaultSubview: "shelf" // Abre Biblioteca Cultural por defeito
  },
  "nicole": {
    username: "Nicole",
    password: "0104", // Podes alterar a password dela aqui
    displayName: "Nicole",
    role: "partner",
    avatar: "❤️",
    defaultSubview: "couple" // Abre Espaço de Casal por defeito
  }
};

export const PROFILE_CONTACT = {
  name: "Diogo Guerreiro",
  handle: "JustGuerreiro",
  location: "Portimão, Portugal",
  role: "Engenharia Informática // Software, Web & Multimédia",
  bio: "Estudante finalista de Engenharia Informática focado em engenharia de software, arquitetura de aplicações desktop/mobile e desenvolvimento web. Fora do código, dedico-me à produção de vídeo, edição criativa, fotografia e música.",
  email: "contacto@justguerreiro.dev",
  github: "https://github.com/JustGuerreiro",
  linkedin: "https://linkedin.com/in/",
  instagram: "https://instagram.com/"
};

export const INITIAL_COUPLE_PHOTOS = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
    caption: "Nós // Momento #01"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
    caption: "Aventuras & Planos // #02"
  }
];

export const INITIAL_PROJECTS = [
  {
    id: 1,
    title: "OmniVault",
    category: "Arquitetura & Desktop",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    description: "Aplicação desktop focada em produtividade segura, automação de sistema e organização modular de dados.",
    problem: "Necessidade de centralizar dados sensíveis, fluxos de trabalho e automação local numa aplicação desktop rápida e segura.",
    architecture: "Arquitetura modular combinando Electron, Node.js e backend local em Python FastAPI com controlo de versões estruturado.",
    challenges: "Comunicação eficiente entre processos (IPC), isolamento de módulos e definição de uma interface fluida.",
    stack: ["Electron", "Node.js", "Python FastAPI", "Git"],
    status: "Em Desenvolvimento",
    link: "https://github.com/JustGuerreiro"
  },
  {
    id: 2,
    title: "Arrival Translator",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    description: "Aplicação Android nativa para tradução rápida com interface reativa em Jetpack Compose e suporte a fundos de vídeo dinâmicos.",
    problem: "Criar uma experiência de tradução mobile imediata e visualmente imersiva sem bloquear a thread principal da interface.",
    architecture: "Desenvolvido em Kotlin com Jetpack Compose, utilizando gestão de estado reativa e ciclo de vida otimizado para reprodução de vídeo.",
    challenges: "Garantir que o vídeo de fundo em loop não degradava a performance da UI nem o consumo de memória em dispositivos Android.",
    stack: ["Kotlin", "Jetpack Compose", "Android"],
    status: "Concluído",
    link: "https://github.com/JustGuerreiro"
  },
  {
    id: 3,
    title: "Falling Grid 3D",
    category: "Web Game 3D",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    description: "Jogo 3D interativo no browser com física em tempo real, multiplicadores de pontuação e plataformas dinâmicas que colapsam.",
    problem: "Construir um jogo 3D fluido diretamente no navegador sem motores pesados externos, mantendo 60 FPS constantes.",
    architecture: "Motor assente em Three.js (WebGL) com loop de física customizado, deteção de colisões por grelha e persistência de high-scores.",
    challenges: "Sincronizar a deteção de contacto nos blocos com o temporizador de queda individual de cada plataforma.",
    stack: ["Three.js", "JavaScript", "WebGL"],
    status: "Concluído",
    link: "https://github.com/JustGuerreiro"
  }
];

export const INITIAL_SETUP = [
  {
    category: "Workstation // Core",
    icon: "monitor",
    items: [
      { name: "Desktop Rig", detail: "Intel Core i7-10700 // RTX 2060 Super // 16GB RAM" },
      { name: "Laptop", detail: "Lenovo AMD Ryzen 7 7730U" },
      { name: "Sistema & Browser", detail: "Windows 11 Pro // Opera GX" }
    ]
  },
  {
    category: "Dev // Stack & Tools",
    icon: "terminal",
    items: [
      { name: "IDEs & Editores", detail: "VS Code, Eclipse IDE & Android Studio" },
      { name: "Linguagens & Web", detail: "Java, Kotlin, Python, JavaScript, HTML/CSS, SQL" },
      { name: "Cloud & Controlo", detail: "Git, GitHub, Vercel & Supabase" }
    ]
  },
  {
    category: "Media // Visuals & 3D",
    icon: "camera",
    items: [
      { name: "Câmaras", detail: "Canon EOS M50 Mark II & Canon EOS 2000D" },
      { name: "Vídeo & VFX", detail: "DaVinci Resolve, Adobe After Effects & CapCut" },
      { name: "3D & Design", detail: "Blender & Adobe Photoshop" }
    ]
  }
];

export const INITIAL_COUPLE_DATA = {
  viagens: [
    {
      id: 101,
      title: "Escócia (Edimburgo & Highlands)",
      meta: "Março 2027",
      notes: "Ver castelos, Loch Ness e paisagens das terras altas",
      mapsUrl: "",
      done: false,
      createdAt: 1710000001,
      checklist: [
        { id: 1, text: "Comprar voos de ida e volta", done: true },
        { id: 2, text: "Reservar alojamento em Edimburgo", done: false },
        { id: 3, text: "Planear tour às Highlands / Loch Ness", done: false },
        { id: 4, text: "Tratar de seguro / documentos", done: false }
      ]
    },
    {
      id: 102,
      title: "Londres, Reino Unido",
      meta: "Setembro 2027",
      notes: "Camden Town, museus, mercados de rua e West End",
      mapsUrl: "",
      done: false,
      createdAt: 1710000002,
      checklist: [
        { id: 1, text: "Confirmar passaportes e ETA UK", done: false },
        { id: 2, text: "Escolher zona do hotel", done: false },
        { id: 3, text: "Listar pontos principais por dia", done: false }
      ]
    }
  ],
  restaurantes: [
    { id: 201, title: "Ramen Tradicional & Gyozas", meta: "Japonês", notes: "Pedir caldo tonkotsu picante", mapsUrl: "https://maps.google.com/?q=Ramen+Restaurante", done: false, createdAt: 1710000005 },
    { id: 202, title: "Steakhouse Maturada", meta: "Carnes", notes: "Jantar especial a dois", mapsUrl: "https://maps.google.com/?q=Steakhouse", done: false, createdAt: 1710000004 }
  ],
  filmes: [
    { id: 301, title: "Dune: Part Two", meta: "Sci-Fi", notes: "Sessão épica", mapsUrl: "", done: true, createdAt: 1710000006 },
    { id: 302, title: "Interstellar (Rewatch)", meta: "Sci-Fi", notes: "Ver num serão de chuva", mapsUrl: "", done: false, createdAt: 1710000008 },
    { id: 304, title: "The Batman", meta: "Noir / Action", notes: "Sessão de sofá à noite", mapsUrl: "", done: false, createdAt: 1710000007 }
  ],
  jogos: [
    { id: 401, title: "It Takes Two", meta: "PC // Co-op", notes: "Obrigatório terminar a dois", mapsUrl: "", done: false, createdAt: 1710000012 },
    { id: 402, title: "Overcooked! All You Can Eat", meta: "Co-op Caótico", notes: "Tentar não incendiar a cozinha", mapsUrl: "", done: true, createdAt: 1710000010 },
    { id: 403, title: "A Way Out", meta: "Split-screen", notes: "Fuga da prisão", mapsUrl: "", done: false, createdAt: 1710000011 }
  ]
};

export const INITIAL_SHELF_DATA = {
  jogos: [
    {
      id: 501,
      title: "Counter-Strike 2",
      meta: "PC // FPS Tático",
      status: "active",
      rating: 5,
      cover: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
      review: "Competitivo tático de eleição."
    },
    {
      id: 502,
      title: "Pokémon Champions",
      meta: "Competitivo // 3v3",
      status: "active",
      rating: 5,
      cover: "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?auto=format&fit=crop&w=600&q=80",
      review: "Team building e leitura de metagame."
    }
  ],
  filmes: [
    {
      id: 601,
      title: "The Dark Knight",
      meta: "Christopher Nolan",
      status: "completed",
      rating: 5,
      cover: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?auto=format&fit=crop&w=600&q=80",
      review: "Referência absoluta do cinema live-action."
    }
  ],
  series: [
    {
      id: 701,
      title: "Breaking Bad",
      meta: "5 Temporadas",
      status: "completed",
      rating: 5,
      cover: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=600&q=80",
      review: "Obra-prima do início ao fim."
    }
  ],
  concertos: [
    {
      id: 801,
      title: "Sleep Token // Live Ritual",
      meta: "UK / Tour",
      status: "active",
      rating: 5,
      cover: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=600&q=80",
      review: "Atmosfera e produção visual únicas."
    }
  ]
};