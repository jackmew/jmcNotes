Ext.define("jmcNote.view.NoteEditor",{
	extend: "Ext.form.Panel",
	requires: 
		[
			"Ext.form.FieldSet",
			"Ext.field.Text",
			"Ext.field.TextArea"
		],
	alias: "widget.noteeditor",
	config:{
		scrollable: 'vertical'
		//stops the form form cropped when its height is larger than the 
		//screen height of the device
	},
	initialize: function (){
		this.callParent(arguments);
		/***********************set topToolbar**************************/
		var backButton = {
			xtype: "button",
			ui: "back",
			text: "Home",
			handler: this.onBackButtonTap,
			scope: this
		};

		var saveButton = {
			xtype: "button",
			ui: "action",
			text: "Save",
			handler: this.onSaveButtonTap,
			scope: this
		};

		var topToolbar = {
			xtype: "toolbar",
			docked: "top",
			title: "Edit Note",
			items: 
			[
 				backButton,
 				{ xtype: "spacer"},
 				saveButton
			]	
		};
		/*******************End set topToolbar**************************/
		/***********************set bottomToolbar**************************/
		var deleteButton = {
			xtype: "button",
			iconCls: "trash",
			iconMask: true,
			handler: this.onDeleteButtonTap,
			scope: this
		};

		var bottomToolbar = {
			xtype: "toolbar",
			docked: "bottom",
			items: [deleteButton]
		};	
		/********************End set bottomToolbar**************************/
		var noteTitleEditor = {
			xtype: 'textfield',
			name: 'title',
			label: 'Title',
			required: true
		};

		var noteNarrativeEditor = {
			xtype: 'textareafield',
			name: 'narrative',
			label: 'Narrative',
			required: true
		};

		this.add([
			topToolbar,
			{ xtype: "fieldset", 
					items: 
					[
						noteTitleEditor,noteNarrativeEditor
					],		
			},
			bottomToolbar
		]);
	},//end initialize
	onSaveButtonTap: function (){
		console.log("onSaveButtonTap tap");
		this.fireEvent("saveNoteCommand",this);
	},
	onDeleteButtonTap: function (){
		console.log("onDeleteButtonTap Tap");
		this.fireEvent("deleteNoteCommand",this);
	},
	onBackButtonTap: function (){
		console.log("onBackButtonTap");
		this.fireEvent("backToHomeCommand",this);
	}
});