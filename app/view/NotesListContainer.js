Ext.define("jmcNote.view.NotesListContainer",{
	extend: "Ext.Container",
	alias: "widget.noteslistcontainer", //set alias to use xtype to specify this widget
	initialize: function (){
		this.callParent(arguments);
		console.log("NotesListContainer initialize");
		//encapsulation
		//define newButton
		var newButton = {
			xtype: "button",
			text: "New",
			ui: "action",
			handler: this.onNewButtonTap,//button self hang on handler
			scope: this
		};
		//define topToolbar
		var topToolbar = {
			xtype: "toolbar",
			title: "JMC Notes",
			docked: "top",
			items: [
				{ xtype: 'spacer'},
				newButton
			]
		};
		//define notesList
		var notesList = {
			xtype: "noteslist",
			store: Ext.getStore("Notes"),
			listeners: {
				disclose: { 
					fn: this.onNotesListDisclose,
					scope: this
				}//end disclose
			}//end listeners

		};
		//add them
		this.add([topToolbar,notesList]);

	},//end initialize
	onNewButtonTap: function (){
		console.log("newButtonCommand tap");
		//to controller:Notes.js
		this.fireEvent("newNoteCommand",this);
	},
	onNotesListDisclose: function (list,record,target,index,evt,options){
		console.log("editNoteCommand tap");
		this.fireEvent('editNoteCommand',this,record);
	},
	config: {
		layout: {
			type: 'fit'
		}
	}//end config
});