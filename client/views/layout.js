Template.mainLayout.events({
	"click [name=logout]": function(e){
		e.preventDefault();
		Meteor.logout();
		Router.go('/');
	}
});