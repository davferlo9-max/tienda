# 🎮 GameStore

Tienda de videojuegos de una sola página (SPA ligera) construida con **HTML + CSS + JavaScript puro**, sin dependencias ni build step. Inspirada en el modelo de las tiendas de videojuegos.

## ✨ Funcionalidades

- 🔍 **Búsqueda en vivo** por título y género
- 🏷️ **Filtro por plataforma** — PS5 · Xbox Series · Nintendo Switch · PC
- ↕️ **Ordenación** por precio y nombre
- 🛒 **Carrito funcional** — añadir, modificar cantidad, eliminar y total automático
- 💾 **Persistencia** del carrito en `localStorage`
- 📱 **Diseño responsive** con estética gaming oscura + acentos neón

## 📂 Estructura

| Archivo | Descripción |
|---|---|
| `index.html` | Estructura de la página |
| `styles.css` | Estilos (tema oscuro + neón, responsive) |
| `app.js` | Lógica: catálogo, filtros, búsqueda, carrito |
| `data.js` | Catálogo de productos (datos mock) |

## 🚀 Uso local

Al ser estática, basta con abrir `index.html` en el navegador. Para servirla localmente:

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

## 🌐 Demo

Desplegada con GitHub Pages. (El enlace aparecerá aquí una vez activado.)

---

© 2026 GameStore · Proyecto demo con fines educativos.
