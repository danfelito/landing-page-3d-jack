# Landing Page 3D Jack

Landing page de portafolio 3D para Jack, construida con React, TypeScript, Tailwind CSS, Framer Motion y Lucide React.

## Ejecutar localmente

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Despliegue en Render

Este repositorio incluye `render.yaml` para desplegar como Static Site en Render.

Configuración manual equivalente:

- Build command: `npm install && npm run build`
- Publish directory: `dist`

## Proyecto

Incluye:

- Hero con fondo oscuro `#0C0C0C`
- Tipografía Kanit
- Retrato robot 3D integrado en el Hero
- Marquee animado con proyectos
- Secciones About, Services y Projects
- Animaciones con Framer Motion

## Estadísticas de visitas (Google Analytics 4)

Completar `measurementId` y `reportUrl` en `src/analyticsConfig.ts` con los valores de la cuenta de Google del propietario. La integración permanece deshabilitada cuando no hay un ID de medición válido.

La etiqueta se carga solamente después de aceptar la medición en el portal. La elección puede cambiarse desde el pie de página; rechazarla detiene los eventos y elimina las cookies de Analytics del portal. La integración no habilita funciones publicitarias ni Google Signals. El enlace «Mis estadísticas» abre los informes de Google, cuyo acceso requiere una cuenta con permisos en la propiedad.

Eventos:

| Evento | Finalidad | Parámetros personalizados |
| --- | --- | --- |
| `page_view` | Visitas a la página y procedencia mediante UTMs | — |
| `section_view` | Secciones consultadas | `section_name` |
| `service_view` | Servicios vistos | `service_name` |
| `project_click` | Apertura de proyectos | `project_id`, `button_location` |
| `contact_click` | Clic en WhatsApp o correo | `contact_method`, `button_location` |

Registrar esos parámetros como dimensiones personalizadas de ámbito de evento en GA4 para usarlos en informes. Los clics de contacto indican intención; no confirman una conversación o una venta. Los visitantes que rechazan la medición no se contabilizan.

Verificación (Node.js 22.13 o posterior):

```bash
npm run check:analytics
npm run build
npx tsc -p tsconfig.app.json --noEmit
```

Los checks de Analytics usan un navegador simulado y no envían eventos a Google. Después de configurar un ID real y publicar, comprobar una visita y un clic de contacto en el informe de tiempo real de GA4.
