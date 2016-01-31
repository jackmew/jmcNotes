/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".

    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/

Ext.application({
    name: 'jmcNote',

    models: ["Note"],
    stores: ["Notes"],
    controllers: ["Notes"],
    views: ["NotesList","NotesListContainer","NoteEditor"],

    requires: ["Ext.Toolbar"],

    launch: function(){
        console.log("jmcNote App app.js launch");
        
        var notesListContainer = {
            xtype: "noteslistcontainer"
        };
        var noteEditor = {
            xtype: "noteeditor"
        };
        Ext.Viewport.add([notesListContainer,noteEditor]);
    }

});
