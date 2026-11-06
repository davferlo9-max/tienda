/* ░░ CATÁLOGO DE PRODUCTOS (datos mock) ░░
   En producción esto vendría de una API/BD. */
const PRODUCTS = [
  { id: 1,  title: "Starfield Nova",        genre: "RPG · Aventura",    platform: "ps5",    icon: "🚀", price: 44.99, oldPrice: 74.99, badge: "-40%" },
  { id: 2,  title: "Velocity Horizon",      genre: "Carreras",          platform: "xbox",   icon: "🏎️", price: 59.99, oldPrice: null,  badge: null  },
  { id: 3,  title: "Pixel Kingdom",         genre: "Plataformas",       platform: "switch", icon: "🍄", price: 39.99, oldPrice: 49.99, badge: "-20%" },
  { id: 4,  title: "Shadow Protocol",       genre: "Acción · Sigilo",   platform: "pc",     icon: "🗡️", price: 29.99, oldPrice: 59.99, badge: "-50%" },
  { id: 5,  title: "Galaxy Siege III",      genre: "Estrategia",        platform: "pc",     icon: "🛸", price: 24.99, oldPrice: null,  badge: null  },
  { id: 6,  title: "Neon Drift",            genre: "Arcade · Carreras", platform: "ps5",    icon: "🌆", price: 19.99, oldPrice: 34.99, badge: "-43%" },
  { id: 7,  title: "Mystic Realms Online",  genre: "MMORPG",            platform: "pc",     icon: "🐉", price: 0.00,  oldPrice: null,  badge: "F2P" },
  { id: 8,  title: "Tactical Ops Reborn",   genre: "Shooter · FPS",     platform: "xbox",   icon: "🎯", price: 49.99, oldPrice: 69.99, badge: "-28%" },
  { id: 9,  title: "Puzzle Dimension",      genre: "Puzzle",            platform: "switch", icon: "🧩", price: 14.99, oldPrice: null,  badge: null  },
  { id: 10, title: "Dragon Blade Saga",     genre: "RPG · Acción",      platform: "ps5",    icon: "⚔️", price: 54.99, oldPrice: 79.99, badge: "-31%" },
  { id: 11, title: "Farm Life Deluxe",      genre: "Simulación",        platform: "switch", icon: "🚜", price: 34.99, oldPrice: null,  badge: null  },
  { id: 12, title: "Cyber Arena 2088",      genre: "Shooter · Battle",  platform: "pc",     icon: "🤖", price: 39.99, oldPrice: 59.99, badge: "-33%" },
];

const PLATFORM_LABEL = { ps5: "PS5", xbox: "XBOX", switch: "SWITCH", pc: "PC" };
