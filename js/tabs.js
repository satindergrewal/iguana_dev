var tabsManagement={};

/*{
	"panel" : {
		"panelHeading": "Tab heading generated from template",
		"panelBody": {
			"tablist": [
				{ 
					"label" : "Peer list",
					"active": true,
					"content" : {
						"table" : {
							"id": "",
							"headers": ["IP address", "Coin Type", "Height", "Rank", "Actions"]
						}
					}
				},
				{
					"label" : "Favorite peers",
					"content" : {
						"table" : {
							"id": "",
							"headers": ["Peer name", "IP address", "Coin Type", "Height", "Rank", "Actions"]
						}
					}
				}
			]
		}
	}
}*/

//Classes

tabsManagement.Tab = function(_tabData) {
	this.TabData;
};

//Initialization

tabsManagement.loggingEnabled = true;
tabsManagement.tabData = "{}";
tabsManagement.templates = {
	panel : "<div class='panel panel-default'>{{panelHeading}}{{panelBody}}</div>",
	panelHeading : "<div class='panel-heading'><h3>{{panelHeading}}</h3></div>",
	panelBody : "<div class='panel-body'>{{panelBody}}</div>",
	tablist : "<ul class='nav nav-pills' role='tablist'>{{list.tab.label}}</ul><div class='tab-content'>{{list.tab.content}}</div>",
	tab : { 
		label : "<li role='presentation' class='active'><a href='#{{processedLabel}}' aria-controls='home' role='tab' data-toggle='tab'>{{label}}</a></li>",
		content : "<div role='tabpanel' class='tab-pane active' id='{{processedLabel}}'>{{content}}</div>"
	}
};




tabsManagement.createTab = function(htmlresponse, parsedTabData) {
	
	for(var innerElement in parsedTabData) {
		innHtmlresponse = tabsManagement.templates[innerElement];
		if(typeof innerElement !== "string") {
			htmlresponse = this.createTab(innHtmlresponse, innerElement);
		} else {
			htmlresponse = innHtmlresponse.replace("{{"+innerElement+"}}", innerElement);
		}
	}


	/*if(parsedTabData.panelHeading !== null || parsedTabData.panelHeading !== undefined) { 
		htmlresponse = tabsManagement.templates.panelHeading.replace("{{panelHeading}}", parsedTabData.panelHeading);
	}*/

	return htmlresponse;
}

tabsManagement.createTabs = function() {
	console.log("Generating TestCreateTab tab from tab data json");
	//tabsManagement.createTab("TestCreateTab_tab", {panelHeading: "Test Tab Heading"});

	var commonTabs = document.getElementsByClassName("common-tab");
	for(var i=0; i < commonTabs.length; i++) {
		var commonTab = commonTabs[i];
		var tabData = commonTab.getElementsByTagName("pre")[0].innerHTML;

		if(tabData === null || tabData === undefined || tabData === "" || tabData === "{}") {
			console.log("Tab Data json can not have values - null, undefined, empty string or empty json");
			return false;
		}

		var parsedTabData = JSON.parse(tabData);

		htmlresponse = tabsManagement.createTab(commonTab, parsedTabData);

		commonTab.innerHTML = htmlresponse;
	}
}

// Event Handlers

window.addEventListener('load', tabsManagement.createTabs);

