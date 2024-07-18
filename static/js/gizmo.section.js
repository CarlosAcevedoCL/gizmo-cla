"use strict";

/**
* definiciÃ³n de un objeto GizmoSection
* @param {json} jsonParams - Identificador del Object.
* @param {json} jsonLayout - Text del botÃ³n.
* @param {string} parent - Ã�cono del botÃ³n.
* @example
* let Seccion = new GizmoSection( {id:'Seccion', title:'Nombre de la Sección'} );
* Seccion.renderTo('divContainer'); */
class GizmoSection extends GizmoBase {
    constructor( jsonParams , jsonLayout, parent ){
        super(jsonParams,jsonLayout); //aplicamos la herencia
        if(jsonParams == null) {
            console.error('GizmoSection Exception: jsonParams no especificado.');
            return;
        }

        if(jsonParams.id == null) {
            console.error('GizmoSection Exception: jsonParams.id no especificado.');
            return;
        }

        this.id = jsonParams.id;
        if(parent != null){
            this.parent = parent;
        }

        this.title = jsonParams.title;
        this.type = jsonParams.type || 'Section';

        this.is_inited = false;
        this.is_opened = false;

        this.onOpen = jsonParams.onOpen || null;
        this.onLoad = jsonParams.onLoad || null;
      //this.onSelect = jsonParams.onSelect || null;
        this.onClose = jsonParams.onClose || null;

        this.Section = document.createElement('div');
        this.Section.id = this.id + '.Section';
        this.Section.className = 'GizmoSection';
    }

    /* Métodos especí­ficos de GizmoSection */
    createObject = function(jsonParams) {
    }

    createSection = function(jsonSection) {

    }

    _init = function() {
        try {
            if (!this.is_inited) {
                if (this.init != null) {
                    this.init();
                    this.is_inited = true;
                }else
                if (this.Init != null) {
                    this.Init();
                    this.is_inited = true;
                }
            }

        } catch (error) {
            this.sayLog('XS_Pop.init(): error ', error)
            return false;
        }
        return this;
    }

    open = function(sTitle){
        this._init();
        this.show();
        this.title = sTitle || this.title;
    //  this.win = new XS_Window(this.id, _lang(this.title), this.getContainer(), { width:this.width, height:this.height }, this.id + '.close()');
        if(this.onOpen){
            if(Gizmo.typeOf(this.onOpen) == 'string')
                Gizmo.eval(this.onOpen)
            else
                this.onOpen();
        }
        this.is_opened = true;
        return this;
    }

    close = function(){
        /*
        if(this.win)
            _xs_closeWindow( this.win.id );
        else
            _xs_closeWindow();
        */
        if(this.onClose){
            if(Gizmo.typeOf(this.onClose) == 'string')
                Gizmo.eval(this.onClose)
            else
                this.onClose();
        }
        this.is_opened = false;
    }




}
