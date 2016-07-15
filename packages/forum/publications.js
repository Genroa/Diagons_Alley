


/*
Permissions must be done in theses functions
*/
Meteor.publish(null, function(){
	return Meteor.users.find({_id: this.userId}, {fields: {currentForumAccount: 1}});
});

Meteor.publish("forumAccount", function(){
	var user = Meteor.users.findOne({_id: this.userId});
	var accountId = user && user.currentForumAccount;
	console.log("ACCOUNT: "+JSON.stringify(user)+" ACCOUNT ID: "+accountId+", "+ForumAccount.find({_id: accountId}).count());
	return ForumAccount.find({_id: accountId});
});

Meteor.publish("forums", function(){
	return Forum.find({}); 
});

Meteor.publish("forum-by-name", function(name){
	return Forum.find({forumName: name});
});

Meteor.publish("forum-by-id", function(id){
	return Forum.find({_id: id});
});

Meteor.publish("forum-by-slug", function(slug){
	return Forum.find({slug: slug});
});

Meteor.publish("forum-by-parent-id", function(parentId){
	return Forum.find({parentForum: parentId});
});

Meteor.publish("forum-by-parent-slug", function(slug){
	var forum = Forum.findOne({slug: slug});
	return forum && Forum.find({parentForum: forum._id});
});



Meteor.publish("subjects", function(){
	return Subject.find({});
});

Meteor.publish("subject-by-slug", function(slug){
	return Subject.find({slug: slug});
});

Meteor.publish("subjects-by-forum-id", function(forumId){
	return Subject.find({forumId: forumId});
});

Meteor.publish("subjects-by-forum-slug", function(slug){
	var forum = Forum.find({slug: slug});
	return Subject.find({forumId: forum._id});
});



Meteor.publish("forum-accounts", function(){
	return ForumAccount.find({});
})

