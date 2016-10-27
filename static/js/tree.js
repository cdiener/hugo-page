/*
 * tree.js
 *
 * Copyright 2015 Christian Diener <ch.diener[a]gmail.com>
 *
 * MIT license. See LICENSE for more information.
 */

var color = d3.scale.category20(),
    df = 140;
    tf = 15;
color.domain(d3.range(19));

var margin = {top: 10, right: 20, bottom: 30, left: 15},
	width = 400 - margin.right - margin.left,
	height = 300 - margin.top - margin.bottom;

var i = 0,
	duration = 600,
	root;

var tree = d3.layout.tree()
	.size([height, width]);

var diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("#vis").append("svg")
        .attr({
        "width": "100%",
        "height": "100%"
     })
    .attr("viewBox", "0 0 " + (width + margin.right + margin.left) + " " + (height + margin.top + margin.bottom))
    .attr("preserveAspectRatio", "xMidYMid meet")
    .append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.select(self.frameElement).style("height", "400px");

d3.json("/js/skills.json", function(error, json) {
    root = json[0];
    root.x0 = height / 2;
    root.y0 = 0;

    root.children.forEach(collapse);

    update(root);
    });

function collapse(d) {
    if (d.children) {
        d._children = d.children;
        d._children.forEach(collapse);
        d.children = null;
    }
}

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
	  links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * df - (d.depth > 1 ? df/3 : 0); });

  // Update the nodes…
  var node = svg.selectAll("g.node")
	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
	  .attr("class", "node")
	  .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
	  .on("click", click);

  nodeEnter.append("circle")
	  .attr("r", 1e-6)
      .style("stroke", function(d) { return d._children ? d3.rgb(color(d.group)).darker(1) : "#fff"; })
	  .style("fill", function(d) { return color(d.group); });

  nodeEnter.append("text")
	  .attr("x", function(d) { return d.children || d._children ? -tf : tf; })
	  .attr("dy", ".35em")
	  .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
	  .text(function(d) { return d.name; })
	  .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
	  .attr("r", 10)
      .style("stroke", function(d) { return d._children ? d3.rgb(color(d.group)).darker(1) : "#fff"; })
	  .style("fill", function(d) { return color(d.group); });

  nodeUpdate.select("text")
	  .style("fill-opacity", 1);

  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
	  .remove();

  nodeExit.select("circle")
	  .attr("r", 1e-6);

  nodeExit.select("text")
	  .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
	  .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
	  .attr("class", "link")
	  .attr("d", function(d) {
		var o = {x: source.x0, y: source.y0};
		return diagonal({source: o, target: o});
	  });

  // Transition links to their new position.
  link.transition()
	  .duration(duration)
	  .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
	  .duration(duration)
	  .attr("d", function(d) {
		var o = {x: source.x, y: source.y};
		return diagonal({source: o, target: o});
	  })
	  .remove();

  // Stash the old positions for transition.
  nodes.forEach(function(d) {
    d.x0 = d.x;
	d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  if (d.children) {
	d._children = d.children;
	d.children = null;
  } else {
	d.children = d._children;
	d._children = null;
  }
  update(d);
}
