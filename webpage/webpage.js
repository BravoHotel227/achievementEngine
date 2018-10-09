const electron = require('electron');                       // require all the models needed and assigning them variables 
const remote = require('electron').remote;

  document.getElementById("min-btn").addEventListener("click", function (e) {   // function to minimize the window
    const window = remote.getCurrentWindow();
    window.minimize(); 
  });
  document.getElementById("close-btn").addEventListener("click", function (e) {   // function to close the window
    const window = remote.getCurrentWindow();
    window.close();
    }); 
    document.getElementById("max-btn").addEventListener("click", function (e) {     // function to maximize the window
        const window = remote.getCurrentWindow();
        if (!window.isMaximized()) {
          window.maximize();
        } else {
           window.unmaximize();
        }	 
      });