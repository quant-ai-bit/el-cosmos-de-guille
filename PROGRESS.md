# 📒 Bitácora del Proyecto — GUILLE (El Cosmos de Guille)

> Registro vivo y compartido de avances, correcciones y decisiones.
> **Lo leen y lo actualizan TODAS las plataformas** (Kiro, opencode, Antigravity, etc.).
> Si entras al proyecto desde cualquier herramienta, empieza leyendo este archivo.

---

## ▶️ Cómo usar esta bitácora

1. **Al empezar una sesión:** lee la entrada más reciente (arriba del todo) para saber en qué punto quedó el proyecto.
2. **Al terminar un cambio:** añade una nueva entrada **arriba** (orden cronológico inverso, lo más nuevo primero), asegurándote de registrar la **fecha real** y la **hora colombiana (COT, UTC-5)**.
3. **Una entrada por sesión de trabajo.** No borres entradas viejas; el historial completo es el valor.
4. **Sé concreto:** archivos tocados, qué cambió y por qué. Evita relleno.

### Formato de cada entrada

```
## YYYY-MM-DD HH:MM (COT) — Título corto del cambio
**Plataforma:** Kiro | opencode | Antigravity | otra
**Tipo:** ✨ Mejora | 🐛 Corrección | 🔧 Refactor | 📦 Dependencias | 🚀 Deploy | 📝 Docs

- Qué se hizo (en bullets).
- Archivos clave: `ruta/archivo`
- Motivo / contexto de la decisión.

**Estado:** ✅ Completado | 🚧 En progreso | ⏸️ Bloqueado
**Pendiente / Siguiente paso:** lo que queda por hacer.
```

---

# 📜 Historial (lo más reciente primero)

## 2026-09-16 18:25 (COT) — Optimización Responsiva Móvil: Barra de Navegación y Reproductor Flotante
**Plataforma:** Antigravity
**Tipo:** 🐛 Corrección | 🎨 UI/UX

- Corrección del desbordamiento del título del sitio en celulares: Se blindó con `white-space: nowrap` y tipografía fluida escalable (`clamp`), ocultando badges innecesarios en pantallas pequeñas para que **«EL COSMOS DE GUILLE»** se lea completo y nítido en una sola línea.
- Rediseño del reproductor de audio flotante para pantallas móviles: Se integró una barra de progreso superior sutil (estilo miniplayer moderno) y se compactaron los controles (avatar, título, autor, anterior, play/pause, siguiente y cerrar), asegurando que el reproductor se adapte al 100% del ancho del celular con márgenes laterales y sin recortarse ni salirse de la pantalla.
- Archivos clave: `src/components/Navbar.tsx`, `src/components/AudioPlayer.tsx`, `src/index.css`.

**Estado:** ✅ Completado
**Pendiente / Siguiente paso:** Commit y Push a GitHub para actualizar automáticamente la versión en producción (`guille.vercel.app`).

## 2026-09-16 17:45 (COT) — Libro Abierto Flipbook, Segmentación Inteligente e Integración Google Imagen 3
**Plataforma:** Antigravity
**Tipo:** ✨ Mejora | 🎨 UI/UX | 🔧 Refactor

- Transformación completa de `BookViewer` en un Libro Abierto Realista (Open Spread Flipbook) con páginas enfrentadas (Lámina ilustrada a la izquierda, versos con capitular ornamental dorada a la derecha, lomo 3D con costura y sombras de curvatura).
- Implementación de animación de paso de hoja y navegación intuitiva por teclado (flechas ← y →) o botones táctiles flotantes.
- Motor de Composición Armónica Editorial: El número de páginas se calcula de forma 100% automática según la extensión y métrica del texto (eliminando selectores manuales arbitrarios), asegurando que cada hoja tenga la cantidad perfecta de versos.
- Gestión interna y silenciosa de Google Imagen 3 API: La clave fue resguardada en `.env` (excluida de Git en `.gitignore`), eliminando cualquier solicitud o formulario de API key de la interfaz web para el usuario o visitante.
- Archivos clave: `src/components/BookViewer.tsx`, `src/components/NotebookStudio.tsx`, `src/utils/aiGenerator.ts`, `src/data/notebookTypes.ts`, `src/index.css`, `.gitignore`, `.env`.

**Estado:** ✅ Completado
**Pendiente / Siguiente paso:** Probar la generación de un cuaderno con Google Imagen 3 e incorporar audios de Guillermo Baena.

## 2026-09-14 17:58 (COT) — Creación de la Bitácora Compartida y Estandarización de Proyectos
**Plataforma:** Antigravity
**Tipo:** 📝 Docs | 🔧 Refactor

- Creación de `PROGRESS.md` estandarizado para sincronizar el proyecto con el resto del ecosistema (30/30 proyectos sincronizados).
- Vinculación del registro de avances con el `TABLERO_DE_MEJORAS.md` existente (centro de control editorial y propuestas para las obras de Guillermo Baena Restrepo).
- Arquitectura detectada y consolidada: Vite 8 + React 19 + TypeScript + Lucide React + Oxlint.
- Archivos clave: `PROGRESS.md`, `TABLERO_DE_MEJORAS.md`, `package.json`.

**Estado:** ✅ Completado
**Pendiente / Siguiente paso:** Continuar con la implementación de las propuestas aprobadas en `TABLERO_DE_MEJORAS.md` (PROP-001 Selector de estilos visuales y PROP-002 Estandarización de audio dual).

## 2026-09-13 11:50 (COT) — Estructuración Editorial y Creación del Tablero de Mejoras
**Plataforma:** Antigravity
**Tipo:** 📝 Docs | ✨ Mejora

- Creación de `TABLERO_DE_MEJORAS.md` como centro de control editorial y técnico para la ingesta de material desde Google Drive.
- Catalogación y preservación de obras:
  - Consolidación de las 6 obras de *"Que diría el olvido del último recuerdo"* en `01_OBRAS_CONSOLIDADAS/` (La Vejez, La Memoria, Más Allá, El Limosnero, Los Abuelos, El Mendigo).
  - Catalogación de *"El río corre hacia atrás"* de don Benjamín Baena Hoyos en `00_INBOX_VARIOS/`.
  - Saneamiento de audios duplicados mediante hash SHA-256 en másters de Google Drive.
- Aprobación de propuestas: Cuaderno Gráfico Multi-Estilo (`BookViewer`), estandarización de audio dual (WAV/320kbps vs streaming ligero) y pipeline de ingesta a markdown.
- Archivos clave: `TABLERO_DE_MEJORAS.md`, `CONTENIDOS_GUILLE/`.

**Estado:** ✅ Completado
**Pendiente / Siguiente paso:** Desarrollo de los componentes UI para el selector de estilos y player de audio dual.

## 2026-09-09 19:21 (COT) — Lanzamiento Inicial de la Aplicación Web 'El Cosmos de Guille'
**Plataforma:** Antigravity
**Tipo:** 🚀 Deploy | ✨ Mejora

- Configuración inicial del proyecto con Vite, React 19 y TypeScript.
- Creación de la estructura base del visualizador de poemas, componentes UI y configuración de despliegue en Vercel (`vercel.json`).
- Commit inicial `4c56ad0` ("feat: Lanzamiento de El Cosmos de Guille - Guillermo Baena Restrepo").
- Archivos clave: `src/App.tsx`, `src/data/poemas.ts`, `vercel.json`, `package.json`.

**Estado:** ✅ Completado
**Pendiente / Siguiente paso:** Ingesta de audios y contenido visual para cada una de las obras poéticas.
