---
title: GET GOOD COFFEE
layout: "base.liquid"
logoImage: /img/get-logo.svg
stripImage: /img/get-header_icons.png
modalcss: modal.css
roasterscss: roasters.css
---
<link rel="stylesheet" href="assets/{{modalcss}}">
<link rel="stylesheet" href="assets/{{roasterscss}}">

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
            I hope this helps you find your new favorite place to get good coffee. And if you're curious, <a href="/coffeeposts/">check out what I'm drinking</a>
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
            <label for="roasterSearch">Search roasters:</label>
            <input type="text" id="roasterSearch" placeholder="Search roasters..." />
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
</section>
<!-- Roaster modal -->
<div id="roasterModal" class="modal hidden" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="roasterModalTitle" aria-describedby="roasterModalDesc">
    <div class="modal-backdrop" data-modal-close></div>
    <div class="modal-content" role="document">
        <button class="modal-close" aria-label="Close" data-modal-close><img src="/img/nav-x.svg" alt="Close Menu"></button>
        <div class="modal-body">
            <div class="modal-left-side">
                <div class="modal-logo"><img src="" alt="" /></div>
            </div>
            <div class="modal-right-side">
                <h2 id="roasterModalTitle" class="modal-name"></h2>
                <p class="modal-location"></p>
                <div class="modal-extra"></div>
                <p id="roasterModalDesc" class="modal-description"></p>
                <div class="modal-links"></div>
            </div>
        </div>
    </div>
</div>