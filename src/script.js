var hamburger = document.querySelector('.hamburger');
var navLinks = document.querySelector('.nav-links');
var navClose = document.querySelector('.nav-links .nav-close');

function openNav() {
    if (!navLinks || !hamburger) return;
    navLinks.classList.remove('hide');
    // reflect state for assistive tech
    hamburger.setAttribute('aria-expanded', 'true');
}

function closeNav() {
    if (!navLinks || !hamburger) return;
    navLinks.classList.add('hide');
    hamburger.setAttribute('aria-expanded', 'false');
}

if (hamburger) {
    hamburger.addEventListener('click', function () {
        var expanded = hamburger.getAttribute('aria-expanded') === 'true';
        if (expanded) closeNav(); else openNav();
    });
    // support keyboard activation (Enter / Space)
    hamburger.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            var expanded = hamburger.getAttribute('aria-expanded') === 'true';
            if (expanded) closeNav(); else openNav();
        }
    });
}

if (navClose) {
    navClose.addEventListener('click', function () {
        closeNav();
    });
}

/* Roaster modal behavior */
(function () {
    var modal = document.getElementById('roasterModal');
    if (!modal) return;

    var modalLogoImg = modal.querySelector('.modal-logo img');
    var modalName = modal.querySelector('.modal-name');
    var modalLocation = modal.querySelector('.modal-location');
    var modalDescription = modal.querySelector('.modal-description');
    var modalExtra = modal.querySelector('.modal-extra');
    var modalLinks = modal.querySelector('.modal-links');

    var lastActiveElement = null; // keep track of the element that opened the modal

    function openModal(roaster) {
        modalLogoImg.src = roaster.logo || '';
        modalLogoImg.alt = roaster.name ? roaster.name + ' logo' : 'roaster logo';
        modalName.textContent = roaster.name || '';
        modalLocation.textContent = ((roaster.city || '') + (roaster.city && roaster.state ? ', ' : '') + (roaster.state || '')).trim();
        modalDescription.textContent = roaster.description || '';
        modalLinks.innerHTML = roaster.website ? '<div class="roaster-shop-btn"><a href="' + roaster.website + '" target="_blank" rel="noopener noreferrer">Shop this roaster</a></div>' : '';

        // Build extra info (support newer extraInfo fields)
        var extraHtml = '';
        if (roaster.extraInfo) {
            if (roaster.extraInfo.est) extraHtml += '<p class="roaster-established">Est. ' + roaster.extraInfo.est + '</p>';
            if (roaster.extraInfo.awards) extraHtml += '<p class="roaster-awards">Award winning</p>';
            if (Array.isArray(roaster.extraInfo.notable) && roaster.extraInfo.notable.length) {
              //  extraHtml += '<div class="roaster-notable"><ul>' + roaster.extraInfo.notable.map(function (n) { return '<li>' + n + '</li>'; }).join('') + '</ul></div>';
            }
            if (roaster.extraInfo.ownership) {
                extraHtml += '<p class="roaster-ownership"> ' + roaster.extraInfo.ownership + '</p>';
            }
            if (Array.isArray(roaster.extraInfo.memberships) && roaster.extraInfo.memberships.length) {
             //   extraHtml += '<div class="roaster-memberships"><ul>' + roaster.extraInfo.memberships.map(function (m) { return '<li>' + m + '</li>'; }).join('') + '</ul></div>';
            }
        }
        if (roaster.johnsSeal) extraHtml += '<p data-tooltip="I like this one!" data-position="bottom" class="tooltip roaster-johns-seal">John\'s Seal</p>';
        modalExtra.innerHTML = extraHtml;

        // ensure modal is correctly labeled for assistive tech
        modal.setAttribute('aria-labelledby', 'roasterModalTitle');
        modal.setAttribute('aria-describedby', 'roasterModalDesc');

        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        // focus for accessibility
        var closeBtn = modal.querySelector('[data-modal-close]');
        if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
        modal.classList.add('hidden');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        // restore focus to the element that opened the modal
        try {
            if (lastActiveElement && typeof lastActiveElement.focus === 'function') lastActiveElement.focus();
        } catch (e) {
            // no-op
        }
    }

    // Delegate click on roaster items
    document.addEventListener('click', function (e) {
        var el = e.target.closest && e.target.closest('.roaster');
        if (!el) return;
        // store the triggering element so we can restore focus when the dialog closes
        lastActiveElement = el;
        var raw = el.getAttribute('data-roaster');
        if (!raw) return;
        try {
            var roaster = JSON.parse(raw);
            openModal(roaster);
        } catch (err) {
            console.error('Failed to parse roaster data', err);
        }
    });

    // Close handlers (backdrop + close buttons)
    modal.querySelectorAll('[data-modal-close]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            closeModal();
        });
    });

    // ESC to close
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeModal();
    });
})();

/* Search and state filter for roaster list */
(function () {
    var select = document.getElementById('stateFilter');
    var searchInput = document.getElementById('roasterSearch');
    if (!select) return;

    // Collect unique states from data-roaster attributes
    var items = Array.from(document.querySelectorAll('.roaster'));
    var states = items.map(function (el) {
        try {
            var r = JSON.parse(el.getAttribute('data-roaster') || '{}');
            return (r.state || '').trim();
        } catch (e) {
            return '';
        }
    }).filter(Boolean);

    // Deduplicate and sort
    var uniq = states.reduce(function (acc, s) {
        if (acc.indexOf(s) === -1) acc.push(s);
        return acc;
    }, []).sort();

    // Populate select
    uniq.forEach(function (st) {
        var opt = document.createElement('option');
        opt.value = st;
        opt.textContent = st;
        select.appendChild(opt);
    });

    function applyFilter() {
        var stateVal = select.value;
        var query = (searchInput ? searchInput.value : '').toLowerCase().trim();

        items.forEach(function (el) {
            try {
                var r = JSON.parse(el.getAttribute('data-roaster') || '{}');
                var matchesState = !stateVal || (r.state || '').trim() === stateVal;
                var matchesSearch = !query ||
                    (r.name || '').toLowerCase().indexOf(query) !== -1 ||
                    (r.city || '').toLowerCase().indexOf(query) !== -1 ||
                    (r.state || '').toLowerCase().indexOf(query) !== -1;
                el.style.display = (matchesState && matchesSearch) ? '' : 'none';
            } catch (e) {
                el.style.display = '';
            }
        });
    }

    select.addEventListener('change', applyFilter);
    if (searchInput) searchInput.addEventListener('input', applyFilter);
})();

/* TOOLTIP POSITIONING */
document.addEventListener('DOMContentLoaded', function() {
    const tooltips = document.querySelectorAll('.tooltip');

    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseover', () => {
            const tooltipRect = tooltip.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const tooltipText = tooltip.getAttribute('data-tooltip');
            
            if (tooltipRect.top > 50) {
                tooltip.setAttribute('data-position', 'top');
            } else if (viewportHeight - tooltipRect.bottom > 50) {
                tooltip.setAttribute('data-position', 'bottom');
            } else if (tooltipRect.left > 50) {
                tooltip.setAttribute('data-position', 'left');
            } else if (viewportWidth - tooltipRect.right > 50) {
                tooltip.setAttribute('data-position', 'right');
            }
        });
    });
});