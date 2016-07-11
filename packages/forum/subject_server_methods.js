import './collections.js';

/*
Here are the methods only accessible server side
*/
Subject.extend({
	methods: {

		addNewPost: function(content, creator){
			/*
			Adds new post to the subject
			*/
			if(!creator){
				throw new Meteor.Error("subject-creator-undefined", "You must define the creator of this subject");
			}

			var post = new Post({content: content, subjectId: this._id, creatorId: creator._id});
			post.save();

			this.postCount = this.postCount+1.
			this.save();
			
			return post;
		},
		
		moveToForum: function(forum){
			this.forumId = forum._id;
			this.save();
		},

		delete: function(){
			Post.remove({subjectId: this._id});
			Subject.remove({_id: this._id});
		}
	}
})
