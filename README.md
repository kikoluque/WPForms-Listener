# WPForms Listener para Google Tag Manager

Este script permite capturar envíos de formularios realizados con **WPForms** (tanto con AJAX como sin AJAX) e inyectarlos en el `dataLayer` de Google Tag Manager. Extrae todos los campos completados por el usuario y los estructura como un objeto limpio y formateado, listo para usar en etiquetas de analítica, seguimiento de conversiones, o integraciones personalizadas.

---

## 📋 Características

- Compatible con formularios WPForms con y sin AJAX.
- Extrae todos los campos completados por el usuario.
- Formatea correctamente nombres de campos (`nombre[apellido]` → `nombre_apellido`).
- Elimina campos sensibles como `wpforms_nonce`.
- Envía un evento personalizado al `dataLayer`: `wpform_enviado`.
- Código limpio, modular y con comentarios en español.

---

## 🚀 Ejemplo de evento en el `dataLayer`

```js
{
  event: 'wpform_enviado',
  formId: 'wpforms-form-123',
  inputs: {
    nombre: 'Juan',
    email: 'juan@email.com',
    mensaje: 'Hola, quiero información'
  }
}
## ✅ Instrucciones de uso

1. Copia el contenido del archivo `listener-wpforms.js`.
2. Entra a tu contenedor de Google Tag Manager.
3. Crea una nueva **Etiqueta** de tipo **HTML personalizado**.
4. Pega el script dentro del campo de HTML.
5. Asigna un disparador, como **Todas las páginas**, o solo en las páginas donde se encuentren formularios WPForms.
6. Guarda y publica los cambios.
7. Activa el **modo vista previa** de GTM y prueba un formulario WPForms.
8. Verifica en la consola del depurador de GTM que se dispara el evento `wpform_enviado` con los datos del formulario.

## 🧑‍💻 Autor

**Kiko Luque**  
Web: [www.kikoluque.com](https://www.kikoluque.com)  
Email: [kiko@kikoluque.com](mailto:kiko@kikoluque.com)

## ⚠️ Licencia y uso

Este listener ha sido creado por Kiko Luque para fines educativos o de implementación personal.  
**No está autorizado su uso comercial sin permiso explícito del autor.**

## 🛠 Recomendaciones

- Puedes conectar este evento con etiquetas de Google Analytics 4, Meta Pixel, Hotjar, LinkedIn Ads o cualquier otra plataforma que soporte integración vía `dataLayer`.
- Para identificar distintos formularios, puedes utilizar el campo `formId` o incluir un campo oculto personalizado con el nombre de campaña o propósito del formulario.
- Asegúrate de que el formulario esté correctamente validado por WPForms antes de activar etiquetas de conversión.

## 📁 Archivos

- `listener-wpforms.js`: Código JavaScript del listener.
- `README.md`: Este archivo de documentación.

## 🧪 ¿Cómo saber si funciona?

1. Activa el modo **Preview** en Google Tag Manager.
2. Envía un formulario WPForms en tu sitio.
3. Revisa en la pestaña de **Eventos** del debugger si aparece `wpform_enviado`.
4. Abre la pestaña **Data Layer** y valida que los campos están correctamente enviados como `inputs`.
