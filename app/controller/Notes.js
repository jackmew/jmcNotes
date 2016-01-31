Ext.define("jmcNote.controller.Notes",{
	extend: "Ext.app.Controller",
	requires: ["Ext.MessageBox"],
	
	config:{
		refs: {
			//for this.fireEvent("newNoteCommand",this);
			notesListContainer: "noteslistcontainer",
			//automatically creates a getNoteEditor()
			noteEditor: "noteeditor"
		},//end refs
		control: {
			//從某view發出的fireEvent()		
			notesListContainer: {
				newNoteCommand: "onNewNoteCommand",
				editNoteCommand: "onEditNoteCommand"
			},
			noteEditor: {
				saveNoteCommand: "onSaveNoteCommand",
				deleteNoteCommand: "onDeleteNoteCommand",
				backToHomeCommand: "onBackToHomeCommand"
			}
		}//end control
	},//end config
	/***************************new button tap******************************************/
	onNewNoteCommand: function (list){
		//console.log(list);
		console.log("onNewNoteCommand");
		var now = new Date();
		var noteId = (now.getTime()).toString() + (this.getRandomInt(0,100)).toString();
		var newNote = Ext.create("jmcNote.model.Note",{
			id: noteId,
			dateCreated: now,
			title: "",
			narrative: ""
		});
		this.activateNoteEditor(newNote);
	},
	getRandomInt: function (min,max){
		console.log("getRandomInt");
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
	activateNoteEditor: function (record) {
		console.log("activateNoteEditor");
		var slideLeftTransition = { type: 'slide', direction: 'left' };
		var noteEditor = this.getNoteEditor();//refs
		//console.log(noteEditor);
		noteEditor.setRecord(record); //load() is deprecated.
		//Ext.Viewport.animateActiveItem(noteEditor,{type:'slide'});
		Ext.Viewport.animateActiveItem(noteEditor,slideLeftTransition);
		//slideLeftTransition: { type: 'slide', direction: 'left' };
	},
	/*************************End new button tap******************************************/
	/**************************disclosure tap*********************************************/
	onEditNoteCommand: function (list,record){
		//console.log(record);
		console.log("onEditNoteCommand");
		//disclose event supplies the selected Note model instance to the handler through the record argument.
		this.activateNoteEditor(record);
	},
	/********************** end disclosure tap*********************************************/
	/****************************save button tap***********************************************/
	onSaveNoteCommand: function (){
		console.log("onSaveNoteCommand");

		var noteEditor = this.getNoteEditor();

		var currentNote = noteEditor.getRecord();
		var newValues = noteEditor.getValues();

		//update the current note's fields with form values

		currentNote.set("title",newValues.title);
		currentNote.set("narrative",newValues.narrative);

		var errors = currentNote.validate();
		//Ext.data.Model’s validate() function iterates over the validations defined for the model,
		//and return Ext.data.Error 
		console.log(errors);

		if(!errors.isValid()) {
			Ext.Msg.alert('Wait!',errors.getByField("title")[0].getMessage(),Ext.emptyFn);
			
			currentNote.reject();
			//reverts the modified fields back to their original values
			return;
		}
		//save data using localStorageProxy
		var notesStore = Ext.getStore("Notes");
		//if true means this note is new
		if(null == notesStore.findRecord('id',currentNote.data.id)){
			console.log("It is new note");
			notesStore.add(currentNote);
		}
		notesStore.sync();
		//end save

		//After the store’s records have been updated, we sort them by date
		notesStore.sort([{
			property: 'dateCreated',
			direction: 'DESC'
		}]);
		this.activateNotesList();
	},
	/*************************end save button tap***********************************************/
	/****************************delete button tap***********************************************/
	onDeleteNoteCommand: function (){
		console.log("onDeleteNoteCommand");
		var noteEditor = this.getNoteEditor();
		var currentNote = noteEditor.getRecord();
		var notesStore = Ext.getStore("Notes");
		//remove the current note from the store
		notesStore.remove(currentNote);
		//make the changes permanent
		notesStore.sync();
		//activate the Notes List Container View
		this.activateNotesList();
	},
	/****************************end delete button tap***********************************************/
	/****************************back button tap***********************************************/
	onBackToHomeCommand: function (){
		console.log("onBackToHomeCommand");
		
		this.activateNotesList();
	},
	/****************************end back button tap***********************************************/
	launch: function(){
		this.callParent(arguments);
		//Ext.getStore('Notes').load();
		console.log("note controller launch");
	},
	init: function(){
		this.callParent(arguments);
		console.log("note controller init");
	},
	activateNotesList: function (){
		console.log("activeNotesList");
		var slideRightTransition = { type: 'slide', direction: 'right' };
		Ext.Viewport.animateActiveItem(this.getNotesListContainer(),slideRightTransition);
	}
});