// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by forum.js.
import { name as packageName } from "meteor/genroa:forum";

// Write your tests here!
// Here is an example.
Tinytest.add('forum - example', function (test) {
  test.equal(packageName, "forum");
});
