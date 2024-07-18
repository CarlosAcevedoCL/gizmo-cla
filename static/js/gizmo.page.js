"use strict";
/**
    * definición de un objeto GizmoPage
    * @param {string} jsonParams - json que contiene la definición básica del objeto.
    * @param {string} jsonLayout - json que contiene la definición de las partes componentes.
    */
class GizmoPage extends GizmoBase {
    constructor( jsonParams , jsonLayout ){
        if(jsonLayout == null) {
            jsonLayout = {
                parts:[
                    {id:'superior', style:{display:'none'} },
                    {id:'menu',     style:{display:'none'} },
                    {id:'loading',  style:{display:'none'} },
                    {id:'title',    style:{display:'none'} },
                    {id:'subtitle', style:{display:'none'} },
                    {id:'body',     style:{display:'none'} },
                    {id:'buttons',  style:{display:'none'} },
                    {id:'message',  style:{display:'none'} },
                    {id:'bottom',   style:{display:'none'} }
                ]
            }
        }
        super(jsonParams,jsonLayout); //aplicamos la herencia

        if(jsonParams == null) {
            console.error('GizmoPage Exception: jsonParams no especificado.');
            return;
        }

        if(jsonParams.id == null) {
            console.error('GizmoPage Exception: jsonParams.id no especificado.');
            return;
        }

        this.id = jsonParams.id;
        this.title = jsonParams.title || '';
        this.subtitle = jsonParams.subtitle || '';
        this.type = 'Page';

        this.Page = document.createElement('div');
        this.Page.id = this.id + '.Page';
        this.Page.className = 'GizmoPage';

        //Methods
        this.onInit = null;

        this.Section = new GizmoSection ( jsonParams , jsonLayout );

    }

    /* Métodos de GizmoPage */
    loadingOn = function() {
        let oLoading = document.getElementById( this.Container.id + '.' + 'loading' );
        if(oLoading){
            oLoading.innerText = 'Cargando ...';
            oLoading.style.display = '';
            oLoading.style.visibility = 'visible';
        }
    }

    loadingOff = function() {
        let oLoading = document.getElementById( this.Container.id + '.' + 'loading' );
        if(oLoading){
            oLoading.innerText = '';
            oLoading.style.display = 'none';
            oLoading.style.visibility = 'hidden';
        }
    }

    setMenu = function(jsonMenu) {
        let aMenu = jsonMenu.menus;
    }

    setButtons = function(jsonButtons){
        let oButtons = document.getElementById(this.id + '.Container.buttons');
        if(oButtons){
            for(let b=0; b<jsonButtons.buttons.length; b++){
                let _id = jsonButtons.buttons[b].id;
                let _text = jsonButtons.buttons[b].text;
                let _icon = jsonButtons.buttons[b].icon;
                let _action = jsonButtons.buttons[b].action;
                let oBtn = new GizmoButton( _id, _text, _icon, _action);
                oButtons.appendChild(oBtn.Button);
            }
        }
    }

    setButton = function(jsonButton){
        let oButtons = document.getElementById(this.id + '.Container.buttons');
        if(oButtons){
                let _id = jsonButton.id;
                let _text = jsonButton.text;
                let _icon = jsonButton.icon;
                let _action = jsonButton.action;
                let oBtn = new GizmoButton( _id, _text, _icon, _action);
                oButtons.appendChild(oBtn.Button);
        }
    }

    open (title) {
        //this._init();
        if(this.onInit != null) {
            if(Gizmo.typeOf(this.onInit) == 'function')
                this.onInit();
            //else
            //Gizmo.execute
        }
        else {
            this.setTitle(title);
            this.setMessage();
            this.show();
        }
    }
}

