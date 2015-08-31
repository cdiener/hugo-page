/*
 * tree.js
 * 
 * Copyright 2015 Christian Diener <ch.diener[a]gmail.com>
 * 
 * MIT license. See LICENSE for more information.
 */

var width = 500,
    height = 400;

var color = d3.scale.category20();

var force = d3.layout.force()
    .charge(-400)
    .linkDistance(50)
    .size([width, height]);

var svg = d3.select("#vis").append("svg")
	.attr({
        "width": "100%",
        "height": "100%"
     })
    .attr("viewBox", "0 0 " + width + " " + height )
    .attr("preserveAspectRatio", "xMidYMid meet");


// Returns a list of all nodes under the root.
function flatten(root) {
	var nodes = [], i = 0;

	function recurse(node, depth) {
		if (node.children) node.children.forEach(function(n) {recurse(n,depth+1)} );  
		if (!node.id) node.id = ++i;
		if (!node.depth) node.depth = depth;
		if (!node.x) node.x = node.id*30;
		if (!node.y) node.y = node.depth*30;
		nodes.push(node);
	}

	recurse(root, 0);
	return nodes;
}

  
function dblclick(d) {
	d3.select(this).classed("fixed", d.fixed = false);
}

function dragstart(d) {
	d3.select(this).classed("fixed", d.fixed = true);
}

d3.json("/js/skills.json", function(error, json) {
	if (error) throw error;
  
	var nodes = flatten(json),
		links = d3.layout.tree().links(nodes);

	force.nodes(nodes)
		.links(links)
		.start();
	  
	var drag = force.drag()
		.on("dragstart", dragstart);

	var link = svg.selectAll(".link")
		.data(links)
		.enter().append("line")
		.attr("class", "link");

	var node = svg.selectAll(".node")
		.data(nodes)
		.enter().append("g")
		.attr("class", "node")
		.on("dblclick", dblclick)
		.call(drag);

	node.append("circle")
		.attr("class", "node")
		.attr("r", 8)
		.style("fill", function(d) { return color(d.group); })
		.on("dblclick", dblclick)
		.call(drag);

	node.append("text")
		.attr("dx", 10)
		.attr("dy", "0.3em")
		.text(function(d) { return d.name });

	force.on("tick", function() {	  
		link.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

		node.attr("transform", function(d) { 
			return "translate(" + d.x + "," + d.y + ")"; });
	});
});
