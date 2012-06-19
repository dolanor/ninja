/* <copyright>
This file contains proprietary software owned by Motorola Mobility, Inc.<br/>
No rights, expressed or implied, whatsoever to this software are provided by Motorola Mobility, Inc. hereunder.<br/>
(c) Copyright 2011 Motorola Mobility, Inc.  All Rights Reserved.
</copyright> */

var Montage = require("montage/core/core").Montage;
var Component = require("montage/ui/component").Component;

exports.DocumentEntry = Montage.create(Component, {

    label: {
        value: null,
        serializable: true
    },

    _document: {
        value: null
    },

    document: {
        enumerable: false,
        get: function() {
            return this._document;
        },
        set: function(value) {
            if (this._document === value) {
                return;
            }

            this._document = value;
        }
    },

    _name: {
        value: null
    },

    name: {
        enumerable: false,
        get: function() {
            return this._name;
        },
        set: function(value) {

            if (this._name === value) {
                return;
            }

            this._name = value;
            this.needsDraw = true;
        }
    },

    _saveFlag: {
        value: false
    },

    saveFlag: {
        get: function() {
            return this._saveFlag;
        },
        set: function(value) {
            if(this._saveFlag !== value) {
                this._saveFlag = value;
                this.needsDraw = true;
            }
        }
    },

    draw: {
        enumerable: false,
        value: function() {
            this.label.innerText = this._name ? this._name : "";

            if(this.saveFlag) {
                this.label.classList.add("dirty");
            } else {
                this.label.classList.remove("dirty");
            }
        }
    },

    handleCloseButtonAction: {
        value: function() {
            this.application.ninja.documentController.closeFile(this.document);
        }
    }

});
