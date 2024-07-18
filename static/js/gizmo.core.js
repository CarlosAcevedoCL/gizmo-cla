"use strict";
/* gizmo.core.js */

const _gizmoPage = 'gizmoPage';
const _gizmoTitle = 'gizmoTitle';
const _gizmoSubtitle = 'gizmoSubtitle';
const _gizmoMenu = 'gizmoMenu';
const _gizmoBody = 'gizmoBody';
const _gizmoFooter = 'gizmoFooter';
const _gizmoButtons = 'gizmoButtons';
const _gizmoButton = 'gizmoButton';
const _gizmoContainer = 'gizmoContainer';
const _gizmoDescription = 'gizmoContainer';
const _gizmoMessageInfo = 'gizmoMsgSInfo';
const _gizmoMessageSuccess = 'gizmoMsgSuccess';
const _gizmoMessageWarning = 'gizmoMsgWarning';
const _gizmoMessageError = 'gizmoMsgWarning';

/* Ejemplo de Objetos con Herencia en JavaScript */
class _gizmo {
    constructor() {
        this.version = "1.2";
        this.author = "carlos.acevedo";
    }

    /**
     * Selecciona un elemento DOM de la página.
     * @param {string} elem - elemento DOM  a seleccionar.
     * @returns {object}
     */
    $(elem) {
        let obj = null;
        //Let's find by Id
        obj = document.getElementById(elem);
        if (obj == null)
            return (null);

        obj.tag = function () {
            return this.tagName.toLowerCase();
        }
        obj.show = function () {
            this.style.display = '';
            return this;
        }
        obj.hide = function () {
            this.style.display = 'none';
            return this;
        }
        obj.isEmpty = function () {
            return _isEmpty(this)
        }
        obj.addClass = function (sClass) {
            this.className += (' ' + sClass);
            return this;
        }
        obj.toggleClass = function (sClass) {
            if (sClass == null) {
                sClass = this.getAttribute('_class');
                if (Gizmo.isEmpty(sClass))
                    sClass = 'input';
                this.removeAttribute('_class');
            } else {
                var _C = this.getAttribute('class');
                this.setAttribute('_class', _C);
            }
            this.removeAttribute('class');
            this.classList.remove(sClass);
            this.classList.add(sClass);
            this.setAttribute('class', sClass);
        }
        obj.switchClass = function (sFrom, sTo) {
            this.classList.remove(sFrom);
            this.classList.add(sTo);
        }
        obj.setStyle = function (styles) {
            var element = this;
            var elementStyle = element.style,
                match;

            if (Gizmo.typeOf(styles) == 'string') {
                elementStyle.cssText += ';' + styles;
                if (styles.include('opacity')) {
                    var opacity = styles.match(/opacity:\s*(\d?\.?\d*)/)[1];
                    Element.setOpacity(element, opacity);
                }
                return element;
            }

            for (var property in styles) {
                if (property === 'opacity') {
                    Element.setOpacity(element, styles[property]);
                } else {
                    var value = styles[property];
                    if (property === 'float' || property === 'cssFloat') {
                        property = Gizmo.typeOf(styles) == 'undefined' ?
                            'cssFloat' : 'styleFloat';
                    }
                    elementStyle[property] = value;
                }
            }
            return element;
        } //setStyle

        obj.getStyle = function (style) {
            var element = this;
          //style = normalizeStyleName(style);

            var value = element.style[style];
            if (!value || value === 'auto') {
                var css = document.defaultView.getComputedStyle(element, null);
                value = css ? css[style] : null;
            }

            if (style === 'opacity')
                return(value ? parseFloat(value) : 1.0);

            return(value === 'auto' ? null : value);
        } //getStyle

        return obj;
    }

    static G = this.$; //Sinónimo


    setStyle (element, styles) {
        var elementStyle = element.style, match;
        if (this.typeOf(styles) == 'string') {
            elementStyle.cssText += ';' + styles;
            if (styles.include('opacity')) {
                var opacity = styles.match(/opacity:\s*(\d?\.?\d*)/)[1];
                Element.setOpacity(element, opacity);
            }
            return element;
        }

        for (var property in styles) {
            if (property === 'opacity') {
                Element.setOpacity(element, styles[property]);
            } else {
                var value = styles[property];
                if (property === 'float' || property === 'cssFloat') {
                    property = this.typeOf(styles) == 'undefined' ? 'cssFloat' : 'styleFloat';
                }
                elementStyle[property] = value;
            }
        }
        return element;
    }//setStyle


    /**
     * Retorna el tipo de datos del objeto
     * @param {object} obj - objeto (string, number, boolean, array, object, etc.)  a evaluar.
     * @returns {string}
     */
    typeOf(obj) {
        var sType = Object.prototype.toString.call(obj);
        switch (sType) {
            case 'Null':
                return 'null';
            case 'Undefined':
                return 'undefined';
            case 'Boolean':
                return 'boolean';
            case 'Number':
                return 'number';
            case 'String':
                return 'string';
            case 'Object':
                return 'object';
            case '[object Function]':
                return 'function';
            case '[object Boolean]':
                return 'boolean';
            case '[object Number]':
                return 'number';
            case '[object String]':
                return 'string';
            case '[object Array]':
                return 'array';
            case '[object Date]':
                return 'date';
        }

        if (sType === '[object Object]') {
            if (obj.isObject === true)
                return 'xs_object';
            else
                return 'object';
        }

        if (sType.substr(0, 12) === '[object HTML')
            return 'element';
        return 'undefined';
    }

    /**
     * Determina si elem está o no definido.
     * @param {string} elem - elemento evaluar.
     * @returns {boolean}
     */
    isUndefined(elem) {
        return (typeof (elem) == "undefined" ? true : false);
    }

    /**
     * Determina si obj es o no un string.
     * @param {string} obj - elemento a evaluar.
     * @returns {boolean}
     */
    isString(obj) {
        return this.typeOf(obj) == 'string';
    }

    /**
     * Determina si obj es o no una función.
     * @param {string} obj - elemento a evaluar.
     * @returns {boolean}
     */
    isFunction(obj) {
        return this.typeOf(obj) == 'function';
    }

    /**
     * Determina si obj es o no un Array.
     * @param {string} obj - elemento a evaluar.
     * @returns {boolean}
     */
    isArray(obj) {
        return this.typeOf(obj) == 'array';
    }

    /**
     * Determina si obj es o no un Objeto.
     * @param {string} obj - elemento a evaluar.
     * @returns {boolean}
     */
    isObject(obj) {
        return this.typeOf(obj) == 'object';
    }

    /**
     * Determina si param es o no un valor booleano con valor true.
     * @param {string} value - elemento a evaluar.
     * @returns {boolean}
     */
    isTrue(param) {
        if (param == null)
            return false;
        return (param == true || param == 'true');
    }

    /**
     * Determina si value es o no un valor booleano (true o false).
     * @param {string} value - elemento a evaluar.
     * @returns {boolean}
     */
    isBoolean(value) {
        return (value == 'true' || value == true || value == 'false' || value == false);
    }

    /**
     * Determina si elem es un string vacío.
     * @param {string} elem - elemento a evaluar.
     * @returns {boolean}
     */
    isEmpty(elem) {
        return (elem === '');
    }

    /**
     * Determina si elem es null.
     * @param {string} elem - elemento a evaluar.
     * @returns {boolean}
     */
    isNull(elem) {
        return (elem === null);
    }

    /**
     * Determina si elem es null o un string vacío.
     * @param {string} elem - elemento a evaluar.
     * @returns {boolean}
     */
    isNullOrEmpty(elem) {
        return (elem === null || elem === '');
    }

    isUndefined(elem) {
        return (elem === undefined);
    }

    /**
     * Crea un objeto DOM.
     * @param {string} sId - Identificador del objeto DOM.
     * @param {string} sType - Tipo del objeto DOM. Ejemplo: 'div', 'span', 'input'
     * @returns {object}
     */
    createObject(sId, sType) {
        let gizmoObj = document.createElement(sType);
        gizmoObj.id = sId;
        return gizmoObj;
    }

    /**
     * Obtiene un objeto DOM de la página.
     * @param {string} sId - Identificador del objeto a obtener.
     * @returns {object}
     */
    getObject(sId) {
        let gizmoObj = document.getElementById(sId);
        return gizmoObj;
    }

    /**
     * Muestra un objeto DOM de la página.
     * @param {string} sId - Identificador del objeto a mostrar.
     */
    showObject(sId) {
        var obj = Gizmo.$(sId);
        if (obj) {
            obj.style.display = '';
            obj.style.visibility = 'visible';
        }
    }

    /**
     * Oculta un objeto DOM de la página.
     * @param {string} sId - Identificador del objeto a ocultar.
     */
    hideObject(sId) {
        var obj = this.$(sId); //var obj = Gizmo.$(sId);
        if (obj) {
            obj.style.display = 'none';
            obj.style.visibility = 'hidden';
        }
    }

    _ScriptFragment = '<script[^>]*>([\\S\\s]*?)<\/script\\s*>';

    /**
     * Trunca un string al largo dado y le agrega un sufijo (indicando que es solo un extracto)
     * @param {string} sId - Identificador del objeto a ocultar.
     */
    truncate(str, length, truncation) {
        length = length || 30;
        truncation = XS.isUndefined(truncation) ? '...' : truncation;
        return thistrs.length > length ?
            str.slice(0, length - truncation.length) + truncation : String(str);
    }

    /**
     * Trunca todos los espacios adelante y atras de un texto.
     * @param {string} sId - Identificador del objeto a ocultar.
     */
    strip(str) {
        return str.replace(/^\s+/, '').replace(/\s+$/, '');
    }

    /**
     * Limpia o elimina de un string todas las referencias a código HTML.
     * @param {string} str - string a limpiar.
     * @returns {string} - texto sin referencias a código HTML.
     * @example let strClean = Gizmo.stripTags('<div><p><h1>function Mensaje(msg){alert(msg);}</script>');
     */
    stripTags(str) {
        return str.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
    }

    /**
     * Limpia o elimina de un string todas las referencias a código HTML y Javascript.
     * @param {string} str - string a limpiar.
     * @returns {string} - texto sin referencias como HTML y Javascript.
     * @example let strClean = Gizmo.stripScripts('<script>function Mensaje(msg){alert(msg);}</script>');
     */
    stripScripts(str) {
        return str.replace(new RegExp(this._ScriptFragment, 'img'), '');
    }

    /**
     * Muestra un mensaje en la consola
     * @param {string} context - Contexto donde se produce el error.
     * @param {string} message - Mensaje o descripción del error.
     */
    sayLog(message) {
        console.log(message);
    }

    /**
     * Muestra un error en la consola
     * @param {string} message - Mensaje o descripción del error.
     */
    sayError(context, message) {
        console.log('Error: ' + ' in "' + context + '" se produjo el error "' + message + '".');
    }

    /**
     * Muestra una advertencia en la consola
     * @param {string} message - Mensaje o descripción de la advertencia.
     */
    sayWarning(context, message) {
        try {
            console.warn('Warning: ' + message + '".');
        } catch (exWarning) {
            console.log('Error: ' + ' in "' + context + '" se produjo el error "' + message + '".');
        }
    }

    /**
     * Objeto para codificar y decodificar en Base64
     * @param {string} message - Mensaje o descripción de la advertencia.
     */
    base64 = {
        // private property
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

        // public method for encoding
        /**
         * Codifica input a Base64
         * @param {string} input - texto a codificar a Base64.
         * @returns {string} - string codificado a Base64.
         */
        encode(input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;
            while (i < input.length) {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);
                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }
                output = output +
                    this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                    this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
            }
            return output;
        },

        /**
         * Decodifica input desde Base64
         * @param {string} input - texto a decodificar desde Base64.
         * @returns {string} - string decodificado desde Base64.
         */
        decode(input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (i < input.length) {
                enc1 = this._keyStr.indexOf(input.charAt(i++));
                enc2 = this._keyStr.indexOf(input.charAt(i++));
                enc3 = this._keyStr.indexOf(input.charAt(i++));
                enc4 = this._keyStr.indexOf(input.charAt(i++));
                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;
                output = output + String.fromCharCode(chr1);
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }
            }
            return output;
        }
    } //base64

} // _gizmo

const Gizmo = new _gizmo();
Object.freeze(Gizmo);
Object.seal(Gizmo);