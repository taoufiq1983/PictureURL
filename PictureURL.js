define( ["qlik", "jquery", "text!./style.css"], function ( qlik, $, cssContent ) {
	'use strict';
	var Paint = true;
	$( "<style>" ).html( cssContent ).appendTo( "head" );
	return {
		initialProperties: {
			qListObjectDef: {
				qShowAlternatives: true,
				qFrequencyMode: "V",
				qInitialDataFetch: [{
					qWidth: 2,
					qHeight: 50
				}]
			}
		},
		definition: {
			type: "items",
			component: "accordion",
			items: {
				dimension: {
					type: "items",
					label: "Dimensions",
					ref: "qListObjectDef",
					min: 1,
					max: 1,
					items: {
						
						field: {
							type: "string",
							expression: "always",
							expressionType: "dimension",
							ref: "qListObjectDef.qDef.qFieldDefs.0",
							label: "Field",
							show: function ( data ) {
								return data.qListObjectDef && !data.qListObjectDef.qLibraryId;
							}
						}
						
					}

				},
				settings: {
					uses: "settings"
				}
			}
		},
		support : {
			snapshot: true,
			export: true,
			exportData : false
		},
		paint: function ( $element,layout ) {
			var self = this, html = "<ul>";
			layout.qListObject.qDataPages[0].qMatrix.forEach( function ( row ) {
				var with1=$element.width()-15
				var height1=$element.height()-15
				html += '<img src="' + row[0].qText+'" width="'+ with1+'"  height="'+height1+'" >';
				html += '</li>';
			} );
			html += "</ul>";
			$element.html( html );
			Paint = false;
			return qlik.Promise.resolve();
		}
	};
} );
