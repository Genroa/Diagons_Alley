import './collections.js';

/*
Here are the methods only accessible server side
*/
Forum.extend({
	methods: {
		createSubForum: function(name){
			return Forums.createForum(name, this);
		},

		createSubject: function(title, creator){
			/*
			Creates a new subject
			*/
			if(!creator){
				throw new Meteor.Error("subject-creator-undefined", "You must define the creator of this subject");
			}

			var subject = new Subject({forumId: this._id, title: title, creatorId: creator._id});
			subject.save();

			return subject;
		},

		delete: function(){
			this.getSubjects().forEach(function(subject){
				subject.delete();
			});
		},

		moveSubjectsToForum: function(newForum){
			this.getSubjects().forEach(function(subject){
				subject.moveToForum(newForum);
			});
		}
	}
})
