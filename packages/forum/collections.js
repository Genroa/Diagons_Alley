import { Class, Behavior } from 'meteor/jagi:astronomy';
import { Accounts } from 'meteor/accounts-base';
import { Tracker } from 'meteor/tracker';
import { Mongo } from 'meteor/mongo';


ForumAccount = Class.create({
	name: 'ForumAccount',

	collection: new Mongo.Collection("ForumAccounts"),

	fields:{
		postedMessagesNumber:{
			type: Number,
			default: 0
		},
		
		username:{
			type: String
		},

		profile:{
			type: Object,
			default: function(){
				return {};
			}
		}
	}
});



ForumAccounts = {
	onForumAccountCreationHook: [],
	onForumAccountCreation: function(func){
		onForumAccountCreationHook.push(func);
	},

	createForumAccount: function(username){
		
	}
}


PostsCollection = new Mongo.Collection("Posts");
Post = Class.create({
	name: 'Post',

	collection: PostsCollection,
	
	fields: {
		content: String,
		subjectId: {
			type: String,
			optional: true
		},
		creatorId: {
			type: String,
			optional: true
		}
	},

	behaviors: ['timestamp']
});


SubjectsCollection = new Mongo.Collection("Subjects");
Subject = Class.create({
	name: 'Subject',

	collection: SubjectsCollection,

	fields: {
		forumId: {
			type: String,
			optional: true
		},
		creatorId: {
			type: String,
			optional: true
		},
		title: String,
		tags: {
			type: [String],
			default: function(){
				return [];
			}
		},
		lastPostDate:{
			type: Date,
			default: function(){
				return new Date();
			}
		},
		postCount: {
			type: Number,
			default: 0
		}
	},

	methods: {
		getPosts: function(){
			return Post.find({subjectId: this._id}, {sort: {createdAt: 1}});
		}
	},

	behaviors: {
		slug: {
			fieldName: 'title',
			unique: true
		}
	}
});


ForumsCollection = new Mongo.Collection("Forums");
Forum = Class.create({
	name: 'Forum',

	collection: ForumsCollection,

	fields: {
		forumName: String,
		parentForum: {
			type: String,
			optional: true
		},
		lastPost:{
			type: Object,
			default: function(){
				return {};
			}
		}
	},

	methods: {
		/*Place here public methods for both client and server*/
		getSubjects: function(){
			/*
			Returns the list of subjects of this forums
			*/
			return Subject.find({forumId: this._id}, {sort: {lastPostDate: -1}});
		},

		getSubForums: function(){
			/*
			Returns the list of subforums
			*/
			return Forum.find({parentForum: this._id}, {sort: {lastPost: -1}});
		},

		getParentForum: function(){
			return Forum.findOne({_id: this.parentForum});
		}
	},

	behaviors: {
		slug: {
			fieldName: 'forumName',
			unique: true
		}
	},
});



Forums = {

	createForum: function(name, parentForum = null){
		/*
		DESCRIPTION
		Creates a new forum with the given name and optional parentForum
		
		PARAMETERS
		name: name of the forum
		parentForum (optional): Mon.ObjectID of the parent forum
		*/

		var parent = null;
		if(parentForum){
			parent = parentForum._id
		}


		var forum = new Forum({forumName: name, parentForum: parent});
		forum.save();

		return forum;
	},

	getCurrentForumAccountForUser: function(user){
		return ForumAccount.findOne({_id: user.currentForumAccount});
	}
}

