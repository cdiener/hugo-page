+++
weight = 0
hero = "tech1.jpg"
pubmed = "31964767"
doi = "10.1128/mSystems.00606-19"
date = 2020-01-21T15:09:39-07:00
title = "MICOM: metagenome-scale modeling to infer metabolic interactions in the microbiota"
keywords = ["prior work"]
+++

Compositional changes in the gut microbiota have been associated with a variety of
medical conditions such as obesity, Crohn’s disease, and diabetes. However, connecting
microbial community composition to ecosystem function remains a challenge. Here, we
introduce MICOM, a customizable metabolic model of the human gut microbiome. By using a
heuristic optimization approach based on L2 regularization, we were able to obtain a
unique set of realistic growth rates that corresponded well with observed replication
rates.

We integrated adjustable dietary and taxon abundance constraints to generate
personalized metabolic models for individual metagenomic samples. We applied MICOM to a
balanced cohort of metagenomes from 186 people, including a metabolically healthy
population and individuals with type 1 and type 2 diabetes. Model results showed that
individual bacterial genera maintained conserved niche structures across humans, while
the community-level production of short-chain fatty acids (SCFAs) was heterogeneous and
highly individual specific.

Model output revealed complex cross-feeding interactions
that would be difficult to measure in vivo. Metabolic interaction networks differed
somewhat consistently between healthy and diabetic subjects. In particular, MICOM
predicted reduced butyrate and propionate production in a diabetic cohort, with
restoration of SCFA production profiles found in healthy subjects following metformin
treatment. Overall, we found that changes in diet or taxon abundances have highly
personalized effects. We believe MICOM can serve as a useful tool for generating
mechanistic hypotheses for how diet and microbiome composition influence community
function. All methods are implemented in an open-source Python package, which is
available at https://github.com/micom-dev/micom.

**IMPORTANCE:** The bacterial communities that live within the human gut have been linked
to health and disease. However, we are still just beginning to understand how those
bacteria interact and what potential interventions to our gut microbiome can make us
healthier. Here, we present a mathematical modeling framework (named MICOM) that can
recapitulate the growth rates of diverse bacterial species in the gut and can simulate
metabolic interactions within microbial communities. We show that MICOM can unravel the
ecological rules that shape the microbial landscape in our gut and that a given dietary
or probiotic intervention can have widely different effects in different people.

