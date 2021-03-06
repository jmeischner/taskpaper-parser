var TaskPaperParser = require("../lib/parser");

var Root = TaskPaperParser.Root;
var Project = TaskPaperParser.Project;
var Task = TaskPaperParser.Task;
var Tag = TaskPaperParser.Tag;
var Comment = TaskPaperParser.Comment;

// root holds everything in the file
var root = new Root();

// create some projects
var projectMain = new Project("main thing to do");
var projectSub = new Project("other things");

// create some tasks
var task1 = new Task("task 1");
var task2 = new Task("task 2");

// and a tag
var important = new Tag("priority", 1);

// add tag to task
task1.addTag(important);

// add tag to project
projectMain.addTag(important);

// comment on one of the task
var commentFor2 = new Comment("don't forget this!");

// add comment to task
task2.addChild(commentFor2);

// add tasks to projects;
projectMain.addChild(task1);
projectSub.addChild(task2);

// add projectSub as suproject of projectMain
projectMain.addChild(projectSub);

// add everything to root
root.addChild(projectMain);

// how will this look like a taskpaper file?
console.log(root.serialize());
