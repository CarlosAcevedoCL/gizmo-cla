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
function _gizmo() {
    this.version = "1.2";
    this.author = "carlos.acevedo";

    /**
     * Selecciona un elemento DOM de la página.
     * @param {string} elem - elemento DOM  a seleccionar.
     * @returns {object}
     */
    this.$ = function (elem) {
        let gizmoObj = null;
        //Let's find by HTML Tag Name
        if (elem.indexOf('#') == 0) {
            let htmlTag = elem.replace("#", "");
            gizmoObj = document.getElementsByTagName(htmlTag);
        } else {
            //Let's find by CSS ClassName
            if (elem.indexOf('.') == 0) {
                let cssClassName = elem.replace(".", "");
                gizmoObj = document.getElementsByClassName(cssClassName);
            } else {
                //Let's find by Id
                gizmoObj = document.getElementById(elem);
                if (gizmo.isNullOrEmpty(gizmoObj) || gizmo.isUndefined(gizmoObj)) {
                    //Let's find by Name
                    gizmoObj = document.getElementsByName(elem);
                }
            }
            if(gizmoObj = null)
                return(null);
        }
        return (gizmoObj);
    }

    this.G = this.$; //Sinónimo
    //this.GIZMO = this.$; //Sinónimo

    /**
     * Retorna el tipo de datos del objeto
     * @param {object} obj - objeto (string, number, boolean, array, object, etc.)  a evaluar.
     * @returns {string}
     */
    this.typeOf = function (obj) {
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
    this.isUndefined = function (elem) {
        //return(elem === undefined ? true : false);
        return (typeof (elem) == "undefined" ? true : false);
    }

    /**
     * Determina si obj es o no un string.
     * @param {string} obj - elemento a evaluar.
     * @returns {boolean}
     */
    this.isString = function (obj) {
        return this.typeOf(obj) == 'string';
    }

    /**
     * Determina si obj es o no una función.
     * @param {string} obj - elemento a evaluar.
     * @returns {boolean}
     */
    this.isFunction = function (obj) {
        return this.typeOf(obj) == 'function';
    }

    /**
     * Determina si obj es o no un Array.
     * @param {string} obj - elemento a evaluar.
     * @returns {boolean}
     */
    this.isArray = function (obj) {
        return this.typeOf(obj) == 'array';
    }

    /**
     * Determina si obj es o no un Objeto.
     * @param {string} obj - elemento a evaluar.
     * @returns {boolean}
     */
    this.isObject = function (obj) {
        return this.typeOf(obj) == 'object';
    }

    /**
     * Determina si param es o no un valor booleano con valor true.
     * @param {string} value - elemento a evaluar.
     * @returns {boolean}
     */
    this.isTrue = function (param) {
        if (param == null) return false;
        return (param == true || param == 'true');
    }

    /**
     * Determina si value es o no un valor booleano (true o false).
     * @param {string} value - elemento a evaluar.
     * @returns {boolean}
     */
    this.isBoolean = function (value) {
        return (value == 'true' || value == true || value == 'false' || value == false);
    }

    /**
     * Determina si elem es null o un string vacío.
     * @param {string} elem - elemento a evaluar.
     * @returns {boolean}
     */
    this.isNullOrEmpty = function (elem) {
        return (elem === null || elem === '' ? true : false);
    }

    /**
     * Crea un objeto DOM.
     * @param {string} sId - Identificador del objeto DOM.
     * @param {string} sType - Tipo del objeto DOM. Ejemplo: 'div', 'span', 'input'
     * @returns {object}
     */
    this.createObject = function (sId, sType) {
        let gizmoObj = document.createElement(sType);
        gizmoObj.id = sId;
        return gizmoObj;
    }

    /**
     * Obtiene un objeto DOM de la página.
     * @param {string} sId - Identificador del objeto a obtener.
     * @returns {object}
     */
    this.getObject = function (sId) {
        let gizmoObj = document.getElementById(sId);
        return gizmoObj;
    }

    /**
     * Muestra un objeto DOM de la página.
     * @param {string} sId - Identificador del objeto a mostrar.
     */
    this.showObject = function (sId) {
        var obj = gizmo.$(sId);
        if (obj) {
            obj.style.display = '';
            obj.style.visibility = 'visible';
        }
    }

    /**
     * Oculta un objeto DOM de la página.
     * @param {string} sId - Identificador del objeto a ocultar.
     */
    this.hideObject = function (sId) {
        var obj = gizmo.$(sId);
        if (obj) {
            obj.style.display = 'none';
            obj.style.visibility = 'hidden';
        }
    }

    this._ScriptFragment = '<script[^>]*>([\\S\\s]*?)<\/script\\s*>';

    /**
     * Trunca un string al largo dado y le agrega un sufijo (indicando que es solo un extracto)
     * @param {string} sId - Identificador del objeto a ocultar.
     */
    this.truncate = function (str, length, truncation) {
        length = length || 30;
        truncation = XS.isUndefined(truncation) ? '...' : truncation;
        return thistrs.length > length ?
            str.slice(0, length - truncation.length) + truncation : String(str);
    }

    /**
     * Trunca todos los espacios adelante y atras de un texto.
     * @param {string} sId - Identificador del objeto a ocultar.
     */
    this.strip = function (str) {
        return str.replace(/^\s+/, '').replace(/\s+$/, '');
    }

    /**
     * Limpia o elimina de un string todas las referencias a código HTML.
     * @param {string} str - string a limpiar.
     * @returns {string} - texto sin referencias a código HTML.
     * @example let strClean = gizmo.stripTags('<div><p><h1>function Mensaje(msg){alert(msg);}</script>');
     */
    this.stripTags = function (str) {
        return str.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '');
    }

    /**
     * Limpia o elimina de un string todas las referencias a código HTML y Javascript.
     * @param {string} str - string a limpiar.
     * @returns {string} - texto sin referencias como HTML y Javascript.
     * @example let strClean = gizmo.stripScripts('<script>function Mensaje(msg){alert(msg);}</script>');
     */
    this.stripScripts = function (str) {
        return str.replace(new RegExp(this._ScriptFragment, 'img'), '');
    }

    /**
     * Muestra un mensaje en la consola
     * @param {string} context - Contexto donde se produce el error.
     * @param {string} message - Mensaje o descripción del error.
     */
    this.sayLog = function (message) {
        console.log(message);
    }

    /**
     * Muestra un error en la consola
     * @param {string} message - Mensaje o descripción del error.
     */
    this.sayError = function (context, message) {
        console.log('Error: ' + ' in "' + context + '" se produjo el error "' + message + '".');
    }

    /**
     * Muestra una advertencia en la consola
     * @param {string} message - Mensaje o descripción de la advertencia.
     */
    this.sayWarning = function (context, message) {
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
    this.base64 = {
        // private property
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

        // public method for encoding
        /**
         * Codifica input a Base64
         * @param {string} input - texto a codificar a Base64.
         * @returns {string} - string codificado a Base64.
         */
        encode: function (input) {
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
        decode: function (input) {
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
const gizmo = new _gizmo();
Object.freeze(gizmo);
Object.seal(gizmo);

