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
