
Package.describe({
  name: 'genroa:forum',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: 'Simple forum management for Meteor apps.',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});




Package.onUse(function(api) {
	api.versionsFrom('1.3.4.1');
	api.use('ecmascript');
	api.use('mongo');
	api.use('jagi:astronomy');
	api.use('jagi:astronomy-timestamp-behavior');
	api.use('jagi:astronomy-slug-behavior');
	api.use('accounts-base');
	api.use('blaze-html-templates');
	api.use('tracker');
	api.mainModule('forum.js');

	api.add_files("collections.js");
	api.add_files("publications.js", 'server');
	api.add_files("package_methods.js", 'server');
	api.add_files("template_helpers.js", 'client');
	api.add_files("forum_account_subscription.js", "client");

	api.export('ForumAccounts', 'server');
	api.export('ForumAccount');

	api.export('Post');
	api.export('PostsCollection');

	api.export('Subject');
	api.export('SubjectsCollection');
	api.add_files("subject_server_methods.js", 'server');

	api.export('Forums', 'server');
	api.export('Forum');
	api.export('ForumsCollection');
	api.add_files("forum_server_methods.js", 'server');

});





Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('genroa:forum');
  api.mainModule('forum-tests.js');
});
