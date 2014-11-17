---
layout:     post
title:      Surviving the Titanic
date:       2014-11-11 11:11:11
summary:    Machine learning to avoid iceberg induced death
categories: machine-learning
---
An [eccentric billionaire recently decided it
would be a brilliant idea](http://www.nydailynews.com/news/world/titanic-ii-recreate-early-20th-century-immigrant-experience-article-1.1578845)
to recreate the least successful cruise liner to ever
exist. I disagree, but let's continue.

So you're thinking about taking the inaugural journey on the [Titanic
II]
but deathly afraid of icebergs? If the Titanic Jr lives up to its [authentic
claims](http://www.dailymail.co.uk/news/article-2287163/Titanic-II-We-knew-rebuilt-amazing-new-designs-really-WILL-1912-again.html),
lack of lifeboats and all, we can create some models to predict
survivability.

With the power of data, let's discover how to survive the Titanic so you can continue on making terrible
life decisions.

##Titanic Manifest
2200 passengers: 1700 of which died and, for you math majors, 500 survived.

Each passenger has an age, gender, socio-economic class, ticket price, location
boarded, number of siblings, number of parents, and a name (but that's
a worthless variable).

##Predicting Survival
How do we go about creating prediction models? We'll start off 'manually'
analyzing the data to determine survival probabilities. Afterwards, we'll try our luck
with some machine learning algorithms.

In order to test model accuracy, we'll split the manifest in half. Half will
be used for training our model and the other will be used to test the accuracy
of the predictions.

When I say 'manually' analyze data, of course, I mean with code. Specifically we'll be
using Python. Nerdier types might be questioning why I'm not using a language
made for data analysis like R. My answer is simply: numpy pandas.

![red pandas are better than
rose](https://s3-us-west-2.amazonaws.com/dglunz/titanic_enhanced.jpg)

[NumPy](http://www.numpy.org/) is the fundamental
[sciencing](www.youtube.com/watch?v=5jSXNrg0jY8) package.
[Pandas](http://pandas.pydata.org/) is a library to make data more enjoyable
with Python (as enjoyable as whitespace dependant languages can be, at least).

Within code snippets, I'll refer to pandas as `pd` and numpy as `np`.

##Basic Intuition
Okay, we've got our tools, but where do we start? Let's explore our basic
intuition: ['women and children
first'](http://en.wikipedia.org/wiki/Women_and_children_first). All we need to do is take the number of
women on-board and divide it by the number of women who survived.

{% highlight python %}
# select only females
women_only_stats = data[0::,4] == "female"

# select survived column for each
women_onboard = data[women_only_stats,1].astype(np.float)

# then find percentage of survivors
proportion_women_survived = \
    np.sum(women_onboard) / np.size(women_onboard)

# display the results
print 'Proportion of women who survived: %s' % proportion_women_survived

{% endhighlight %}

`Proportion of women who survived: 0.74203821` which translates to
74% for us humans.

###Sex Model
Okay, 74% survival rate among women seems like a promising premise to build off.
Lets create a crude model that says something along the lines of `if 'male' then
'dead'`. Here's the idea in python:

{% highlight python %}

# if female then 1 (alive), else then 0 (dead)
prediction_file_object.writerow(["PassengerId", "Survived"])
for row in test_file_object:
  if row[3] == 'female':
    prediction_file_object.writerow([row[0], '1'])
  else:
    prediction_file_object.writerow([row[0], '0'])

{% endhighlight %}

The results of this simple model are surprisingly sound. Applied to the test
data, we get back an accuracy result of about `77%`. Not bad for basic
intuition.

###Sorry Kids
So we've seen that being a woman is advantageous, but does age matter?

{% highlight python %}
# here we'll start using pandas to account for missing data
data = pd.read_csv('train.csv', header=0)

# select women over the age of 18 with pandaish syntax
adult_women = (data['Age'] > 18) & (data['Sex'] == "female")

# divide the survivors by the total
adult_women_survived = \
  sum(adult_women) / len(adult_women)

# print that shit
print 'Proportion of adult women who survived: %s' % adult_women_surved

{% endhighlight %}

`Proportion of adult women who survived: 0.771029`.

Sorry kids. Despite what your parents say, you're just not important enough to
be considered a predictive variable.
This is probably a result of gaps in the data, which we'll discuss later on. For
now we'll just leave the children behind in our model.

###Make Way For The Rich
Let's try out our second intuition: 'women and rich people first'. At this point
the [code](https://github.com/dglunz/titanic) is getting quite lengthy so I'll
just cover the results.

{% highlight python %}

Female 1st class: 0.9680851
Female 2nd class: 0.9210526
Female 3rd class: 0.5

Male 1st class: 0.3688525
Male 2nd class: 0.1574074
Male 3rd class: 0.1354467

{% endhighlight %}

Grouping people by their wealth seems to be a clear indicator of survival. Let's
adjust the model to say anyone with over a 50% probability can live. Now it
looks something like `if 'male' and 'poor' then 'double dead'`.

The result of taking out 3rd class females results in our test data being about
2% more accurate. We can live (so long as you're a rich female) with 79% but
let's see if we can improve our accuracy.

###Letting Men Live
Up until now our model hasn't left any room in the lifeboats for men, but surely
a few survived.

![yes rose](https://s3-us-west-2.amazonaws.com/dglunz/yes_rose.gif)

Let's try and make some room with machine learning algorithms.

##Machine Learning
Finally! Let's learn some machines.

Half the <strike>mind-numbing frustration</strike> fun of machine learning is [cleaning up the
data](http://en.wikipedia.org/wiki/Data_wrangling). Computers have a hard time inherently understanding strings, so we have to
convert everything to an integer. For instance:

{% highlight python %}

# female = 0, Male = 1
train_df['Gender'] = train_df['Sex'].map( {'female': 0, 'male': 1} ).astype(int)

{% endhighlight %}

The
[SciKit](http://scikit-learn.org/dev/modules/generated/sklearn.ensemble.RandomForestClassifier.html)
package for python has a random forest classifier that does most of the heavy
lifting for us. I'll try to break down the concept so we can get an idea of
what's going on under the hood.

###Decision Trees
A decision tree is a flowchart-esque way of illustrating an algorithm. If you
don't know what flowcharts or algorithms are you can think of it as a map of
possible decisions and their resulting outcomes.
Going back to the first model we created, part of the decision tree looked like this:

![dead men decision
tree](https://s3-us-west-2.amazonaws.com/dglunz/decision-tree.jpg)

Now that we have the computer's help, we can get more detailed with our
probabilities. Subsequently this means letting men live every once in a while. Here's an example of a
small subsection (it gets real complex, real quick) of the new decision
tree:

![slightly less dead
men](https://s3-us-west-2.amazonaws.com/dglunz/decision-tree-more.jpg)

###Random Forests™
In the beginning we were analyzing all of the training data in order to
create our prediction models. Our first iterations used all of the sample passengers
(rows) and a couple variables (columns) at a time.

This machine learning technique approaches the problem a bit differently.
Instead of analyzing all of the data to create the model, it only takes a random
chunk of it. It applies the method of
[bagging](http://en.wikipedia.org/wiki/Bootstrap_aggregating) to create a model
using a random set of passengers (rows) and all of the given variables
(columns).

Random Forests takes bagging a step further by randomly selecting both the
samples and variables to create each tree. This method is repeated x number of times
(x being the number of trees in your forest). The mode of the forest (average of
all the trees) is the model used for prediction.

Here's an overarching snippet of code to conceptualize the process:

{% highlight python %}

# Create the random forest object, n_estimators being the number
# of trees in your forest
forest = RandomForestClassifier(n_estimators = 100)

# Fit the training data to the "Survived" column, creating the
# decision trees that make up the forest
forest = forest.fit(train_data[0::,1::],train_data[0::,0])

# Now take each of those decision trees and pass the test_data
# through the average of the forest
output = forest.predict(test_data)

{% endhighlight %}

Just to be sure we're all on the same page: the idea of this particular
algorithm is to create a bunch of slightly varying decision
trees by selecting a random subset of both the samples and variables. The final
model is created from the average of the entire forest. Simple, right?

If you're into this, definitely read [Leo Breiman's original
paper](http://scholar.google.com/citations?view_op=view_citation&hl=en&user=mXSv_1UAAAAJ&citation_for_view=mXSv_1UAAAAJ:d1gkVwhDpl0C).

###Results Against the Machine
After fighting your way through all this technical jargon, the results are
certainly anticlimactic. A meager boost of 1-2% is all we get.

##Conclusion
So what does this all mean?

 * Small data sets are shit for machine learning.

 * Simple can be powerful.

 * **If you want to survive the Titanic, don't be poor or a man.**

However, if you fall into either of those two categories, your best chance of survival is
asking that paramour of yours to quit crying and [make some room on the
driftwood](http://www.smithsonianmag.com/smart-news/its-definitive-rose-and-jack-could-both-have-survived-in-titanic-66108527/).

##DIY
Checkout [Kaggle](http://www.kaggle.com) for data science competitions and
structured tutorials similar to this. You can also check [my
codes](https://github.com/dglunz/titanic) for more
context.


