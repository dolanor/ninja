/* <copyright>
This file contains proprietary software owned by Motorola Mobility, Inc.<br/>
No rights, expressed or implied, whatsoever to this software are provided by Motorola Mobility, Inc. hereunder.<br/>
(c) Copyright 2011 Motorola Mobility, Inc.  All Rights Reserved.
</copyright> */
///////////////////////////////////////////////////////////////////////
// MaterialsLibrary module  -- Contains an array of GLMaterials.
///////////////////////////////////////////////////////////////////////
var Montage = require("montage/core/core").Montage,
    Component = require("montage/ui/component").Component,
    AppModel = require("js/models/app-model").AppModel;

var MaterialParser = require("js/lib/rdge/materials/material-parser").MaterialParser;
var FlatMaterial = require("js/lib/rdge/materials/flat-material").FlatMaterial;
var LinearGradientMaterial = require("js/lib/rdge/materials/linear-gradient-material").LinearGradientMaterial;
var RadialGradientMaterial = require("js/lib/rdge/materials/radial-gradient-material").RadialGradientMaterial;
var BumpMetalMaterial = require("js/lib/rdge/materials/bump-metal-material").BumpMetalMaterial;
var UberMaterial = require("js/lib/rdge/materials/uber-material").UberMaterial;
var RadialBlurMaterial = require("js/lib/rdge/materials/radial-blur-material").RadialBlurMaterial;
var RaidersMaterial = require("js/lib/rdge/materials/radial-blur-material").RaidersMaterial;
var PlasmaMaterial = require("js/lib/rdge/materials/plasma-material").PlasmaMaterial;
var PulseMaterial = require("js/lib/rdge/materials/pulse-material").PulseMaterial;
var TunnelMaterial = require("js/lib/rdge/materials/tunnel-material").TunnelMaterial;
var ReliefTunnelMaterial = require("js/lib/rdge/materials/relief-tunnel-material").ReliefTunnelMaterial;
var FlagMaterial = require("js/lib/rdge/materials/flag-material").FlagMaterial;
var SquareTunnelMaterial = require("js/lib/rdge/materials/square-tunnel-material").SquareTunnelMaterial;
var FlyMaterial = require("js/lib/rdge/materials/fly-material").FlyMaterial;
var WaterMaterial = require("js/lib/rdge/materials/water-material").WaterMaterial;
var ParisMaterial = require("js/lib/rdge/materials/water-material").ParisMaterial;
var ZInvertMaterial = require("js/lib/rdge/materials/z-invert-material").ZInvertMaterial;
var DeformMaterial = require("js/lib/rdge/materials/deform-material").DeformMaterial;
var StarMaterial = require("js/lib/rdge/materials/star-material").StarMaterial;
var TwistMaterial = require("js/lib/rdge/materials/twist-material").TwistMaterial;
var JuliaMaterial = require("js/lib/rdge/materials/julia-material").JuliaMaterial;
var KeleidoscopeMaterial = require("js/lib/rdge/materials/keleidoscope-material").KeleidoscopeMaterial;
var MandelMaterial = require("js/lib/rdge/materials/mandel-material").MandelMaterial;


exports.MaterialsModel = Montage.create(Component, {

    hasTemplate: {
        value: false
    },

    deserializedFromTemplate: {
        value: function() {
            // Load all the materials
            this.addMaterial(new FlatMaterial());
            this.addMaterial(new LinearGradientMaterial());
            this.addMaterial(new RadialGradientMaterial());
            this.addMaterial(new BumpMetalMaterial());
            this.addMaterial(new UberMaterial());
            this.addMaterial(new RadialBlurMaterial());
            this.addMaterial(new RaidersMaterial());
            this.addMaterial(new PlasmaMaterial());
            this.addMaterial(new PulseMaterial());
            this.addMaterial(new TunnelMaterial());
            this.addMaterial(new ReliefTunnelMaterial());
            this.addMaterial(new FlagMaterial());
            this.addMaterial(new SquareTunnelMaterial());
            this.addMaterial(new FlyMaterial());
            this.addMaterial(new WaterMaterial());
            this.addMaterial(new ParisMaterial());
            this.addMaterial(new ZInvertMaterial());
            this.addMaterial(new DeformMaterial());
            this.addMaterial(new StarMaterial());
            this.addMaterial(new TwistMaterial());
            this.addMaterial(new JuliaMaterial());
            this.addMaterial(new KeleidoscopeMaterial());
            this.addMaterial(new MandelMaterial());
        }
    },

    _materials : {
        value: AppModel.materials
    },

    materials : {
        get: function() {
            return this._materials;
        }
    },
    
    addMaterial: {
        value: function (material) {
            this._materials.push(material);
        }
    },

    addMaterialAt: {
        value: function (material, index) {
            this._materials.splice(index, 0, material);
        }
    },

    removeMaterialAt: {
        value: function (index) {
            return this._materials.splice(index, 1);
        }
    },

    removeMaterial: {
        value: function (materialName) {
            var index = this.getIndexOfMaterial(materialName);
            if(index !== -1) {
                return this.removeMaterialAt(index);
            }
        }
    },

    getMaterialAt: {
        value: function (index) {
            return this._materials[index];
        }
    },

    getMaterial: {
        value: function (materialName) {
            var index = this.getIndexOfMaterial(materialName);
            if(index !== -1) {
                return this._materials[index].dup();
            }
        }
    },
	
	getMaterialByShader: 
	{
		value: function( shaderName )
		{
			var index = this.getIndexOfMaterialByShader( shaderName );
			if (index >= 0)
				return this._materials[index].dup();
		}
	},		

    getIndexOfMaterialByShader: {
        value: function (shaderName) {
            var len = this._materials.length;
            for(var i=0; i<len; i++) {
                var material = this._materials[i];
                if(material.getShaderName() === shaderName) {
                    return i;
                }
            }

            return -1;
        }
    },

    getIndexOfMaterial: {
        value: function (materialName) {
            var len = this._materials.length;
            for(var i=0; i<len; i++) {
                var material = this._materials[i];
                if(material.getName() === materialName) {
                    return i;
                }
            }

            return -1;
        }
    },

	clearAllMaterials: {
		value: function() {
			this._materials = [];
		}
	},

    exportFlatMaterial: {
        value: function() {
            return new FlatMaterial();
        }
    },

	getDefaultMaterialName: {
		value: function() {
			return "FlatMaterial";
		}
	},

	exportMaterials: {
		value: function()
        {
            var matArray = [];
			var nMats = this._materials.length;
			for (var i=0;  i<nMats;  i++) {
				var material = this._materials[i];
				var matObj = material.exportJSON();
                matArray.push( matObj );
			}

	        var jObj = 
	        {
                'materialLibrary':  1.0,
                'materials':        matArray
            };

            // prepend an identifiable string to aid parsing when the 
            // material model is loaded.
            var jStr = "materialLibrary;" + JSON.stringify( jObj );

			return jStr;
		}
	},

	importMaterials: {
		value: function( jObj )
        {
            // make sure we have some materials to import before doing anything
            var matArray = jObj.materials;
            if (!matArray)  return;
			
			// we replace allmaterials, so remove anything
			// that is currently there.
			this.clearAllMaterials();

			var nMats = matArray.length;
            for (var i=0;  i<nMats;  i++)
            {
              var mat = null;
              var jMatObj = matArray[i];
                var type = jMatObj.material;
                switch (type)
                {
					case "flat":				mat = new FlatMaterial();				break;
					case "linearGradient":		mat = new LinearGradientMaterial();		break;
					case "radialGradient":		mat = new RadialGradientMaterial();		break;
					case "bumpMetal":			mat = new BumpMetalMaterial();			break;
					case "uber":				mat = new UberMaterial();				break;

					case "taper":				mat = new TaperMaterial();				break;
					case "twistVert":			mat = new TwistVertMaterial();			break;
					case "radialBlur":			mat = new RadialBlurMaterial();			break;
					case "plasma":				mat = new PlasmaMaterial();				break;
					case "pulse":				mat = new PulseMaterial();				break;
					case "tunnel":				mat = new TunnelMaterial();				break;
					case "reliefTunnel":		mat = new ReliefTunnelMaterial();		break;
					case "squareTunnel":		mat = new SquareTunnelMaterial();		break;
					case "flag":		        mat = new FlagMaterial();		        break;
					case "fly":					mat = new FlyMaterial();				break;
					case "water":				mat = new WaterMaterial();				break;
					case "paris":				mat = new ParisMaterial();				break;
					case "zinvert":				mat = new ZInvertMaterial();			break;
					case "deform":				mat = new DeformMaterial();				break;
					case "star":				mat = new StarMaterial();				break;
					case "twist":				mat = new TwistMaterial();				break;
					case "julia":				mat = new JuliaMaterial();				break;
					case "keleidoscope":		mat = new KeleidoscopeMaterial();		break;
					case "mandel":				mat = new MandelMaterial();				break;


					default:
						throw new Error( "Unrecognized material type: " + type );
						break;
				}

				if (mat) {
					importStr = mat.importJSON( jMatObj );
					this.addMaterial( mat );
				}
			}

			return;
		}
	}

});


