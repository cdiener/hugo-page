+++
categories = ["science", "technology", "docker"]
date = "2015-11-27T10:46:38-06:00"
figshare = ""
github = "docker_mini_training"
hero = "docker.jpg"
title = "A tiny Docker training"

+++

I recently prepared a small Docker training for our research group in order to
highlight our new [CobraPy](https://github.com/opencobra/cobrapy) Docker
container.

I think that Docker is a pretty great technology for Computational and
Systems Biology. Most researchers in those areas do a lot of programming, but are
actually neither trained nor paid for the software development. Due to this,
scientists normally do not suffer from the NIH syndrome (not related to the funding
agency, [see here](https://en.wikipedia.org/wiki/Not_invented_here)), but rather
combine a lot of different programs and programming languages into a single
pipeline to achieve their goals. In general, I am not a huge fan of that, because
this work flow is inherently difficult to maintain (should I write a post about
that?). However, reality is that scientific software is a lot of pipelines and Docker
is a nice tool to ensure reproducibility. Basically, it makes it easy to deploy
an isolated environment containing your entire pipeline with the required software
in the required versions.

In my opinion, all projects that are not a single language package (not Python/R
packages for instance) should be bundled into a Docker container upon publication to
give the community a way to get your pipeline with a single command and reproduce
your work. Additionally, Dockers [automated builds](https://docs.docker.com/docker-hub/builds/)
can help you greatly to maintain your pipeline and easily test new software versions.  

So if that spiked some interest you can use the Github link on the bottom of the
page to get to my Docker Mini Training which will show you how to wreck
a Debian system and how to deploy your very own Darth Vader Cow app.
