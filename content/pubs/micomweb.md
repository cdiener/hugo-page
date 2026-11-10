+++
weight = 0
hero = "tech1.jpg"
pubmed = "41328016"
doi = "10.1080/19490976.2025.2587968"
date = 2025-12-02T16:00:00-07:00
title = "MICOMWeb: a website for microbial community metabolic modeling of the human gut"
keywords = ["resource"]
+++

MICOMWeb is a user-friendly website for modeling microbial community metabolism in the human gut. This website tackles three constraints when generating in silico metagenome-scale metabolic models: i) the prior Python user knowledge for metabolic modeling using flux balance analysis with the MICOM Python package, ii) predefined and user-defined diets to generate ad hoc metabolic models, and iii) the high-throughput computational infrastructure required to obtain the simulated growth and metabolic exchange fluxes, using real abundance from metagenomic shotgun or 16S amplicon sequencing; we present MICOMWeb's features to easily run in silico experiments as a functional hypothesis generator for experimental validation on three previously published databases.

MICOMWeb has a constant run-time independent of the number of samples provided and database complexity. In practical terms, this behavior is upper-bounded by the sample with the greatest microbiota diversity, i.e., the sample with the largest metabolic reconstruction model size. The evidence suggests that the bigger the database, the better the MICOMWeb performs compared to MICOM in terms of consumed RAM (from 3.52 up to 7.13 folds) and total execution time (from 10.87 up to 205.05 folds).