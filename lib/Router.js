import { Forum, Subject } from 'meteor/genroa:forum';

Router.configure({
	layoutTemplate: 'mainLayout'
});


Router.route('/', {
	name: "",
	onBeforeAction: function(){
			this.redirect("index");
	}
});

Router.route('index/', {
	name: "index",
	template: "index",
	data: function(){
		return {forums: Forum.find( {parentForum: null}, {sort: {lastPost: -1}} ) };
	},
	waitOn: function(){
		return Meteor.subscribe("forum-by-parent-id", null);
	}
});


Router.route("/index/:forum/", {
	name: "forum",
	template: "general_forum",
	data: function(){

		var forum = Forum.findOne({slug: this.params.forum});
		
		var parent = forum && forum.getParentForum();
		var parentSlug = parent && parent.slug;

		return {
				currentForum: forum, 
			    parentForumSlug: parentSlug, 
			    forums: forum && forum.getSubForums(), 
			    subjects: forum && forum.getSubjects()
			   };
	},
	waitOn: function(){
		var forum = Forum.findOne({slug: this.params.forum});

		return Meteor.subscribe("forum-by-parent-slug", this.params.forum) 
		&& Meteor.subscribe("forum-by-slug", this.params.forum)
		&& Meteor.subscribe("forum-by-id", forum && forum.parentForum)
		&& Meteor.subscribe("subjects-by-forum-id", forum && forum._id);
	}
});


Router.route("/index/:forum/:subject/", {
	name: "subject",
	template: "general_forum_subject",
	data: function(){
		var forum = Forum.findOne({slug: this.params.forum});

		var subject = Subject.findOne({slug: this.params.subject});

		return {
			currentForum: forum,
			subject: subject
		};
	},
	waitOn: function(){
		return Meteor.subscribe("forum-by-slug", this.params.forum)
		&& Meteor.subscribe("subject-by-slug", this.params.subject);
	}
});