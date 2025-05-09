<script>
/*
Author: Kiko Luque
Version: 1.0
Web: www.kikoluque.com
Contact: kiko@kikoluque.com
Info: Este listener no es para uso comercial
*/

(function() {

    // Función para limpiar y estandarizar los nombres de los campos
    function formatKey(key) {
        return key.replace(/\[|\]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
    }

    // Función que empuja los datos al dataLayer
    function pushToDataLayer(formId, data) {
        var inputs = Object.assign({}, data);

        // Eliminamos campos sensibles o innecesarios
        delete inputs['wpforms_nonce'];
        delete inputs['action'];

        // Enviamos el evento personalizado al dataLayer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'wpform_enviado',
            formId: formId,
            inputs: inputs
        });
    }

    // Interceptor para formularios AJAX de WPForms
    if (document.querySelector('form.wpforms-ajax-form')) {
        var OriginalXHR = XMLHttpRequest;

        // Sobrescribimos el objeto XMLHttpRequest
        XMLHttpRequest = function() {
            var xhr = new OriginalXHR();
            var requestURL;

            var origOpen = xhr.open;
            var origSend = xhr.send;

            // Capturamos la URL del request
            xhr.open = function(method, url) {
                requestURL = url;
                return origOpen.apply(this, arguments);
            };

            // Interceptamos el envío y analizamos la respuesta
            xhr.send = function(data) {
                if (/admin-ajax\.php/.test(requestURL)) {
                    xhr.addEventListener('load', function() {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            try {
                                var response = JSON.parse(xhr.responseText);

                                // Verificamos que el formulario se haya enviado correctamente
                                if (response.success && data instanceof FormData) {
                                    var formData = {};

                                    // Recorremos los datos enviados y los formateamos
                                    data.forEach(function(value, key) {
                                        if (key) {
                                            formData[formatKey(key)] = value;
                                        }
                                    });

                                    // Si es un envío de WPForms, lo enviamos al dataLayer
                                    if (formData.action === 'wpforms_submit') {
                                        pushToDataLayer(formData.wpforms_id, formData);
                                    }
                                }
                            } catch (err) {
                                console.warn('Error al procesar respuesta WPForms AJAX', err);
                            }
                        }
                    });
                }
                return origSend.apply(this, arguments);
            };

            return xhr;
        };
    }

    // Listener para formularios NO AJAX de WPForms
    document.querySelectorAll('form[id^="wpforms-form-"]:not(.wpforms-ajax-form)').forEach(function(form) {
        form.addEventListener('submit', function(event) {
            var formData = new FormData(form);
            var data = {};

            // Recorremos y limpiamos los campos del formulario
            formData.forEach(function(value, key) {
                if (key) {
                    data[formatKey(key)] = value;
                }
            });

            // Obtenemos el ID del formulario para identificarlo
            var formId = form.getAttribute('data-formid') || form.getAttribute('id');

            // Enviamos los datos al dataLayer
            pushToDataLayer(formId, data);
        });
    });

})();
</script>
