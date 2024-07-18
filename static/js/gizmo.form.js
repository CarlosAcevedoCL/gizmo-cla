"use strict";

class GizmoForm extends GizmoBase {
    constructor(jsonParams) {
        super(jsonParams,null);
        this.gzClass = 'GizmoForm';
        if(jsonParams == null) {
            console.error(this.gzClass+' Exception: jsonParams no especificado.');
            return;
        }

        if(jsonParams.id == null) {
            console.error(this.gzClass+' Exception: jsonParams.id no especificado.');
            return;
        }

        this.id = jsonParams.id;
        this.title = jsonParams.title || '';
        this.subtitle = jsonParams.subtitle || '';
        this.message = jsonParams.message || '';
        this.type = jsonParams.type || 'Form';
        this.is_inited = false;
        this.is_visible = false;

        this.Index = [];
        this.Keys = [];
        this.Fields = [];
    }

    setFields = function(jsonFields) {}

    setKeys = function(keys) {
        let aKeys = keys.split(',');
        if(aKeys.length > 0)
            this.Keys = aKeys;
        else
            this.Keys.push(keys);
    }

    setIndex = function(index) {}

    validate = function() {}

    save = function(message) {
        if(message == null || message == '')
            message = 'Grabando...';

    }

    save_do = function() { }

    delete = function(message) {
        if(message == null || message == '')
            message = 'Grabando...';

    }

    delete_do = function() { }

}