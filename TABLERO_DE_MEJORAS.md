# 📋 Tablero de Seguimiento y Aprobación de Mejoras — El Cosmos de Guille

Este documento es el centro de control editorial y técnico. Cada vez que subas archivos a la carpeta `00_INBOX_VARIOS` (como grabaciones de audio, notas de conversaciones con don Guillermo, documentos de Word o tablas de Google Sheets), aquí se registrarán los hallazgos, extractos valiosos y propuestas de mejora para que **tú los apruebes antes de publicarlos en la página**.

---

## 🚦 Leyenda de Estados
* 🟡 **[PROPUESTA PENDIENTE]**: Sugerencia identificada a partir de nuevo material. Espera tu visto bueno.
* 🟢 **[APROBADO]**: Mejora autorizada por ti, lista para implementarse o en desarrollo.
* ✅ **[PUBLICADO / EN PRODUCCIÓN]**: Ya reflejado en el código y en la página web.
* ⚪ **[DESCARTADO / ARCHIVADO]**: Desestimado o guardado para una fase posterior.

---

## 📝 Registro de Mejoras y Hallazgos

| ID | Fecha | Origen del Material | Tipo de Hallazgo / Propuesta | Impacto en la Web | Estado |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **PROP-001** | 2026-09-13 | Planificación Inicial | **Creación de Cuaderno Gráfico Multi-Estilo**: Selector de 5 estilos visuales para generar escenas de cada poema. | Componente `BookViewer` y herramienta de generación de láminas. | 🟢 APROBADO |
| **PROP-002** | 2026-09-13 | Flujo de Trabajo | **Estandarización de Audio Dual**: Preservación de máster (WAV / 320kbps) para edición de video + versión ligera optimizada para streaming web. | Carpeta `public/audio` y almacenamiento de másters. | 🟢 APROBADO |
| **PROP-003** | 2026-09-13 | Flujo de Trabajo | **Pipeline Ingesta Word/Sheets a Markdown**: Procesamiento de archivos de texto entrantes a `.md` con metadatos. | Módulo de datos `src/data/poemas.ts`. | 🟢 APROBADO |
| **PROP-004** | 2026-09-13 | Google Drive | **Saneamiento de Duplicados en Raíz**: Verificación por hash SHA-256 de los 3 archivos idénticos. Se preservó el máster `Guille Baena más acá y memoria.m4a` y se eliminaron los clones duplicados. | Espacio y organización limpios en Google Drive y respaldo en `00_INBOX_VARIOS/audios_brutos`. | ✅ PUBLICADO |
| **PROP-005** | 2026-09-13 | Google Drive | **Catalogación de 'El río corre hacia atrás'**: Obra de don Benjamín Baena Hoyos (padre de Guillermo). Se resguardó en inventario interno sin publicarse a la web. | `00_INBOX_VARIOS/el_rio_corre_hacia_atras_benjamin_baena/INVENTARIO_OBRA.md`. | ✅ PUBLICADO |
| **PROP-006** | 2026-09-13 | Google Drive | **Estructuración de las 6 Obras de 'Que diría el olvido del último recuerdo'**: Creación de `poema.md` para cada obra con texto completo, sinopsis, escenas y prompts cinematográficos. | `01_OBRAS_CONSOLIDADAS/` (La Vejez, La Memoria, Más Allá, El Limosnero, Los Abuelos, El Mendigo). | ✅ PUBLICADO |

---

## 💡 Próximas Propuestas por Evaluar

*(A medida que subas conversaciones con Guillermo o nuevos textos en Word/Sheets, aquí se desglosarán los detalles específicos: anécdotas, citas textuales para la sección del autor, y nuevos poemas descubiertos con su propuesta de adaptación).*
