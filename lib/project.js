function Project(project, tags) {
	this.project = project;
	this.tags = tags || [];
	this.children = [];
}

Project.prototype.getName = function() {
	return this.project;
};

Project.prototype.addChild = function(child) {
	this.children.push(child);
};

Project.prototype.addTag = function(tag) {
	this.tags.push(tag);
};

Project.prototype.projectPath = function(path) {
	var returnChild = this.children.filter(function(child) {
		var isProject = child.project !== undefined;
		var nameMatches = child.getName() === path[0];

		return isProject && nameMatches;
	})[0];

	if (returnChild && path.slice(1).length > 0) {
		var nextChild = returnChild.projectPath(path.slice(1));
		if (nextChild) { returnChild = nextChild; }
	}

	return returnChild;
};

Project.prototype.serialize = function() {
	var serialized = this.project + ":";

	if (this.tags) {
		serialized += " ";
		serialized += this.tags.map(function(tag) {
			return tag.serialize();
		}).join(" ");
	}

	if (this.children.length > 0) {
		serialized += "\n";
		serialized += this.children.map(function(child) {
			return child
				.serialize()
				.split("\n")
				.map(function(s) { return "\t" + s; })
				.join("\n");
		}).join("\n");
	}

	return serialized;
};

module.exports = Project;
