"use strict";

/**
* definición de un objeto GizmoButton
* @param {string} _id - Identificador del botón.
* @param {string} _text - Texto del botón.
* @param {string} _icon - Ícono del botón.
* @param {string} _action - Acción/Nombre de Función o Función que ejecuta el botón.
* @example
* let btnLogin = new GizmoButton('btnLogin', 'Login', 'key', 'Login()');
* btnLogin.renderTo('divContainer'); */
class GizmoButton {
    constructor( _id, _text, _icon, _action){
        this.id = _id;
        this.text = _text;
        this.icon = _icon || null;
        this.action = _action || null;
        this.Button = document.createElement('div');
        this.Button.id = this.id + '.Button';

        let sHtml = '';
        if(this.icon != null){
            sHtml += '<img src="' + gz_path_icons + 'icon_' + this.icon + '.gif" border="0"/>&nbsp;&nbsp;';
        }

        sHtml += this.text ;
        this.Button.className = 'GizmoButton';
        this.Button.innerHTML = sHtml;
        this.Button.setAttribute( 'onclick' , this.action );
    }

    renderTo = function(parent){
        let oParent = document.getElementById(parent);
        if(oParent){
            oParent.appendChild(this.Button);
            this.show();
        }
    }

    show = function(){
        this.Button.style.display = '';
        this.Button.style.visibility = 'visible';
    }

    hide = function(){
        this.Button.style.display = 'none';
        this.Button.style.visibility = 'hidden';
    }

}

