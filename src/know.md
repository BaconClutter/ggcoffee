---
title: KNOW GOOD COFFEE
layout: "base.liquid"
logoImage: /img/know-logo.svg
stripImage: /img/know-header_icons.svg
---
<div id="knowHero" class="hero-section">
    <div class="width-limit">
        <img src="/img/knowHero.svg" />
        <div class="hero-text">
            <h1>
            Knowin' ain't half the battle...
            </h1>
            <p>
            Maybe it's a third, or something close to that. Point is, flex your head and get that good stuff wherever you go. Impress your family and friends at home with mad skills. Be smart, don't drink bad coffee.
            </p>
        </div>
    </div>
</div>
<section id="knowSection" class="standard-section">
    <div id="knowIntro">
        <div class="make-text-left-two-thirds">
            <h2>What is "good" coffee?</h2>
            <p>
            Good is obviously subjective, and if you thoroughly enjoy some Folgers or Kcups with cream and sugar, that’s great! But if you’re curious and open to some change, coffee can be so much more. Wondering what all the fuss is with this third wave thing? Maybe a bit confused or put off by some of the overly complex and pretentious reddit threads or barista videos out there? Well, me too. It’s not that complicated. Good coffee can be sweet, and floral and delicious all by itself, no sugar or milk needed, you just need to know where to look and what to do with it.
            </p>
            <p>
            If you walk into a coffee shop, do you see things like <a href="#SingleoriginID">single origin</a>, <a href="#MicrolotID">micro lot</a>, small farm, <a href="#ProducerID">producer</a>, etc.? Does the menu mention <a href="#OriginID">origin</a>, <a href="#VarietyVarietalID">varietal</a>, <a href="#ProcessID">process</a>, elevation or tasting notes? Do they display the bags from the roaster they use for sale? Do the bags mention any of these things? These are all some key things that will keep you from accidentally having a sad time at a new coffee shop (been there). If they don’t care enough about their beans to display where they came from, who roasted them, or any details beyond light, or dark roast, they probably don’t care enough to serve quality cups in general. They are probably more of a milk and sugar assembly line business model *cough*starbucks*cough*. Again, if that’s what you’re craving, go for it. There’s no shame in needing that sweet treat (I like whipped cream too). That’s just not what “good” coffee is and not what I’m talking about here. So, check out the glossary below to de-mystify some of these key terms.
            </p>
        </div>
        <div class="make-image-right-third">
            <figure class="quote">
            <blockquote>
            If they don’t care enough about their beans to display where they came from, who roasted them, or any details beyond light, or dark roast, they probably don’t care enough to serve quality cups in general
            </blockquote>
            <figcaption>
                &mdash; Me (John), <cite>This website</cite>  
            </figcaption>
            </figure>
        </div>
    </div>
</section>
<section id="glossarySection" class="standard-section">
    <div id="Glossary">
        <div class="make-text-left-two-thirds">
            <h2>Glossary</h2>
            {% assign sortedglossary = glossaryentries | sort: "term" %}
            {%- for glossaryentry in sortedglossary -%}
                {% assign glossaryID = glossaryentry.term | replace : " ", "" | replace : "/", "" %}
                <div id="{{glossaryID}}ID" class="glossary-entry">
                    <h3>{{glossaryentry.term}}</h3>
                    <p>{{glossaryentry.definition}}</p>
                </div>
            {%- endfor -%}
        </div>
    </div>
</section>