+++
pubmed = "28082911"
hero = "cancer_cells.jpg"
weight = 0
date = "2017-01-19T13:14:26-06:00"
title = "Personalized Prediction of Proliferation Rates"
doi = "10.3389/fphys.2016.00644"

+++

Cancer is a complex disease and manifests in many different forms. In fact, when
speaking about cancer we are probably speaking about thousand different diseases
and not one.

The high level of heterogeneity between and across different cancer subtypes
requires large amounts of data to study them. Luckily, we do have large data sets
today. However, the kind of knowledge we can extract from those data sets depends
a lot on where we got the data from. For cancer there are two major classes of
data sources: lab-maintained cell lines and biopsies taken directly from a patient's
tumor. Both can provide distinct information as summarized in the following slide.

![cell lines vs. biopsies](/media/sample_types.png)

As we can see biopsies may provide large amounts of genomic data, but sometimes
lacl some phenotype descriptions which are important, for instance the
proliferation rate that measures how agressive a tumor is in multiplying itself.

In this publication we combined two large cancer data sets, NCI-60 and TCGA.
NCI-60 contains genomic data and proliferation rates for 60 cancer cell lines whereas
TCGA contains genomic data for cancer biopsies for more than 11.000 patients.
By training a a simple model on the NCI-60 data set we predicted proliferation
rates for all of 11.000+ tumor samples in TCGA. We observed that proliferation
rates may vary substantially even within the same cancer subtype.

Proliferation rates are also closely connected to the metabolic capacity of
a tumor. Thus, we also used metabolic modeling integrating the predicted
proliferation rates. This allowed us to predict metabolic alterations that where
specific for a distinct cancer subtype. Many of the alterations identified this
way have been confirmed by previously published works. In particular, we identified
the pentose phosphate pathway, retinol, and branched-chain amino acid metabolism
being the most specific alterations.

Even though this study has many limitations it shows that combining phenotypic and
genomic data sets using Machine Learning techniques may provide another level
of information and allows for patient-specific predicions of the tumor's aggresiveness
and the metabolic alterations that maintain it.
