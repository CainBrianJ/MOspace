jQuery(document).ready(function(){

	// nuke all empty paragraphs
	jQuery("p:empty").remove();

	//eliminate ListPlus and ListMinus for the community/collection hierarchy when there is no ul contained in the li.
	//replace them with spacers to make the hierarchy look flush
	//div#aspect_artifactbrowser_CommunityViewer_div_community-view
	//div#aspect_artifactbrowser_CommunityBrowser_div_comunity-browser
	
	// TODO: figure out a way to not do this on the front page

	jQuery("div#aspect_artifactbrowser_CommunityBrowser_div_comunity-browser.ds-static-div li:not(:has(ul))").addClass("indentCommunityList");
	jQuery("div#.spect_artifactbrowser_CommunityViewer_div_community-view.ds-static-div li:not(:has(ul))").addClass("indentCommunityList");
	jQuery("div.ds-static-div li:not(:has(ul))").children("p.ListMinus, p.ListPlus").remove();
	
	//close the community/collection hierarchy by default
	jQuery(document).hideAllCommColl();
	//close to second level the community/collection hierarchy on community view page.
	jQuery(document).hideCommCollInCommViewTo2ndLevel();
	
	//community/collection hierarchy
	//expansion with the plus sign (or horizontal arrow)
	jQuery("p.ListPlus").click(function(){
		jQuery(this).hide();
		jQuery(this).next("p.ListMinus").show();
		if(navigator.userAgent.match("MSIE 6")) //slideDown animation doesn't work in IE6.
		{
		    jQuery(this).parent().find("p.ListPlus").hide();
		    jQuery(this).parent().find("p.ListMinus").show();
		    jQuery(this).parent().find("p.ListMinus + span.bold ~ ul").show();
		}
		else
		{
		    jQuery(this).parent().children("ul").slideDown("fast");
		}
	});				
	//contraction with the minus sign (or vertical arrow)
	jQuery("p.ListMinus").click(function(){
		jQuery(this).hide();
		jQuery(this).prev("p.ListPlus").show();
		jQuery(this).prev("p.ListPlus").css("display", "inline");
		if(navigator.userAgent.match("MSIE 6")) //slideUp animation doesn't work in IE6.
		{
		    jQuery(this).parent().find("p.ListPlus").show();
		    jQuery(this).parent().find("p.ListMinus").hide();
		    jQuery(this).parent().find("p.ListMinus + span.bold ~ ul").hide();
		}
		else
		{
		    jQuery(this).parent().children("ul").slideUp("fast");
		}
	});
});

jQuery.fn.extend({
  slideDownHide: function(speed){
  	return this.animate({height: "hide", top: "0px"}, speed);
  },
  slideUpShow: function(speed,callback){
  	return this.animate({height: "show", top: "-50px"}, speed);
  },
  hideAllCommColl: function(){
  	jQuery("div#aspect_artifactbrowser_CommunityBrowser_div_comunity-browser p.ListPlus").show();
  	jQuery("div#aspect_artifactbrowser_CommunityBrowser_div_comunity-browser p.ListMinus").hide();
  	jQuery("div#aspect_artifactbrowser_CommunityBrowser_div_comunity-browser p.ListMinus + span.bold ~ ul").hide();
  },
  showAllCommColl: function(){
    jQuery("div#aspect_artifactbrowser_CommunityBrowser_div_comunity-browser p.ListMinus").show();
  	jQuery("div#aspect_artifactbrowser_CommunityBrowser_div_comunity-browser p.ListPlus").hide();
  	jQuery("div#aspect_artifactbrowser_CommunityBrowser_div_comunity-browser p.ListMinus + span.bold ~ ul").show();
  },
  hideSomeCommColl: function(){
    jQuery("div#aspect_artifactbrowser_CommunityViewer_div_community-view p.ListPlus").show();
  	jQuery("div#aspect_artifactbrowser_CommunityViewer_div_community-view p.ListMinus").hide();
  	jQuery("div#aspect_artifactbrowser_CommunityViewer_div_community-view p.ListMinus + span.bold ~ ul").hide();
  },
  showSomeCommColl: function(){
    jQuery("div#aspect_artifactbrowser_CommunityViewer_div_community-view p.ListMinus").show();
  	jQuery("div#aspect_artifactbrowser_CommunityViewer_div_community-view p.ListPlus").hide();
  	jQuery("div#aspect_artifactbrowser_CommunityViewer_div_community-view p.ListMinus + span.bold ~ ul").show();
  },
  hideCommCollInCommViewTo2ndLevel: function(){
    jQuery("div#aspect_artifactbrowser_CommunityViewer_div_community-view > ul.ds-artifact-list > li > ul.ds-artifact-list p.ListPlus").show();
    jQuery("div#aspect_artifactbrowser_CommunityViewer_div_community-view > ul.ds-artifact-list > li > ul.ds-artifact-list p.ListMinus").hide();
    jQuery("div#aspect_artifactbrowser_CommunityViewer_div_community-view > ul.ds-artifact-list > li > ul.ds-artifact-list p.ListMinus + span.bold ~ ul").hide();
  }

});

