


Meteor.methods({
	createForum: function(name, parentForum){
		if(!Forums.canCreateForum(Meteor.user().currentForumAccount))
			throw new Meteor.Error("forum-permission-error", "You don't have the permission to create a new forum");

		console.log("Permission granted for user "+Meteor.userId());
		Forums.createForum(name, parentForum, Meteor.user().currentForumAccount);
	}
});