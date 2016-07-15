Template.registerHelper("getForumUsername", function(){
	if(Meteor.user()){
		var forumAccount = Forums.getCurrentForumAccountForUser(Meteor.user());
		return forumAccount && forumAccount.username;
	}
});

Template.registerHelper("getForumpostedMessagesNumber", function(){
	if(Meteor.user()){
		var forumAccount = Forums.getCurrentForumAccountForUser(Meteor.user());
		return forumAccount && forumAccount.postedMessagesNumber;
	}
});