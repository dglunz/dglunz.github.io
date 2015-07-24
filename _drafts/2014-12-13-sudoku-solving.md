---
layout:     post
title:      Solving Sudoku
date:       2014-12-13 15:16:17
summary:    Genetic algorithms to compensate for my lack of sudoku skills
categories: ai
---
Recently I've been reading [*An Introduction to Genetic
Algorithms*](http://www.amazon.com/Introduction-Genetic-Algorithms-Complex-Adaptive/dp/02626318570)
which describes numerous adaptive algorithms and computational models of natural
evolutionary systems. The breadth of application and potential use is
astonishing. Naturally, I decided to apply these concepts to the most trivial
problem possible.

###Why?

I thought I was good at sudoku, I really did. Then I made the mistake of
watching my girlfriend play a round. Everything I thought I once knew was
shattered in that instance. In my debilitated state, 
I was tempted to dedicate every remaining hour of my
life to becoming the best sudoku player. But that
sounded like tedious, repetitive work. So instead, I
opted to train a computer to do it for me.

##Overview

I used Ai4r's genetic algorithm (used to solve the Traveling Salesman) as a
model. Genetic Algorithms share a set of common traits and processes but differ
in implementation according to the problem at hand. 

1. Choose initial population
  2. Evaluate the fitness of each individual in the population
  3. Select best-ranking individuals to reproduce
  4. Breed new generation through crossover and mutation (genetic operations)
  and give birth to offspring
  5. Evaluate the individual fitness of each offspring
  6. Replace the worst ranked part of population with offspring
  7. Repeat 2-6 until limit or goal is reached
8. Return the best chromosome

This simplified list leaves out a few crucial details to the process. The most
important of which is the concept of mutation. 

###Stochastically Searching

 * Randomly place numbers on the grid
 * Calculate the number of incorrect placements
 * Shuffle and repeat

###Genetic Algorithm

###Conclusion
Keep in mind that this gif is only showing a single member of the population of
each generation. So for every change you see, there are another n-1 (in this
case 999) breeding and being evaluated in the background.  

![sudoku-example](https://s3-us-west-2.amazonaws.com/dglunz/sudsy.gif)

After extensively tweaking this algorithm, I started searching for other genetic
algorithms attacking the same problem. A good deal of scholarly articles from
various universities started popping up, all including a similar conclusion:
"[GAs prove remarkably ineffective in solving
Sudoku](http://micsymposium.org/mics_2009_proceedings/mics2009_submission_66.pdf)"
 
I'm chalking this one up as a win with an asterisk.

