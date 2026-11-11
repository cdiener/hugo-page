/*
 * tree.js
 *
 * Copyright 2015 Christian Diener <ch.diener[a]gmail.com>
 *
 * MIT license. See LICENSE for more information.
 */

(function() {
  var width = 800,
      height = 600,
      nextId = 0,
      root,
      color = d3.scale.category20().domain(d3.range(19));

  var svg = d3.select("#vis").append("svg")
      .attr("viewBox", "0 0 " + width + " " + height)
      .attr("role", "group")
      .attr("aria-label", "Interactive skills graph");

  var linksLayer = svg.append("g"),
      nodesLayer = svg.append("g"),
      force = d3.layout.force()
        .size([width, height])
        .linkDistance(function(d) { return d.source === root ? 175 : 115; })
        .linkStrength(0.7)
        .charge(-1000)
        .gravity(0.09)
        .friction(0.8)
        .on("tick", tick),
      link,
      node;

  d3.json("/js/skills.json", function(error, json) {
    if (error || !json || !json[0]) {
      console.error("Could not load the skills graph", error);
      svg.remove();
      d3.select("#vis").append("p").attr("role", "alert")
        .text("The skills graph could not be loaded.");
      return;
    }

    root = json[0];
    root.x = root.px = width / 2;
    root.y = root.py = height / 2;
    root.fixed = true;
    root.children.forEach(collapse);
    update();
  });

  function collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }

  function nodeRadius(d) {
    return d === root ? 13 : 10;
  }

  function labelOffset(d) {
    return nodeRadius(d) + 10;
  }

  function update() {
    var nodes = [],
        links = [];

    function visit(d, parent) {
      if (!d.id) d.id = ++nextId;
      nodes.push(d);
      if (parent) {
        links.push({source: parent, target: d});
        if (typeof d.x !== "number") {
          var angle = (d.id * 2.4) % (2 * Math.PI);
          d.x = d.px = parent.x + 30 * Math.cos(angle);
          d.y = d.py = parent.y + 30 * Math.sin(angle);
        }
      }
      if (d.children) d.children.forEach(function(child) { visit(child, d); });
    }
    visit(root);

    link = linksLayer.selectAll("line.link")
      .data(links, function(d) { return d.target.id; });
    link.exit().remove();
    link.enter().append("line").attr("class", "link");

    node = nodesLayer.selectAll("g.node")
      .data(nodes, function(d) { return d.id; });
    node.exit().remove();
    var entered = node.enter().append("g")
      .attr("class", "node")
      .on("click", toggle)
      .on("keydown", function(d) {
        if (d3.event.key === "Enter" || d3.event.key === " ") {
          toggle(d);
          d3.event.preventDefault();
        }
      })
      .call(force.drag);

    entered.append("circle")
      .attr("r", nodeRadius)
      .style("fill", function(d) { return color(d.group); });
    entered.append("text")
      .attr("x", labelOffset)
      .attr("dy", ".35em")
      .text(function(d) { return d.name; })
      .each(function(d) { d.labelWidth = this.getComputedTextLength(); });

    node.classed("expandable", function(d) { return !!(d.children || d._children); })
      .attr("role", function(d) { return d.children || d._children ? "button" : null; })
      .attr("tabindex", function(d) { return d.children || d._children ? 0 : null; })
      .attr("aria-expanded", function(d) {
        return d.children || d._children ? String(!!d.children) : null;
      })
      .attr("aria-label", function(d) {
        return d.children || d._children ? d.name : null;
      });

    force.nodes(nodes).links(links).start();
  }

  function tick() {
    var nodes = force.nodes();

    function constrain(d) {
      d.x = Math.max(15, Math.min(width - d.labelWidth - labelOffset(d) - 5, d.x));
      d.y = Math.max(20, Math.min(height - 20, d.y));
    }

    nodes.forEach(constrain);
    for (var pass = 0; pass < 3; pass++) {
      nodes.forEach(function(a, i) {
        nodes.slice(i + 1).forEach(function(b) {
          var overlapX = Math.min(a.x + a.labelWidth + labelOffset(a) + 5, b.x + b.labelWidth + labelOffset(b) + 5) -
            Math.max(a.x - nodeRadius(a) - 2, b.x - nodeRadius(b) - 2);
          var overlapY = 34 - Math.abs(a.y - b.y);
          if (overlapX > 0 && overlapY > 0) {
            var direction = a.y === b.y ? (a.id < b.id ? -1 : 1) : (a.y < b.y ? -1 : 1);
            var distance = overlapY / (a === root || b === root ? 1 : 2);
            if (a !== root) a.y += direction * distance;
            if (b !== root) b.y -= direction * distance;
            constrain(a);
            constrain(b);
          }
        });
      });
    }

    node.attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")";
    });
    link.attr("x1", function(d) { return d.source.x; })
      .attr("y1", function(d) { return d.source.y; })
      .attr("x2", function(d) { return d.target.x; })
      .attr("y2", function(d) { return d.target.y; });
  }

  function toggle(d) {
    if (d3.event.defaultPrevented) return;
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else if (d._children) {
      d.children = d._children;
      d._children = null;
    } else {
      return;
    }
    update();
  }
})();
