import { ForumAccount, Forums, SubjectsCollection } from 'meteor/genroa:forum';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Accounts.onCreateUser(function(options, user) {
	
	var forumAccount = new ForumAccount({});
	forumAccount.profile.village = "Aucun village";
	forumAccount.profile.health = 100;
	forumAccount.profile.experience = 0;
	forumAccount.profile.mana = 100;
	forumAccount.save();

	user.currentForumAccount = forumAccount._id;
	user.authorizedForumAccounts = [forumAccount._id];
	
	// We still want the default hook's 'profile' behavior.
	if (options.profile)
	{
		user.profile = options.profile;
	}

	/*
	Meteor.setTimeout(function() {
      Accounts.sendVerificationEmail(user._id);
    }, 2 * 1000);
	*/
	return user;
});



Meteor.startup(function(){
	if(Meteor.isServer){
		require('../server/account_creation.js');

		Forum.remove({});
		Subject.remove({});
		Post.remove({});
		Meteor.users.remove({});

		Accounts.createUser({username: "genroa", password: "test"});
		var userAccount = Forums.getCurrentForumAccountForUser(Meteor.users.findOne());

		var forum = Forums.createForum("Forum de test");
		var subforum = forum.createSubForum("Sous-forum");

		var subject = forum.createSubject("Premier sujet", userAccount);

		subject.addNewPost("Ceci est le premier post du sujet \""+subject.title+"\"", userAccount);
		subject.addNewPost("Ceci est le second post, du même sujet.", userAccount);

		forum.createSubject("Premier sujet2", userAccount);
		forum.createSubject("Premier sujet3", userAccount);
		forum.createSubject("Premier sujet4", userAccount);
		forum.createSubject("Premier sujet5", userAccount);
		forum.createSubject("Premier sujet6", userAccount);
		forum.createSubject("Premier sujet7", userAccount);
	}

	if(Meteor.isClient){
		Meteor.loginWithPassword("genroa", "test", function(err){
			if(err){
				console.log(err);
			}

			console.log("Logged in");
		});

		Meteor.subscribe('forums');
	}
});