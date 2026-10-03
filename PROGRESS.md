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

## 2026-10-03 13:00 (COT) — Reproductor de Video 100% Nativo en la Web (Sin Enlaces Externos a Google Videos)
**Plataforma:** Antigravity
**Tipo:** ✨ Mejora | 🎬 Multimedia | 🎨 UI/UX

- Modificación de VideoPlayer.tsx para que las películas poéticas se visualicen y reproduzcan exclusivamente dentro de la página:
  - Se eliminó el botón externo «Reproducir en Google Vids (HD)» y cualquier enlace a Google Videos.
  - El reproductor incrustado se carga de forma directa y nativa en el contenedor cinematográfico de proporción 16:9 con marco dorado sutil.
  - La reproducción ocurre al 100% dentro del sitio sin redirigir al visitante a Google Vids.
  - Para las obras sin video (*El Espejo*), se preserva la tarjeta estética de *«Película en Producción»*.
- Verificación visual mediante subagente de navegador confirmando reproducción inmersiva en página.

## 2026-10-03 12:37 (COT) — Eliminación del Audio de 12 Minutos e Integración Definitiva del Video de 'La Memoria'
**Plataforma:** Antigravity
**Tipo:** 🐛 Corrección | 🎬 Multimedia | 🧹 Limpieza

- Resolución definitiva del conflicto en **«La Memoria»**:
  - Se eliminó del proyecto el archivo `public/videos/mas_aca_y_memoria.mp4` (el cual era en realidad un archivo de audio en bruto de 12 minutos y 30 segundos renombrado con extensión .mp4 que usurpaba la visualización del video en la página).
  - Se verificó y vinculó exclusivamente el enlace oficial de Google Vids para La Memoria: `https://docs.google.com/videos/d/1Nyntz2nF6zjUesamKDytBywgSG7vgx3IXYfvfkrk26Q/play?usp=sharing`.
  - Se eliminó cualquier referencia residual a `localVideoUrl` en el catálogo de poemas (`src/data/poemas.ts`).
- Refinamiento de `VideoPlayer.tsx`:
  - Se añadió reset automático del reproductor incrustado al cambiar de obra mediante `useEffect`.
  - Se agregaron controles flotantes de navegación para alternar cómodamente entre el reproductor integrado y la vista completa en Google Vids.
- Compilación verificada con `npm run build` sin errores.

**Estado:** ✅ Completado
**Pendiente / Siguiente paso:** Publicar / desplegar los cambios más recientes para que se reflejen en la versión en línea.

## 2026-10-03 11:42 (COT) — Actualización y Sincronización de Audios Corregidos (El Mendigo y El Espejo)
**Plataforma:** Antigravity
**Tipo:** ✨ Mejora | 🎵 Audio | 🗄️ Archivo

- Verificación técnica y espectral de las versiones corregidas de audio cargadas por el usuario en `public/audio/`:
  - ✅ **El Mendigo (`el_mendigo.mp3`)**:
    - Se constató la eliminación total de la frase sobrante de cierre (*"No, no, ok, no me..."*) y de los susurros de reintento.
    - El audio concluye limpiamente con el verso *"un mendrugo de pan"* (8:08) y un fade out musical de piano hasta los 8:24.5 (504.5s).
    - Duración ajustada: de 8m 26s a 8m 24.5s.
  - ✅ **El Espejo (`el_espejo.mp3`)**:
    - Se optimizó la cola de reproducción eliminando 10 segundos de silencio/ruido inerte al final.
    - Duración ajustada: de 7m 01s a 6m 51.7s (411.7s).
- Sincronización con el repositorio maestro documental:
  - Se crearon copias de seguridad de las tomas originales brutas (`el_mendigo_original_con_descarte.mp3` y `el_espejo_original_con_silencio.mp3`).
  - Se sincronizaron las nuevas versiones editadas a sus carpetas consolidadas en `CONTENIDOS_GUILLE/01_OBRAS_CONSOLIDADAS/06_el_mendigo/audio/` y `07_el_espejo/audio/`.
- Verificación del reproductor web: El componente `AudioPlayer` detecta automáticamente la nueva duración al cargar los metadatos de los archivos actualizados. Build validado sin errores.

**Estado:** ✅ Completado
**Pendiente / Siguiente paso:** Integrar el enlace de Google Vids para "El Espejo" cuando esté listo.

## 2026-10-03 11:05 (COT) — Integración del Video Oficial de 'Más Allá' y Estado de Producción para 'El Espejo'
**Plataforma:** Antigravity
**Tipo:** ✨ Mejora | 🎬 Multimedia

- Integración y verificación del enlace oficial de Google Vids para **«Más Acá (Más Allá)»**:
  - Enlace oficial: `https://docs.google.com/videos/d/14nYrpsJNaUjqzpeWpy5pUv7Ana0MXQgHK_Af3wF65KA/play?usp=sharing` (Título verificado en vivo: *«Mas Allá - Google Vids»*).
  - Resuelto el conflicto de video cruzado entre La Memoria y Más Allá: ambos poemas cuentan ahora con su respectiva película oficial e individual.
- Confirmación de estado para **«El Espejo»**: El autor/usuario confirma que su video está en proceso de creación, por lo cual se mantiene con el estado visual y elegante de *«Película en Producción»*.
- Archivos clave: `src/data/poemas.ts`, `CONTENIDOS_GUILLE/01_OBRAS_CONSOLIDADAS/03_mas_alla/poema.md`.

**Estado:** ✅ Completado
**Pendiente / Siguiente paso:** Integrar el enlace de "El Espejo" tan pronto como el usuario finalice su edición en Google Vids.

## 2026-10-03 10:56 (COT) — Auditoría y Saneamiento de Películas en Video Google Vids
**Plataforma:** Antigravity
**Tipo:** 🐛 Corrección | 🎬 Multimedia | 🔧 Refactor

- Auditoría completa de enlaces de video de Google Vids mediante scraping de metadatos en vivo (Open Graph y títulos oficiales):
  - ✅ **La Vejez**: Verificado enlace oficial (`12fkKp_...`), coincide con *"La Vejez Guille"*.
  - ✅ **La Memoria**: Se removió `localVideoUrl: "/videos/mas_aca_y_memoria.mp4"` (que era un archivo de audio .m4a renombrado a .mp4 sin pista de video que bloqueaba el reproductor) permitiendo reproducir directamente el video oficial de Google Vids (`1Nyntz2...`).
  - ❌ **Más Acá (Más Allá)**: Se corrigió la asignación errónea que tenía duplicado el video de *"La Memoria"*. Se limpió el enlace hasta recibir el link individual de Google Vids de esta obra.
  - ✅ **El Limosnero**: Verificado enlace oficial (`1dlng-...`), coincide con *"El limosnero"*.
  - ✅ **Los Abuelos**: Verificado enlace oficial (`1ByuDH...`), coincide con *"Los abuelos"*.
  - ✅ **El Mendigo**: Verificado enlace oficial (`1fptS3...`), coincide con *"El mendigo"*.
  - ⚠️ **El Espejo**: Se preparó el visualizador con estado elegante de "Película en Producción" a la espera del enlace oficial.
- Refactor de `VideoPlayer.tsx` y `App.tsx`: Cuando un poema no cuenta con video oficial, se muestra un estado refinado de producción en lugar de enlaces vacíos o botones rotos, y los badges de video en las tarjetas del catálogo se renderizan de forma estrictamente condicional.
- Archivos clave: `src/data/poemas.ts`, `src/components/VideoPlayer.tsx`, `src/App.tsx`, `CONTENIDOS_GUILLE/01_OBRAS_CONSOLIDADAS/03_mas_alla/poema.md`.

**Estado:** ✅ Completado
**Pendiente / Siguiente paso:** Recibir del usuario los enlaces específicos de Google Vids para "Más Acá" y "El Espejo" desde su panel de Google Vids.

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
