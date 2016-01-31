Ext.define("jmcNote.store.Notes",{
	extend: "Ext.data.Store",
	requires: "Ext.data.proxy.LocalStorage",
	config: {
		model: "jmcNote.model.Note",
		// data: 
		// [
		// 	{title: "Note 1", narrative: "narrative 1" },
		// 	{title: "Note 2", narrative: "narrative 2" },
		// 	{title: "Note 3", narrative: "narrative 3" },
		// 	{title: "Note 4", narrative: "narrative 4" },
		// 	{title: "Note 5", narrative: "narrative 5" },
		// 	{title: "Note 6", narrative: "narrative 6" }
		// ],
		//use the HTML5 localstorage API
		proxy: {
			type: 'localstorage',
			id: 'notes-app-store'
		},
		sorters: 
		[
		 	{property: 'dateCreated', direction: 'DESC'}
		],
		grouper: {
			sortProperty: "dateCreated",
			direction: "DESC",
			/* The groupFn config is the function used to generate the label for the group*/
			groupFn: function (record){
				if(record && record.data.dateCreated){
					return record.data.dateCreated.toDateString();
				}else{
					return '';
				}
			}//end groupFn
		}//end grouper
	}//end config
})