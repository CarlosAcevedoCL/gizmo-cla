"use strict";

let Boolean = {
    True: true,
    False: false
}

let String = {
    Empty: '',
    Space: ' '
}

function _isNull(elem) {
    return (elem == null);
}
let isNull = _isNull;
let IsNull = _isNull;

function _isEmpty(elem) {
    return (elem == '');
}
let isEmpty = _isEmpty;
let IsEmpty = _isEmpty;

function _isUndefined(elem) {
    return (elem == undefined);
}
let isUndefined = _isUndefined;
let IsUndefined = _isUndefined;

function _isNullOrEmpty(elem) {
    return (isNull(elem) || isEmpty(elem));
}
let isNullOrEmpty = _isNullOrEmpty;
let IsNullOrEmpty = _isNullOrEmpty;

function _replace(Expression, Find, Replace) {
    if (Expression == null || String(Expression) == 'undefined')
        return Expression;
    let temp = Expression;
    let a = 0;
    for (let i = 0; i < Expression.length; i++) {
        a = temp.indexOf(Find);
        if (a == -1)
            break
        else
            temp = temp.substring(0, a) + Replace + temp.substring((a + Find.length));
        Expression = temp;
    }
    return temp;
}

function typeOf(obj) {
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
let TypeOf = typeOf;

/**
Transforma la descripción de un estilo
*/
const jStyleEquiv = {
    'ingTop':'ing-top',
    'ingLeft':'ing-left',
    'ingRight':'ing-right',
    'ingBottom':'ing-bottom',
    'marginTop':'margin-top',
    'marginLeft':'margin-left',
    'marginRight':'margin-right',
    'marginBottom':'margin-bottom',
    'fontSize':'font-size',
    'fontWeight':'font-weight',
    'fontFamily':'font-family',
    'borderTop':'border-top',
    'borderBottom':'border-bottom',
    'borderLeft':'border-left',
    'borderRight':'border-right',
    'backgroundImage':'background-image',
    'backgroundColor':'background-color',
    'maxHeight':'max-height',
    'minHeight':'min-height',
    'maxWidth':'max-width',
    'minWidth':'min-width',
    'boxShadow':'box-shadow',
    'overflowY':'overflow-Y',
    'overflowX':'overflow-X',
    'textAlign':'text-align',
    'flexDirection':'flex-direction'
}

function _formatNameStyle(sStyle) {
    for(let style in jStyleEquiv)
        sStyle = _replace( sStyle, jStyleEquiv[style] );
    return sStyle;
}

function _getNameStyle(style) {
    let ret = jStyleEquiv[style];
    if(ret==null)
        ret = style;
    return ret;
}

function getVar(sVar) {
    let namespaces = sVar.split(".");
    let func = namespaces.pop();
    let context = window;
    for (let i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func];
}

function setVar(sVar) {
    if (IsEmpty(sVar))
        return null;
    let nPos = sVar.indexOf('=');
    let sName = sVar.substr(0, nPos);
    sName = sName.trim();
    let sValue = sVar.substr(nPos + 1, sVar.length);
    sValue = sValue.trim();
    if (!isNaN(sValue))
        sValue = eval(sValue);
    else {
        sValue = _replace(sValue, '"', '');
        //sValue = _replace(sValue, "'",'');
        if (sValue.substr(0, 1) == '[')
            sValue = eval(sValue);
    }
    if (sVar.indexOf('var ') != -1) {
        sName = sName.replace('var ', '');
        sName = sName.trim();
        window[sName] = sValue;
        return window[sName];
    } else {
        let namespaces = sName.split(".");
        let func = namespaces.pop();
        let context = window;
        for (let i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        context[func] = sValue;
        return context[func];
    }
}

function _evaluate(sFunc) {
    if (IsEmpty(sFunc))
        return;
    if (typeof (sFunc) == 'function')
        sFunc();
    else {
        if (isNaN(sFunc)) {
            if (sFunc.indexOf('undefined') != -1)
                return;
            let sF = Gizmo.stripScripts(sFunc);
            let nP = sF.indexOf('=');
            if (nP != -1) { //Asignación
                if (sF.indexOf('(') == -1) //Sin función
                    return setVar(sFunc);
                else { //Con función
                    let sV = sF.substr(0, nP);
                    sV = sV.trim();
                    sF = sF.substr(nP + 1);
                    sF = sF.trim();
                    sV = sV + '=' + evalFunction(sF);
                    return XS_setVar(sV);
                }
            } else { //Recuperación
                if (sF.indexOf('(') != -1) { //Con función
                    if (sF.indexOf(';') != -1) {
                        let aF = sF.split(';');
                        sF = null;
                        for (let i = 0; i < aF.length; i++) {
                            sF = aF[i];
                            evalFunction(sF);
                        }
                    } else {
                        return evalFunction(sF);
                    }
                } else { //Sin función
                    return XS_getVar(sFunc);
                }
            }
        } else
            return eval(sFunc);
    }
}
let Evaluate = _evaluate;

/**
 * Evalúa funciones con o sin namespaces (ej.: page.Section.funcion()) y evitar el uso de eval (eval is evil)
 */
function evalFunction(text) {
    if (_isEmpty(text))
        return;
    let regex = /(.*\()(.*)(\);?)/gm;
    let params = text.replace(regex, '$2');
    if (!_isEmpty(params))
        params = params.trim();

    params = params.split(',');

    let param;
    for (let i = 0; i < params.length; i++) {
        param = params[i];
        param = param.trim();
        if (param.substr(0, 1) == "'")
            param = _replace(param, "'", "");
        else
        if (param.substr(0, 1) == '"')
            param = _replace(param, '"', '');
        params[i] = param;
    }

    regex = /(.*)(\(.*\);?)/gm;
    var func = text.replace(regex, '$1');
    return executeFunction(func, window, params);

}

/**
 * Para ejecutar funciones con o sin namespaces (page.algo.algo) y evitar el uso de eval
 */
function executeFunction(functionName, context /*, args */ ) {
    let args = Array.prototype.slice.call(arguments, 2);
    if (args.length > 0) {
        args = args[0];
        if (args.length == 0 || _isEmpty(args[0]))
            args = null;
    } else
        args = null;
    let namespaces = functionName.split(".");
    let func = namespaces.pop();
    for (let i = 0; i < namespaces.length; i++)
        context = context[namespaces[i]];

    if (context[func] == undefined) {
        console.error('No se identifica ' + functionName);
        return;
    }

    let result = null;
    try {
        result = context[func].apply(context, args);
    } catch (e) {
        console.error('Error al ejecutar ' + functionName);
        console.error('Error:', e)
    }
    return result;
}

function escapeValue(sValue) {
    if (sValue == null) return null;
    if (isNaN(sValue) == false)
        return sValue;
    if (sValue.toString() == 'NaN')
        return '';

    var sAux = sValue;
    if (sAux.blank() == false) {
        sAux = sAux.stripScripts();
        sAux = sAux.stripTags();
        sAux = sAux.strip();
        sAux = sAux.toString();
    }
    return sAux;
}

function unescapeValue(sValue) {
    if (sValue == null) 
        return null;
    var sAux = sValue.toString();
    if (sAux.blank() == false) {
        sAux = sAux.stripScripts();
        if (sAux.blank() == false) {
            sAux = sAux.unescapeHTML();
            sAux = sAux.replace(/<BR>/g, String.fromCharCode(13) + String.fromCharCode(10));
            sAux = sAux.replace(/<br>/g, String.fromCharCode(13) + String.fromCharCode(10));
            sAux = sAux.replace(/&apos;/g, "'").replace(/&quot;/g, '"');
            sAux = sAux.replace(/\&#91;/g, '[').replace(/\&#93;/g, ']');
            sAux = sAux.replace(/&#123;/g, '{').replace(/&#125;/g, '}');
            sAux = sAux.replace(/&#64;/g, '@');
        }
        sAux = sAux.stripTags();
        sAux = sAux.strip();
        sAux = sAux.toString();
    }
    sAux = _replace(sAux, "'", "");
    return sAux;
}


