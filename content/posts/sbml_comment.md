+++
categories = ["science", "comment"]
date = "2015-11-10T08:56:10-06:00"
figshare = ""
github = ""
hero = ""
draft = true
title = "Physiognomy of a Standard"

+++

This is a history about a standard. It will not be objective and it will not be
complete. Let's talk about [SBML](http://sbml.org).

It was 2005, I was just starting to work as a student assistant in a 
Systems Biology lab that had just collaborated on the [MIRIAM](http://www.nature.com/nbt/journal/v23/n12/abs/nbt1156.html) 
standard which defined a minimal set of annotations that should be complied
to annotate biochemical models. Meanwhile, I was fighting my own war with another
standard. I was trying to simulate a model with MesoRD (no link because sourceforge),
which required libSBML to read their own modified SBML version. libSBML had to be
compiled by hand and required very specific versions of the XML libraries so the
entire thing took me to dependency hell. It also required me to write my model 
(not huge but not small either) by hand. After that project was finished I predicted
in my youthful anger that someday there would be a problem with many SBML models
containing errors since the standard was so nontransparent to me. Well I was right
[with this one](http://msb.embopress.org/content/11/10/831). Well, you might think
I will now take SBML apart, but I won't. What we will do is take a look what
happened with SBML in order to get us to that point. And yes, that does mean listing
some weaknesses. If that infuriates you better skip to the end where I promise to
be a good boy again.

# An unexpected format?

The problem was pretty clear. Biochemical models are medium to large structures of
biochemical reactions using substrates (metabolites, compounds, proteins, etc.) together
with annotations of several kinds, such as names, IDs, mathematical formulas, etc.
If we look at how many biochemical models were reported then and are still up to this
day we often find something like this as an Excel file in Supplement:

| reaction     | parameters  | entrez   | Kegg reaction | confidence |
|--------------|-------------|----------|---------------|------------|
| A + B <=> C  | 5, 10       | 123, 345 | R00234        | 2          |
| 2*C -> C     | 1, 2, 3     | 768      | R00897        | 1          |

So, annotated tables of reactions often along with another table doing the same
for the individual substrates. Particularly, the reaction strings in the first
column are highly conserved across publications. So you could think the chosen
standard would be based on tables, right? Nope, it used XML. 

Actually, that is not so surprising looking at the time. SBML was released in 2001,
when XML was all the rage for structured content. The low popularity in those days
is due to the rise of JSON and YAML and and all the modern database formats and
was publicly voiced by Linus Torvalds in 2014 when he declared XML ["crap"](https://en.wikiquote.org/wiki/Linus_Torvalds).
XML is not as bad as it is made today. However, it has particular use case. XML was
motivated by HTML in the philosophy that one should separate content from 
structure/formatting. XML is particularly useful if you flat hierarchies and much 
more actual content than structure. This is why XML is still a prevailing format for
text documents, where you have a lot of content with some occasional structure/styling.
  
The think with highly structured data such as biochemical models is that they become
a bit messy in XML. In the end, you will have much more tags and attributes than
actual content which makes it hard to read by humans (which is what Linus Torvalds
was critizicing). Let's be clear. SBML at no point claims to be a human-readable 
format and actually discourages end-user from reading it directly. However, the programmer
that wants to use it at some point has to validate whether his parser correctly
reads the models and that is where SBML is especially difficult. Implementing a
SBML parser means not only reading the 167 pages of the core specification, but also
remembering this content while programming. So it is easy to write a bad parser.

SBML does realize that problem which is why it provides libSBML which brings us
to our next point.

# The parser we need but do not want

In the beginning of the post I already mentioned my struggles in the past with
libSBML. The funny thing is that the situation did not change that much in last
10 years. Finding a Linux distribution with a working libSBML in their repositories
is not as common as you would think and trying to compile libSBML with a new
GCC (5.2+) will leave you with a non-working libSBML (pointer error). 

The major advantage of document formats such as XML, JSON, YAML or CSV is that
they usually have an efficient parser implementation so that the actual reading 
part is made easy and you only have to worry about validating your standard. This
usually means that your program wraps around the parser implementation and can be
quite succinct. However, libSBML is a beast. Building libSBML together with the
Python bindings can take up to 30 minutes on a single core, often making it the
longest running build task in your project. Since libSBML only provides C(++) 
bindings which are connected to other programming languages via SWIG there is
also no way around that.

Additionally, libSBML is usually
much slower than a naive implementation based on libXML1/2. This would be fine
if using libSBML would result in very little code, however libSBML is extremely 
verbose, meaning that implementing a parser using libSBML results in more or less
the same amount of code as writing one without libSBML (for instance compare
the SBML readers in [cobrapy](https://github.com/opencobra/cobrapy)). 

Documentation is also sparse and mostly limited to some auto-generated Doxygen docs.
The R bindings for instance have now lacked documentation since a few years.

Unfortunately, all those reasons push developers towards their own implementations
in reading and writing SBML. Since it is pretty much unavoidable that some of
those contain errors that helps the availability of faulty models.

# The steps to salvation

Okay, reading all that you might think I will now promote my own table-based format
. Well, it would be awesome for some implementations. For instance, implementing
the [BIGG database](http://bigg.ucsd.edu) is pretty much trivial with a table-based
standard and the standard would be much faster (see Google BigTable or Cassandra
which use tables for Terabytes of data). However, SBML is now the current standard and
the fact that there is any standard is what is important here (relevant [XKCD](https://xkcd.com/927/)). 

I welcome new, subjectively better, standards such as [SBTab](http://sbtab.net) but think
it is more important to repair SBML so it can cover the majority of software first.
SBML has made an exceptional job enforcing its usage (often by negative reinforcement,
but it worked) providing a huge set of software that uses it. However, the majority
of scientists in Systems Biology I have encountered still have no interest to
specifically incorporate SBML in their own new software.
In my opinion, global adaptation of SBML can only be achieved by making it more accessible
to scientists. Scientists are not programmers in the sense that even if they have
the abilities the majority is not paid for writing software. As such programming
is more a necessity and often has to be executed in the fastest way possible. This
creates all the known problems with reproducibility and also with adaptation and
usage of SBML. As such SBML should rather use some paternal liberalism to assure
that its usage discourages errors. My ideas to achieve that would be the following:

1. Provide an accessible and minimal tutorial document (<5 pages) that explains how to write a
valid SBML document.
2. Provide a set of well documented *native* parser implementations for the major programming
languages in Systems Biology (for instance Python, C++, R, Java) with a high level
of abstraction using the native XML libraries.
3. Provide accessible documentation which requires the lowest level of knowledge
possible.
4. Deprecate old SBML versions on Biomodels. 

The easier it is to integrate SBML in your own software, the better. In the end,
you can never force any user to follow your standard. The only thing you can do is
to make it the easiest option. As for competing standards, their value will be judged
by adoption and only the future will show what the prevailing standard in Systems 
Biology will be.
 

