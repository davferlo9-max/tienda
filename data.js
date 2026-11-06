/* ░░ CATÁLOGO DE PRODUCTOS — JUEGOS REALES ░░
   Portadas oficiales servidas desde el CDN público de Steam por App ID:
   https://cdn.cloudflare.steamstatic.com/steam/apps/{appId}/library_600x900.jpg
   Precios y plataformas con fines ilustrativos (demo educativa). */
const PRODUCTS = [
  { id: 1,  title: "Elden Ring",                  genre: "RPG de acción",       platform: "ps5",    appId: 1245620, price: 49.99, oldPrice: 69.99, badge: "-29%" },
  { id: 2,  title: "Cyberpunk 2077",              genre: "RPG de acción",       platform: "pc",     appId: 1091500, price: 29.99, oldPrice: 59.99, badge: "-50%" },
  { id: 3,  title: "The Witcher 3: Wild Hunt",    genre: "RPG de acción",       platform: "pc",     appId: 292030,  price: 14.99, oldPrice: 39.99, badge: "-62%" },
  { id: 4,  title: "Red Dead Redemption 2",       genre: "Acción · Aventura",   platform: "ps5",    appId: 1174180, price: 39.99, oldPrice: 59.99, badge: "-33%" },
  { id: 5,  title: "Grand Theft Auto V",          genre: "Acción · Aventura",   platform: "pc",     appId: 271590,  price: 19.99, oldPrice: 29.99, badge: "-33%" },
  { id: 6,  title: "Hades",                        genre: "Roguelike · Acción",  platform: "switch", appId: 1145360, price: 12.49, oldPrice: 24.99, badge: "-50%" },
  { id: 7,  title: "Stardew Valley",               genre: "Simulación · RPG",    platform: "switch", appId: 413150,  price: 13.99, oldPrice: null,  badge: null  },
  { id: 8,  title: "DOOM Eternal",                 genre: "Shooter · FPS",       platform: "xbox",   appId: 782330,  price: 19.99, oldPrice: 59.99, badge: "-67%" },
  { id: 9,  title: "Baldur's Gate 3",              genre: "RPG",                 platform: "pc",     appId: 1086940, price: 59.99, oldPrice: null,  badge: "TOP" },
  { id: 10, title: "God of War",                   genre: "Acción · Aventura",   platform: "ps5",    appId: 1593500, price: 29.99, oldPrice: 49.99, badge: "-40%" },
  { id: 11, title: "Hollow Knight",                genre: "Metroidvania",        platform: "switch", appId: 367520,  price: 10.99, oldPrice: 14.99, badge: "-27%" },
  { id: 12, title: "Sekiro: Shadows Die Twice",    genre: "Acción · Aventura",   platform: "xbox",   appId: 814380,  price: 34.99, oldPrice: 59.99, badge: "-42%" },
];

const PLATFORM_LABEL = { ps5: "PS5", xbox: "XBOX", switch: "SWITCH", pc: "PC" };

/** Devuelve la URL de la carátula vertical oficial para un App ID de Steam. */
const coverUrl = (appId) =>
  `https://cdn.cloudflare.steamstatic.com/steam/apps/${appId}/library_600x900.jpg`;
