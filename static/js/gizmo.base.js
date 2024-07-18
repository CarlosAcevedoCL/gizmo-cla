"use strict";

/**
    * Represents a GizmoBase object.
    * @author Carlos Acevedo.
    * @param {json} jsonParams - JSON with basic definition for the object.
    * @param {json} jsonLayout - JSON with layout for the object.
    */
class GizmoBase {
    constructor( jsonParams , jsonLayout ){
        if(jsonParams == null) {
            console.error('GizmoBase Exception: jsonParams no especificado.');
            return;
        }

        if(jsonParams.id == null) {
            console.error('GizmoBase Exception: jsonParams.id no especificado.');
            return;
        }

        this.id = jsonParams.id;
        this.title = jsonParams.title || '';
        this.subtitle = jsonParams.subtitle || '';
        this.message = jsonParams.message || '';
        this.type = jsonParams.type || '';
        this.is_inited = false;
        this.is_visible = false;

        //this.Container = document.createElement('div');
        //this.Container.id = this.id + '.Container';
        this.Container = Gizmo.createObject(this.id + '.Container' , 'div');

        this.Container.className = 'GizmoBase';

        if(jsonLayout == null) {
            jsonLayout = {
                parts:[
                    {id:'title',    style:{display:'none'} },
                    {id:'subtitle', style:{display:'none'} },
                    {id:'body',     style:{display:'none'} },
                    {id:'buttons',  style:{display:'none'} },
                    {id:'message',  style:{display:'none'} }
                ]
            }
        }

        this.setLayout(jsonLayout);

        if(this.title != '')
            this.setTitle(this.title);

        if(this.subtitle != '')
            this.setSubtitle(this.subtitle);

        if(this.message != '')
            this.setMessage(this.message);
    }

    /**
     * Set the Object Layout
     * @param {json} jsonLayout - JSON that represent the object layout.
     * @returns {void}
    */
    setLayout = function(jsonLayout) {
        for(let p=0; p<jsonLayout.parts.length; p++) {
            let pId = jsonLayout.parts[p].id;

            let oPart = document.createElement('div');
            oPart.id = this.Container.id + '.' + pId;
            oPart.className = pId;

            let sValue = '';
            switch(pId) {
                case 'superior':
                    oPart.className = 'GizmoPageSuperior';
                    break;
                case 'menu':
                    oPart.className = 'GizmoMenu';
                    break;
                case 'title':
                    sValue = this.title;
                    oPart.innerText = sValue;
                    break;
                case 'subtitle':
                    sValue = this.subtitle;
                    oPart.innerText = sValue;
                    break;
                case 'message':
                    sValue = this.message;
                    oPart.innerText = sValue;
                    break;
                case 'footer':
                    sValue = this.footer;
                    oPart.innerText = sValue;
                    break;
                case 'body':
                    sValue = '&nbsp;';
                    oPart.innerHtml = sValue;
                    break;
                case 'buttons':
                    oPart.className = 'GizmoButtons';
                    break;
              //case 'bottom':
              //    oPart.className = 'GizmoPageBottom';
              //    break;
            }

            let pStyle = jsonLayout.parts[p].style;
            if(pStyle==null)
                pStyle = {};
            pStyle.padding = '0px';

            this.Container.appendChild(oPart);
        }
    }

    /**
     * Render the Object in the parent object.
     * @param {string} parent - id of the parent object.
     * @returns {void}
    */
    renderTo = function(parent){
      //let oParent = document.getElementById(parent);
        let oParent = Gizmo.$(parent);
        if(oParent){
            oParent.appendChild(this.Container);
            this.show();
        }
    }

    /**
     * Show/makes the Object visible.
     * @returns {void}
    */
    show = function(){
      //this.Container.style.display = '';
      //this.Container.style.visibility = 'visible';
        Gizmo.showObject(this.Container.id);
        this.is_visible = true;
    }

    /**
     * Hide/makes the Object invisible.
     * @returns {void}
    */
    hide = function(){
      //this.Container.style.display = 'none';
      //this.Container.style.visibility = 'hidden';
        Gizmo.hideObject(this.Container.id);
        this.is_visible = false;
    }

    /**
     * Switchs the Objects between visible to invisible and viceversa.
     * @returns {void}
    */
    toggle = function(){
        if(this.is_visible == false)
            this.show();
        else
            this.hide();
    }

    /**
     * Set the Title for the Object .
     * @param {string} title - Title for the Object.
     * @returns {void}
    */
    setTitle = function(title) {
        //let oTitle = document.getElementById( this.Container.id + '.' + 'title' );
        let oTitle = Gizmo.$(this.Container.id + '.' + 'title');
        if(oTitle){
            oTitle.style.display = '';
            oTitle.style.visibility = 'visible';
            oTitle.innerText = title;
        }
    }

    /**
     * Set the Subtitle for the Object .
     * @param {string} subtitle - Subtitle for the Object.
     * @returns {void}
    */
    setSubtitle = function(subtitle) {
      //let oSubtitle = document.getElementById( this.Container.id + '.' + 'subtitle' );
        let oSubtitle = Gizmo.$(this.Container.id + '.' + 'subtitle' );
        if(oSubtitle){
            oSubtitle.style.display = '';
            oSubtitle.style.visibility = 'visible';
            oSubtitle.innerText = subtitle;
        }
    }

    /**
     * Set the Message for the Object .
     * @param {string} message - Message for the Object.
     * @param {string} type - type of message error|info|success|warning.
     * @returns {void}
    */
    setMessage = function(message,type) {
        if(Gizmo.isNullOrEmpty(message))
            message = '';
        if(Gizmo.isNullOrEmpty(type))
            type = 'info';

        let oMessage = document.getElementById( this.Container.id + '.' + 'message' );
        if(oMessage){
            if(Gizmo.isEmpty(message)){
                oMessage.innerText = message;
                Gizmo.hideObject(oMessage.id);
            }
            else {
                oMessage.innerText = message;
                Gizmo.showObject(oMessage.id);
            }
        }
    }

    /**
     * Set the Message for the Object.
     * @param {string} message - Message for the Object.
     * @param {string} type - type of message error|info|success|warning.
     * @returns {void}
    */
    setFooter = function(message,type) {
        let oFooter = document.getElementById( this.Container.id + '.' + 'footer' );
        if(oFooter){
            oFooter.style.display = '';
            oFooter.style.visibility = 'visible';
            oFooter.innerText = message;
        }
    }

    getContainer = function(sPart) {
        if(sPart==null){
            var oDiv = document.getElementById(this.id);
            if(oDiv == null)
            oDiv = document.getElementById(this.divContainer);
            return oDiv;
        }else{
            var oPart = document.getElementById(this.id + '.' + sPart);
            if(oPart!=null)
                return oPart;
            var aDivs = this.divContainer.childNodes;
            var oPart = null;
            for(var i=0; i<aDivs.length; i++){
                if( aDivs[i].id == this.id + '.' + sPart ){
                    oPart = aDivs[i];
                    break;
                }
            }
            return oPart;
        }
    }

    setStyle = function(jStyle){
        this.getContainer().setStyle(jStyle);
        return this;
    }

    setClass = function(sClass) {
        var oDiv = this.getContainer();
            if(oDiv)
                oDiv.setAttribute('class',sClass);
        return this;
    }

    addClass = function(sClass) {
        var oDiv = this.getContainer();
            if(oDiv)
            oDiv.className += (' ' + sClass);
        return this;
    }

    alert = function(sMethod, sMsg){
        alert(this.type + '[' + this.id + '].' + sMethod + '() :  '    + sMsg);
    }

}