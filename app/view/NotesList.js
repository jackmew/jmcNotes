Ext.define("jmcNote.view.NotesList",{
	extend: "Ext.dataview.List",
	alias: "widget.noteslist",
	config: {
		loadingText: "Loading Notes...",
		emptyText: '</pre><div class="notes-list-empty-text">No notes found.</div><pre>',
		onItemDisclosure: true, //enable list to tap
		grouped: true,//set grouper
		itemTpl: '<pre><div class="list-item-title">{title}</div><div class="list-item-narrative">{narrative}</div></pre>'

	}
})