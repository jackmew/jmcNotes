Ext.define("jmcNote.model.Note",{
	extend: "Ext.data.Model",
	config: {
		idProperty: 'id',//uniquely identify a note
		fields : 
		[
			{ name: 'id', type: 'int'},
			{ name: 'dateCreated', type: 'date',dateFormat: 'c'},
			{ name: 'title', type: 'string'},
			{ name: 'narrative' , type: 'string'}
		],
		validations: 
		[
			{ type: 'presence', field: 'id' },
			{ type: 'presence', field: 'dateCreated' },
			{ type: 'presence', field: 'title' , message: 'Please enter a title for this note.' }
		]
	}//end config
});