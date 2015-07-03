var file = require('file.js');
var gui = require('nw.gui');
var menu = new gui.Menu({ type: 'menubar' });
// Loads App AutoUpdater

var autoupdater = require('auto-updater.js')({
				pathToJson: '',
        async: false,
        silent: false,
        autoupdate: true,
        check_git: true
    });

    // State the events
    // autoupdater.on('git-clone',function(){
    //   console.log("You have a clone of the repository. Use 'git pull' to be up-to-date");
    // });
    autoupdater.on('check-up-to-date',function(v){
      console.log("You have the latest version: " + v);
    });
    autoupdater.on('check-out-dated',function(v_old , v){
      console.log("Your version is outdated. "+v_old+ " of "+v);
      autoupdater.forceDownloadUpdate(); // If autoupdate: false, you'll have to do this manually.
      // Maybe ask if the'd like to download the update.
    });
    autoupdater.on('update-downloaded',function(){
      console.log("Update downloaded and ready for install");
      autoupdater.forceExtract(); // If autoupdate: false, you'll have to do this manually.
    });
    autoupdater.on('update-not-installed',function(){
      console.log("The Update was already in your folder! It's read for install");
      autoupdater.forceExtract(); // If autoupdate: false, you'll have to do this manually.
    });
    autoupdater.on('extracted',function(){
      console.log("Update extracted successfully!");
      console.log("RESTART THE APP!");
    });
    autoupdater.on('download-start',function(name){
      console.log("Starting downloading: " + name);
    });
    autoupdater.on('download-update',function(name,perc){
      process.stdout.write("Downloading " + perc + "% \033[0G");
    });
    autoupdater.on('download-end',function(name){
      console.log("Downloaded " + name);
    });
    autoupdater.on('download-error',function(err){
      console.log("Error when downloading: " + err);
    });
    autoupdater.on('end',function(){
      console.log("The app is ready to function");
    });

    // Start checking
    autoupdater.forceCheck();


// End AutoUpdater
function clickInput(id) {
	var event = document.createEvent('MouseEvents');
	event.initMouseEvent('click');
	document.getElementById(id).dispatchEvent(event);
}

document.addEventListener('keyup', function (e) {
	if (e.keyCode == 'O'.charCodeAt(0) && e.ctrlKey) {
		clickInput('open');
	} else if (e.keyCode == 'S'.charCodeAt(0) && e.ctrlKey) {
		clickInput('save');
	} else if (e.keyCode == 'N'.charCodeAt(0) && e.ctrlKey) {
		gui.Window.open('index.html');
	}
});

document.getElementById('open').addEventListener('change', function (e) {
	file.open(this.value, document);
});

document.getElementById('save').addEventListener('change', function (e) {
	file.save(this.value, document);
});

menu.append(new gui.MenuItem({
	label: 'File',
	submenu: new gui.Menu()
}));
menu.items[0].submenu.append(new gui.MenuItem({
	label: 'New',
	click: function () {
		gui.Window.open('index.html');
	}
}));
menu.items[0].submenu.append(new gui.MenuItem({
	type: 'separator'
}));
menu.items[0].submenu.append(new gui.MenuItem({
	label: 'Close',
	click: function () {
		gui.Window.get().close();
	}
}));
gui.Window.get().menu = menu;
