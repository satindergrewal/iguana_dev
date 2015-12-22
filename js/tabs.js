var tabsManagement={};

//Classes

tabsManagement.Tab = function(_tabData) {
	this.TabData;
};

//Initialization

tabsManagement.loggingEnabled = true;
tabsManagement.tabData = "{}";
tabsManagement.templates = {
	panelHeading : "<div class='panel-heading'><h3>{{panelHeading}}</h3></div>",

};

tabsManagement.createTab = function(element, tabData) {
	if(tabData === null || tabData === undefined || tabData === "" || tabData === "{}") {
		console.log("Tab Data json can not have values - null, undefined, empty string and empty json");
		return false;
	}

	var parsedTabData = JSON.parse(tabData);
	var htmlresponse = "";

	console.log("Parsed JSON Data:" + parsedTabData);

	if(parsedTabData.panelHeading !== null || parsedTabData.panelHeading !== undefined) { 
		htmlresponse = tabsManagement.templates.panelHeading.replace("{{panelHeading}}", parsedTabData.panelHeading);
	}

	element.innerHTML = htmlresponse;

}

tabsManagement.createTabs = function() {
	console.log("Generating TestCreateTab tab from tab data json");
	//tabsManagement.createTab("TestCreateTab_tab", {panelHeading: "Test Tab Heading"});

	var commonTabs = document.getElementsByClassName("common-tab");
	for(var i=0; i < commonTabs.length; i++) {
		var commonTab = commonTabs[i];
		tabsManagement.createTab(commonTab, commonTab.getElementsByTagName("pre")[0].innerHTML);
	}
}

// Event Handlers

window.addEventListener('load', tabsManagement.createTabs);

