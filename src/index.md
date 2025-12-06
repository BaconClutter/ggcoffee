---
title: GET GOOD COFFEE
layout: "base.liquid"
logoImage: /img/get-logo.svg
stripImage: /img/get-header_icons.png
---
<div id="getHero" class="hero-section">
    <div class="width-limit">
        <div class="hero-text">
            <h1>
            It can be difficult to find good, new roasters
            </h1>
            <p>
            I know there are tons of them out there. So, I decided to make my own list and put it here so everyone else can find them too. They all source and roast high quality, <a href="/know/">single origin</a> beans, but each roaster does it a little different and a little special.
            </p>
            <p>
            I hope this helps you find your new favorite place to get good coffee.
            </p>
        </div>
        <img src="/img/get-hero.svg" alt="Illustrated hero showing coffee and brewing gear" width="400" />
    </div>
</div>
<section id="roasterDirectory">
    <div>
        <h2>Roaster directory</h2>
        <h3>A big list of good roasters that ship good coffee.</h3>
        <div class="roaster-filter">
            <label for="stateFilter">Filter by state:</label>
            <select id="stateFilter">
                <option value="">All States</option>
            </select>
        </div>
        <ul class="roaster-list">
        {% assign sortedRoasters = roasters | sort: "name" %}
            {%- for roaster in sortedRoasters -%}
            <li class="roaster" data-roaster='{{ roaster | jsonify }}' data-roaster-index="{{ forloop.index0 }}">
                <div class="roaster-logo"><img src="{{ roaster.logo }}" alt="{{ roaster.name }} logo" width="200"/></div>
                <div class="roaster-meta">{{ roaster.name }} - {{ roaster.city }}, {{ roaster.state }}</div>
                <div class="roaster-extra">{%- if roaster.extraInfo.est -%}Est:&nbsp;{%- endif -%}{{ roaster.extraInfo.est }}&nbsp;{%- if roaster.extraInfo.awards -%} - Award winning {%- endif -%}</div>
            </li>
            {%- endfor -%}
        </ul>
    </div>
<section>