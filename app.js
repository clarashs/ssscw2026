/* 苏州河 Citywalk — 交互逻辑（无依赖、无模块化，可直接以 file:// 打开） */
(function () {
  'use strict';

  /* ---------------- 状态 ---------------- */
  var LS_KEY = 'scw.v1';
  var state = { lang: 'de', selected: [], expanded: [], mapOpen: false };

  try {
    var saved = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
    if (saved.lang) state.lang = saved.lang;
    if (Array.isArray(saved.selected)) state.selected = saved.selected;
    if (Array.isArray(saved.expanded)) state.expanded = saved.expanded;
    state.mapOpen = !!saved.mapOpen;
  } catch (e) { /* 首次访问或存储不可用 */ }

  function save() {
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch (e) {}
  }

  /* ---------------- 工具 ---------------- */
  function t(k) { return (UI[state.lang] && UI[state.lang][k]) || k; }
  function tx(obj) { return obj ? (obj[state.lang] || obj.zh || '') : ''; }
  function linkUrl(link) { return link && typeof link.url === 'object' ? tx(link.url) : (link ? link.url : ''); }

  function fmt(min) {
    var h = Math.floor(min / 60), m = min % 60;
    if (state.lang === 'de') return h ? (m ? h + ' Std. ' + m + ' Min.' : h + ' Std.') : m + ' Min.';
    return h ? (m ? h + ' 小时 ' + m + ' 分钟' : h + ' 小时') : m + ' 分钟';
  }

  function totalMinutes() {
    var sum = ROUTE_META.baseMinutes;
    state.selected.forEach(function (id) {
      var p = byId(id);
      if (p && p.addMin) sum += p.addMin;
    });
    return sum;
  }

  function byId(id) {
    for (var i = 0; i < PLACES.length; i++) if (PLACES[i].id === id) return PLACES[i];
    return null;
  }

  function photoSpotById(id) {
    for (var i = 0; i < PHOTO_SPOTS.length; i++) if (PHOTO_SPOTS[i].id === id) return PHOTO_SPOTS[i];
    return null;
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function nameOf(p) {
    if (state.lang === 'de') return p.name.de || p.name.en;
    return p.name.zh;
  }

  function subNameOf(p) {
    if (state.lang === 'de') return p.name.en === p.name.zh ? '' : p.name.en;
    return p.name.en === p.name.zh ? '' : p.name.en;
  }

  function addrPrimary(p) { return state.lang === 'de' ? p.addr.en : p.addr.zh; }
  function addrSecondary(p) { return state.lang === 'de' ? p.addr.zh : p.addr.en; }

  function routeItems() {
    return PLACES.filter(function (p) {
      return p.type === 'stop' || (p.type === 'optional' && state.selected.indexOf(p.id) > -1);
    }).sort(function (a, b) { return a.order - b.order; });
  }

  var stopNumbers = (function () {
    var n = {}, i = 1;
    PLACES.filter(function (p) { return p.type === 'stop'; })
      .sort(function (a, b) { return a.order - b.order; })
      .forEach(function (p) { n[p.id] = i++; });
    return n;
  })();

  var ICONS = {
    food: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 3v6a2 2 0 0 0 4 0V3"/><path d="M8 9v12"/><path d="M17 3c-1.4 1.6-2 3.6-2 5.4 0 1.6.7 2.6 2 2.6v10"/></svg>',
    mall: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l-1.2 12H7.2L6 8z"/><path d="M9.2 8V6.2a2.8 2.8 0 0 1 5.6 0V8"/></svg>',
    id: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2.5"/><circle cx="12" cy="10" r="3"/><path d="M8.5 16.5h7"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="2.6"/></svg>',
    camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h3l1.5-2h7L17 7h3v12H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    art: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h14v16H5z"/><circle cx="9" cy="9" r="1.5"/><path d="M7 17l3.5-4 2.5 2 2-2.5 2 4.5"/></svg>',
    coffee: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h11v6.5A3.5 3.5 0 0 1 12.5 18h-4A3.5 3.5 0 0 1 5 14.5z"/><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16M4 21h15M8 4c0 1 1 1 1 2M12 4c0 1 1 1 1 2"/></svg>',
    library: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4v16H5zM10 4h4v16h-4zM15 4h4v16h-4z"/><path d="M4 20h16"/></svg>',
    ferris: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="7"/><path d="M12 3v14M5.9 6.5l12.2 7M5.9 13.5l12.2-7M12 17v4M8 21h8"/></svg>',
    residence: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 20V8l7-5 7 5v12z"/><path d="M9 20v-5h6v5M8 10h.01M12 10h.01M16 10h.01"/></svg>',
    dialog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 4v-4.1A2.5 2.5 0 0 1 4 12.5z"/><path d="M8 8h8M8 11h5"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg>'
  };

  function scrollToEl(el, block) {
    if (!el || typeof el.scrollIntoView !== 'function') return;
    try { el.scrollIntoView({ behavior: 'smooth', block: block || 'center' }); }
    catch (e) { try { el.scrollIntoView(); } catch (e2) {} }
  }

  var toastTimer = null;
  function toast(msg) {
    var el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('is-on'); }, 2600);
  }

  function copyText(str, okMsg) {
    function done(ok) { toast(ok ? okMsg : t('copyFallback')); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(str).then(function () { done(true); }, function () { done(fallbackCopy(str)); });
    } else {
      done(fallbackCopy(str));
    }
  }

  function fallbackCopy(str) {
    try {
      var ta = document.createElement('textarea');
      ta.value = str;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:-1000px;opacity:0;';
      document.body.appendChild(ta);
      ta.select();
      ta.setSelectionRange(0, str.length);
      var ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) { return false; }
  }

  /* ---------------- 渲染 ---------------- */
  var app = document.getElementById('app');

  function blockHead(title, hint, extraHtml) {
    return '<div class="block-head"><h2 class="block-title">' + esc(title) +
      '</h2>' + (extraHtml || '') + '</div>' +
      (hint ? '<p class="block-hint">' + esc(hint) + '</p>' : '');
  }

  function legendHtml() {
    return '<div class="route-legend" aria-label="' + esc(t('timelineTitle')) + '">' +
      '<span class="route-legend-item"><span class="route-legend-icon route-legend-stop" aria-label="' + esc(t('legendStop')) + '" title="' + esc(t('legendStop')) + '">1</span><span class="route-legend-label">' + esc(t('legendStop')) + '</span></span>' +
      '<span class="route-legend-item"><span class="route-legend-icon route-legend-aside" aria-label="' + esc(t('legendAside')) + '" title="' + esc(t('legendAside')) + '">' + ICONS.eye + '</span><span class="route-legend-label">' + esc(t('legendAside')) + '</span></span>' +
      '<span class="route-legend-item"><span class="route-legend-icon route-legend-opt" aria-label="' + esc(t('legendOptional')) + '" title="' + esc(t('legendOptional')) + '"><span>◇</span></span><span class="route-legend-label">' + esc(t('legendOptional')) + '</span></span>' +
      '</div>';
  }

  function bodyTextHtml(text) {
    return String(text || '').split(/\n\n/).map(function (paragraph) {
      return '<p>' + esc(paragraph).replace(/\n/g, '<br>') + '</p>';
    }).join('');
  }

  function mapNoteHtml() {
    return '<span class="map-note-icon map-note-stop" aria-hidden="true">1</span> ' + esc(t('mapNoteFormal')) + '、' +
      '<span class="map-note-icon map-note-aside" aria-hidden="true">' + ICONS.eye + '</span> ' + esc(t('mapNoteAside')) + '、' +
      '<span class="map-note-icon map-note-opt" aria-hidden="true"><span>◇</span></span> ' + esc(t('mapNoteOptional')) + '、' +
      '<span class="map-note-icon map-note-photo" aria-hidden="true">' + ICONS.camera + '</span> ' + esc(t('mapNotePhoto')) +
      '<br>' +
      '<span class="map-note-action">' + esc(t('mapNoteAction')) + '</span> ' +
      '<span class="map-note-icon map-note-dialog" aria-hidden="true">' + ICONS.dialog + '</span> ' + esc(t('mapNoteClickable')) + '。' +
      '<span class="map-note-retry">' + esc(t('mapNoteRetry')) + '</span>';
  }

  function stayLabel(p) {
    var value = stayValue(p);
    return state.lang === 'de' ? value : value.replace(/\s+/g, '');
  }

  function stayValue(p) {
    if (Array.isArray(p.stay)) return p.stay[0] + '–' + p.stay[1] + (state.lang === 'de' ? ' Min.' : ' 分钟');
    return fmt(p.stay);
  }

  function tagChips(p) {
    var out = '';
    (p.tags || []).forEach(function (tag) {
      var key = typeof tag === 'string' ? tag : tag.key;
      var icon = typeof tag === 'object' && tag.icon ? ICONS[tag.icon] : '';
      var label = typeof tag === 'object' && tag.label ? tx(tag.label) : '';
      if (key === 'food') {
        out += '<span class="mini mini-food">' + (icon || ICONS.food) + esc(label || tx(p.tagText)) + '</span>';
      } else if (key === 'mall') {
        out += '<span class="mini mini-mall">' + ICONS.mall + esc(t('mallLabel')) + '</span>';
      } else if (tag === 'id') {
        out += '<span class="mini mini-id">' + ICONS.id + esc(t('idLabel')) + '</span>';
      } else if (label && icon) {
        out += '<span class="mini mini-' + esc(key) + '">' + icon + esc(label) + '</span>';
      }
    });
    return out;
  }

  function markerHtml(p) {
    if (p.type === 'stop') return '<div class="marker marker-stop">' + stopNumbers[p.id] + '</div>';
    if (p.type === 'glance') return '<div class="marker marker-aside">' + ICONS.eye + '</div>';
    return '<div class="marker marker-opt"><span>◇</span></div>';
  }

  function actsHtml(p) {
    var h = '<div class="acts">';
    h += '<button class="btn btn-ghost btn-sm" type="button" data-act="amap" data-id="' + p.id + '" data-nav-url="' + esc(amapUrl(p)) + '">' + esc(t('navAmap')) + '</button>';
    h += '<button class="btn btn-ghost btn-sm" type="button" data-act="apple" data-id="' + p.id + '">' + esc(t('navApple')) + '</button>';
    h += '</div>';
    return h;
  }

  function bodyHtml(p) {
    var h = '<div class="card-body">';
    h += '<div class="kv"><div class="kv-k">' + esc(t('addr')) + '</div>' +
      '<div class="kv-v">' + esc(addrPrimary(p)) + '</div>' +
      '<div class="kv-v sub">' + esc(addrSecondary(p)) + '</div></div>';

    h += '<div class="kv"><div class="kv-k">' + esc(t('hours')) + '</div><div class="kv-v">' + esc(tx(p.hours)) + '</div></div>';
    h += '<div class="kv"><div class="kv-k">' + esc(t('intro')) + '</div><div class="kv-v body-text">' + bodyTextHtml(tx(p.intro)) + '</div></div>';
    if (p.story) {
      var storyId = p.id + '-story';
      var storyOpen = state.expanded.indexOf(storyId) > -1;
      h += '<div class="kv card-story"><button class="card-story-toggle" type="button" data-act="butterfly-story" data-id="' + esc(p.id) + '" aria-expanded="' + (storyOpen ? 'true' : 'false') + '">' +
        esc(tx(p.story.label)) + '<span class="chev' + (storyOpen ? ' is-open' : '') + '"></span></button>';
      if (storyOpen) {
        h += '<div class="butterfly-story-body">' + bodyTextHtml(tx(p.story.body)) + '</div>';
      }
      h += '</div>';
    }
    if (p.notes && p.notes.length) {
      h += '<div class="kv card-notes"><div class="kv-v">';
      p.notes.forEach(function (note) {
        h += '<p class="card-note"><span class="card-note-icon" aria-hidden="true">' + (note.icon === 'idea' ? '💡' : '😀') + '</span><span>' + esc(tx(note.text)) + '</span></p>';
      });
      h += '</div></div>';
    }
    if (p.photoSpots && p.photoSpots.length) {
      h += '<div class="kv card-photo-links"><div class="kv-v"><span class="card-photo-icon" aria-hidden="true">' + ICONS.camera + '</span> ' + esc(t('photoSpotsLabel')) + ' ';
      p.photoSpots.forEach(function (spotId, index) {
        var spot = photoSpotById(spotId);
        if (!spot) return;
        if (index) h += '<span class="card-photo-separator">、</span>';
        h += '<button class="card-photo-link" type="button" data-act="photo" data-id="' + esc(spot.id) + '">' + esc(tx(spot.name)) + '</button>';
      });
      h += '</div></div>';
    }
    if (p.tips && tx(p.tips)) {
      h += '<div class="kv"><div class="kv-v body-text">' + bodyTextHtml(tx(p.tips)) + '</div></div>';
    }

    if (p.links && p.links.length) {
      h += '<div class="kv"><div class="kv-v' + (p.linksTitle ? ' chapter-link' : '') + '">';
      if (p.linksTitle) h += '<strong>' + esc(tx(p.linksTitle)) + '</strong><br>';
      if (p.filmNote) h += '<div class="card-film-note body-text">' + bodyTextHtml(tx(p.filmNote)) + '</div>';
      p.links.forEach(function (l) {
        h += '<a class="prep-link" href="' + esc(linkUrl(l)) + '" target="_blank" rel="noopener">' + esc(tx(l.label)) + '</a><br>';
      });
      h += '</div></div>';
    }
    h += actsHtml(p);
    h += '</div>';
    return h;
  }

  function cardHtml(p) {
    var open = state.expanded.indexOf(p.id) > -1;
    var on = state.selected.indexOf(p.id) > -1;
    var h = '<article class="card' + (open ? ' is-open' : '') + (on ? ' opt-on' : '') + '" id="card-' + p.id + '" data-card="' + p.id + '">';
    h += '<div class="card-head" data-id="' + p.id + '">';
    h += markerHtml(p);
    h += '<div class="card-main">';
    h += '<div class="card-name-row"><div class="card-name">' + esc(p.name.zh) + '</div>';
    if (p.type === 'optional') {
      h += '<button class="btn btn-sm ' + (on ? 'btn-ghost' : 'btn-primary') + '" type="button" data-act="' + (on ? 'remove' : 'add') + '" data-id="' + p.id + '">' +
        esc(on ? t('removeStop') : t('addStop')) + '</button>';
    }
    h += '</div>';
    var sn = subNameOf(p);
    if (sn) h += '<div class="card-name-en">' + esc(sn) + '</div>';
    h += '<div class="card-highlight">' + esc(tx(p.highlight)) + '</div>';
    h += '<div class="card-metas">' + (p.id !== 'joycity' ? '<span class="mini">' + esc(stayLabel(p)) + '</span>' : '') + tagChips(p) + '</div>';
    h += '</div>';
    h += '<div class="card-toggle"><span class="chev"></span></div>';
    h += '</div>';
    if (open) h += bodyHtml(p);
    h += '</article>';
    return h;
  }

  function chapterHtml(c) {
    var open = state.expanded.indexOf(c.id) > -1;
    var chapterTitle = state.lang === 'de' ? c.title.zh : tx(c.title);
    var body = esc(tx(c.body)).replace(/\n\n/g, '\u0001').replace(/\n/g, ' ');
    var paras = body.split('\u0001').map(function (x) { return '<p>' + x + '</p>'; }).join('');
    var h = '<section class="chapter" data-card="' + c.id + '">';
    h += '<button class="chapter-head" type="button" data-id="' + c.id + '">' +
      '<span class="chapter-dot"></span>' +
      '<span class="chapter-title">' + esc(chapterTitle) + '<small>' + esc(c.title.en) + '</small></span>' +
      '<span class="chev"></span></button>';
    if (open) {
      h += '<div class="chapter-body">' + paras;
      if (c.links && c.links.length) {
        h += '<div class="chapter-link"><strong>' + esc(t('bookLabel')) + '</strong><br>';
        if (c.bookNote) h += '<div class="card-film-note body-text">' + bodyTextHtml(tx(c.bookNote)) + '</div>';
        c.links.forEach(function (l) {
          h += '<a class="prep-link" href="' + esc(linkUrl(l)) + '" target="_blank" rel="noopener">' + esc(tx(l.label)) + ' ↗</a>';
        });
        h += '</div>';
      }
      h += '</div>';
    }
    h += '</section>';
    return h;
  }

  function renderHero() {
    var html = '<h1>' + esc(t('title')) + '</h1>' +
      '<p class="sub">' + esc(t('subtitle')) + '</p>' +
      '<div class="hero-meta">' +
      '<span class="chip">' + esc(t('metaDuration').replace('{t}', fmt(totalMinutes()))) + '</span>' +
      '<span class="chip">' + esc(t('metaWalk').replace('{d}', walkKm())) + '</span>' +
      '<span class="chip">' + esc(t('metaStopsLabel')) + '</span>' +
      '</div>';
    document.getElementById('hero').innerHTML = html;
  }

  function renderPrep() {
    var open = state.expanded.indexOf('prep') > -1;
    var h = '<div class="block-head prep-head-wrap"><button class="prep-head" type="button" data-id="prep" aria-expanded="' + (open ? 'true' : 'false') + '">' +
      '<h2 class="block-title">' + esc(t('prepTitle')) + '</h2><span class="chev"></span></button></div>';
    if (open) {
      h += '<div class="prep">';
      PREP.forEach(function (item) {
        h += '<div class="prep-item">' +
          '<span class="prep-bullet">•</span>' +
          '<span class="prep-label">' + esc(tx(item));
        if (item.link) {
          h += '<a class="prep-link" href="' + esc(item.link) + '" target="_blank" rel="noopener">' +
            esc(tx(item.linkText)) + ' ↗</a>';
        }
        h += '</span></div>';
      });
      h += '</div>';
    }
    document.getElementById('prepBlock').innerHTML = h;
  }

  function renderRoute() {
    var items = PLACES.slice().sort(function (a, b) { return a.order - b.order; });
    var h = blockHead(t('timelineTitle'), '', legendHtml());
    items.forEach(function (p) {
      h += p.type === 'chapter' ? chapterHtml(p) : cardHtml(p);
    });
    document.getElementById('timelineBlock').innerHTML = h;
  }

  function renderBoat() {
    var b = BOAT[state.lang];
    var open = state.expanded.indexOf('boat') > -1;
    var h = '<section class="chapter" data-card="boat">';
    h += '<button class="chapter-head" type="button" data-id="boat">' +
      '<span class="chapter-dot"></span>' +
      '<span class="chapter-title">' + esc(b.title.zh) + '<small>' + esc(b.title.en) + '</small></span>' +
      '<span class="chev"></span></button>';
    if (open) {
      h += '<div class="chapter-body">';
      h += '<div class="card-metas boat-tags"><span class="mini mini-id">' + ICONS.id + esc(t('idLabel')) + '</span></div>';
      b.paragraphs.forEach(function (paragraph) { h += '<p>' + esc(paragraph) + '</p>'; });
      h += '<p><span aria-hidden="true">🎟️</span> ' + esc(b.ticket) + ' <span aria-hidden="true">🙂</span></p>';
      h += '</div>';
    }
    h += '</section>';
    document.getElementById('boatBlock').innerHTML = h;
  }

  function renderEnding() {
    var e = ENDING[state.lang];
    var h = blockHead(t('endingTitle'), '');
    h += '<div class="ending">';
    e.body.forEach(function (p) { h += '<p>' + esc(p) + '</p>'; });
    h += '<p class="ending-question"><span aria-hidden="true">💭</span> ' + esc(e.question) + '</p>';
    h += '</div>';
    document.getElementById('endingBlock').innerHTML = h;
  }

  function renderFoot() {
    document.getElementById('foot').innerHTML = '<p class="foot-credit">' + esc(t('createdBy')) + '</p>';
  }

  function render() {
    var y = window.scrollY;
    var L = state.lang;
    document.documentElement.lang = L === 'de' ? 'de' : 'zh-CN';
    document.getElementById('tbKicker').textContent = t('kicker');
    document.getElementById('tbTitle').textContent = t('title');
    document.getElementById('btnRoute').textContent = t('btnRoute');
    document.getElementById('mapHeadTitle').textContent = t('mapTitle');
    document.getElementById('t-locate').textContent = t('locate');
    var rerouteButton = document.querySelector('[data-act="reroute"]');
    if (rerouteButton && !rerouteButton.disabled) rerouteButton.textContent = t('reroute');
    document.getElementById('mapNote').innerHTML = mapNoteHtml();
    Array.prototype.forEach.call(document.querySelectorAll('.lang-btn'), function (b) {
      b.classList.toggle('is-on', b.dataset.lang === L);
    });
    renderHero(); renderPrep(); renderRoute();
    renderBoat(); renderEnding(); renderFoot();
    if (MapMod.ready) MapMod.refresh();
    try { window.scrollTo(0, y); } catch (e) {}
  }

  /* ---------------- 地图 ---------------- */
  var CFG = window.AMAP_CONFIG || {};

  var MapMod = {
    ready: false,
    failed: false,
    loading: false,
    map: null,
    markers: {},
    lines: [],
    info: null,
    infoActivation: null,
    dist: 0,
    walking: null,
    geo: null,
    userMarker: null,
    routeGeneration: 0,

    ensure: function () {
      var self = this;
      if (this.ready) return Promise.resolve(true);
      if (this.failed) return Promise.resolve(false);
      if (this.loading) return Promise.resolve(false);
      this.loading = true;
      showMapMsg(t('mapLoading'), 'info');
      return loadAMap().then(function () {
        self.map = new AMap.Map('mapEl', {
          zoom: 14,
          center: [121.4555, 31.2442],
          viewMode: '2D',
          resizeEnable: true
        });
        self.info = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30), autoMove: false });
        try { self.geo = new AMap.Geolocation({ enableHighAccuracy: true, timeout: 8000, showButton: false }); } catch (e) {}
        try { self.walking = new AMap.Walking({ autoFitView: false, hideMarkers: true }); } catch (e) {}
        self.ready = true;
        self.loading = false;
        hideMapMsg();
        self.refresh();
        return true;
      })['catch'](function (err) {
        self.loading = false;
        self.failed = true;
        showMapMsg(err === 'nokey' ? t('mapNoKey') : t('mapFail'), 'warn');
        return false;
      });
    },

    refresh: function () {
      if (!this.ready) return;
      var self = this;
      Object.keys(this.markers).forEach(function (k) { self.map.remove(self.markers[k]); });
      this.markers = {};

      PLACES.forEach(function (p) {
        if (p.type === 'chapter') return;
        var cls = p.type === 'stop' ? 'mk-stop' : (p.type === 'glance' ? 'mk-aside' : 'mk-opt' + (state.selected.indexOf(p.id) > -1 ? ' is-selected' : ''));
        var inner = p.type === 'stop' ? stopNumbers[p.id] : (p.type === 'glance' ? ICONS.eye : '◇');
        var m = new AMap.Marker({
          position: p.coord,
          offset: new AMap.Pixel(-13, -13),
          content: '<div class="mk ' + cls + '" data-mk="' + p.id + '">' + inner + '</div>',
          title: nameOf(p),
          zIndex: p.type === 'stop' ? 130 : (p.type === 'glance' ? 110 : (state.selected.indexOf(p.id) > -1 ? 120 : 90))
        });
        m.on('click', function () { self.focus(p.id, false); });
        self.markers[p.id] = m;
        self.map.add(m);
      });

      PHOTO_SPOTS.forEach(function (spot) {
        var markerKey = 'photo-' + spot.id;
        var m = new AMap.Marker({
          position: spot.coord,
          offset: new AMap.Pixel(-13, -13),
          content: '<div class="mk mk-photo" data-photo="' + spot.id + '">' + ICONS.camera + '</div>',
          title: tx(spot.name),
          zIndex: 125
        });
        m.on('click', function () { self.focusPhoto(spot.id); });
        self.markers[markerKey] = m;
        self.map.add(m);
      });

      this.refreshRoutes(false);
      this.map.setFitView(null, false, [50, 50, 50, 50]);
    },

    refreshRoutes: function (showFeedback) {
      if (!this.ready) {
        if (showFeedback) setRerouteState(false);
        return;
      }
      var self = this;
      var generation = ++this.routeGeneration;
      this.lines.forEach(function (line) { self.map.remove(line); });
      this.lines = [];
      this.dist = 0;
      updateWalkChip();
      if (showFeedback) setRerouteState(true);
      this.drawRoutes(generation, function () {
        if (generation !== self.routeGeneration || !showFeedback) return;
        setRerouteState(false);
        toast(t('rerouteDone'));
      });
    },

    drawRoutes: function (generation, onComplete) {
      var self = this;
      var items = routeItems();
      var index = 1;
      var completed = false;

      function complete() {
        if (completed || generation !== self.routeGeneration) return;
        completed = true;
        if (onComplete) onComplete();
      }

      function finishSegment(a, b, distance, path, dashed) {
        if (generation !== self.routeGeneration) return;
        self.dist += distance || directDistanceMeters(a.coord, b.coord);
        self.line(path || a.coord, path ? null : b.coord, dashed);
        updateWalkChip();
        self.map.setFitView(null, false, [50, 50, 50, 50]);
        nextSegment();
      }

      function nextSegment() {
        if (generation !== self.routeGeneration) return;
        if (index >= items.length) { complete(); return; }
        var a = items[index - 1], b = items[index];
        index += 1;
        if (!self.walking) {
          finishSegment(a, b, directDistanceMeters(a.coord, b.coord), null, true);
          return;
        }
        self.walking.search(a.coord, b.coord, function (status, result) {
          if (generation !== self.routeGeneration) return;
          if (status === 'complete' && result.routes && result.routes.length) {
            var r = result.routes[0], path = [];
            (r.steps || []).forEach(function (s) { path = path.concat(s.path || []); });
            finishSegment(a, b, r.distance, path.length ? path : null, !path.length);
          } else {
            finishSegment(a, b, directDistanceMeters(a.coord, b.coord), null, true);
          }
        });
      }

      nextSegment();
    },

    line: function (pathA, pathB, dashed) {
      var path = pathB ? [pathA, pathB] : pathA;
      var pl = new AMap.Polyline({
        path: path,
        strokeColor: dashed ? '#8a877f' : '#1f8a4c',
        strokeWeight: dashed ? 3 : 5,
        strokeOpacity: dashed ? .6 : .85,
        strokeStyle: dashed ? 'dashed' : 'solid',
        lineJoin: 'round',
        lineCap: 'round'
      });
      this.map.add(pl);
      this.lines.push(pl);
    },

    focus: function (id, fromMap) {
      var p = byId(id);
      if (!p) return;
      // 卡片：展开 + 滚动 + 高亮
      if (fromMap && p.type !== 'chapter' && state.expanded.indexOf(id) < 0) {
        state.expanded.push(id);
        save();
        renderRoute();
      }
      var el = document.getElementById('card-' + id);
      if (el) {
        el.classList.add('flash');
        setTimeout(function () { el.classList.remove('flash'); }, 1600);
        if (fromMap) scrollToEl(el, 'center');
      }
      if (!this.ready) return;
      var m = this.markers[id];
      if (m) {
        this.map.setZoomAndCenter(16, p.coord);
        this.infoActivation = { id: id, openedAt: Date.now() };
        this.info.setContent('<div class="map-info-link" data-map-card="' + esc(p.id) + '" role="button" tabindex="0" style="font-size:13px;line-height:1.5;max-width:220px;cursor:pointer"><b>' +
          esc(p.name.zh) + '</b><br>' + esc(p.name.en || p.name.zh) + '</div>');
        this.info.open(this.map, p.coord);
        Object.keys(this.markers).forEach(function (k) {
          var node = document.querySelector('.mk[data-mk="' + k + '"]');
          if (node) node.classList.toggle('is-active', k === id);
        });
      }
    },

    focusPhoto: function (id) {
      var spot = photoSpotById(id);
      if (!spot || !this.ready) return;
      this.map.setZoomAndCenter(16, spot.coord);
      this.info.setContent('<div style="font-size:13px;line-height:1.5;max-width:220px"><b>' +
        esc(tx(spot.name)) + '</b><br>' + esc(tx(spot.hint)) + '</div>');
      this.info.open(this.map, spot.coord);
    },

    locate: function () {
      var self = this;
      if (!this.ready || !this.geo) { toast(t('locateFail')); setLocateState(false); return; }
      setLocateState('loading');
      this.geo.getCurrentPosition(function (status, result) {
        if (status === 'complete' && result.position) {
          setLocateState(true);
          self.map.setZoomAndCenter(16, [result.position.lng, result.position.lat]);
          if (self.userMarker) self.map.remove(self.userMarker);
          self.userMarker = new AMap.Marker({
            position: [result.position.lng, result.position.lat],
            content: '<div style="width:16px;height:16px;border-radius:50%;background:#2563c9;border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3)"></div>',
            offset: new AMap.Pixel(-8, -8)
          });
          self.map.add(self.userMarker);
        } else {
          setLocateState(false);
          toast(t('locateFail'));
        }
      });
    }
  };

  function loadAMap() {
    return new Promise(function (resolve, reject) {
      if (!CFG.key) { reject('nokey'); return; }
      if (window.AMap) { resolve(); return; }
      window._AMapSecurityConfig = { securityJsCode: CFG.securityJsCode || '' };
      var s = document.createElement('script');
      s.src = 'https://webapi.amap.com/maps?v=2.0&key=' + encodeURIComponent(CFG.key) +
        '&plugin=AMap.Walking,AMap.Geolocation';
      s.async = true;
      s.onload = function () { window.AMap ? resolve() : reject('empty'); };
      s.onerror = function () { reject('error'); };
      document.head.appendChild(s);
      setTimeout(function () { if (!window.AMap) reject('timeout'); }, 12000);
    });
  }

  function showMapMsg(msg, kind) {
    var box = document.getElementById('mapMsg');
    box.textContent = msg;
    box.hidden = false;
    box.className = 'map-msg' + (kind === 'info' ? ' map-msg-info' : '');
    document.getElementById('mapEl').style.display = kind === 'info' ? '' : 'none';
  }

  function hideMapMsg() {
    document.getElementById('mapMsg').hidden = true;
    document.getElementById('mapEl').style.display = '';
  }

  function directDistanceMeters(a, b) {
    var toRad = Math.PI / 180;
    var lat1 = a[1] * toRad, lat2 = b[1] * toRad;
    var dLat = (b[1] - a[1]) * toRad;
    var dLng = (b[0] - a[0]) * toRad;
    var sinLat = Math.sin(dLat / 2), sinLng = Math.sin(dLng / 2);
    var h = sinLat * sinLat + Math.cos(lat1) * Math.cos(lat2) * sinLng * sinLng;
    return 6371000 * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  }

  function walkKm() {
    return MapMod.dist > 0 ? (MapMod.dist / 1000).toFixed(1) : ROUTE_META.fallbackKm;
  }

  function setLocateState(status) {
    var button = document.querySelector('[data-act="locate"]');
    if (!button) return;
    button.disabled = status === 'loading';
    button.classList.toggle('is-loading', status === 'loading');
    button.textContent = status === 'loading' ? t('locating') : (status === true ? t('locateAgain') : t('locate'));
  }

  function setRerouteState(loading) {
    var button = document.querySelector('[data-act="reroute"]');
    if (!button) return;
    button.disabled = !!loading;
    button.classList.toggle('is-loading', !!loading);
    button.textContent = loading ? t('rerouting') : t('reroute');
  }

  function updateWalkChip() {
    var chip = document.querySelector('#hero .hero-meta .chip:nth-child(2)');
    if (chip) chip.textContent = t('metaWalk').replace('{d}', walkKm());
  }

  /* ---------------- 交互 ---------------- */
  function openMapSection(scroll) {
    var body = document.getElementById('mapBody');
    var head = document.getElementById('mapHead');
    state.mapOpen = true;
    save();
    body.hidden = false;
    head.setAttribute('aria-expanded', 'true');
    MapMod.ensure();
    if (scroll) {
      setTimeout(function () { scrollToEl(document.getElementById('mapCard'), 'start'); }, 60);
    }
  }

  function closeMapSection() {
    var body = document.getElementById('mapBody');
    var head = document.getElementById('mapHead');
    state.mapOpen = false;
    save();
    body.hidden = true;
    head.setAttribute('aria-expanded', 'false');
  }

  document.getElementById('btnRoute').addEventListener('click', function () {
    if (state.mapOpen) scrollToEl(document.getElementById('mapCard'), 'start');
    else openMapSection(true);
  });

  document.getElementById('mapHead').addEventListener('click', function () {
    if (state.mapOpen) closeMapSection(); else openMapSection(false);
  });

  Array.prototype.forEach.call(document.querySelectorAll('.lang-btn'), function (b) {
    b.addEventListener('click', function () {
      if (state.lang === b.dataset.lang) return;
      state.lang = b.dataset.lang;
      save();
      render();
    });
  });

  app.addEventListener('click', function (e) {
    /* 操作按钮 */
    var btn = e.target.closest('button[data-act], a[data-act]');
    if (btn) {
      var act = btn.getAttribute('data-act');
      var id = btn.getAttribute('data-id');
      var p = byId(id);
      if (act === 'butterfly-story' && p && p.story) {
        var storyId = id + '-story';
        var storyIndex = state.expanded.indexOf(storyId);
        if (storyIndex > -1) state.expanded.splice(storyIndex, 1); else state.expanded.push(storyId);
        save();
        renderRoute();
        return;
      }
      if (act === 'amap' && p) { openExternal(btn.getAttribute('data-nav-url') || amapUrl(p), p); return; }
      if (act === 'apple' && p) { openExternal(appleUrl(p), p); return; }
      if (act === 'map' && p) {
        openMapSection(true);
        MapMod.ensure().then(function (ok) { if (ok) MapMod.focus(id, false); });
        return;
      }
      if (act === 'photo') {
        openMapSection(true);
        MapMod.ensure().then(function (ok) { if (ok) MapMod.focusPhoto(id); });
        return;
      }
      if ((act === 'add' || act === 'remove') && p) {
        var k = state.selected.indexOf(id);
        if (k > -1) state.selected.splice(k, 1); else state.selected.push(id);
        save();
        renderHero(); renderRoute(); updateWalkChip();
        if (MapMod.ready) MapMod.refresh();
        return;
      }
      if (act === 'locate') { MapMod.ensure().then(function (ok) { if (ok) MapMod.locate(); }); return; }
      if (act === 'reroute') {
        if (MapMod.ready) MapMod.refreshRoutes(true);
        else {
          setRerouteState(true);
          MapMod.ensure().then(function (ok) {
            if (ok) MapMod.refreshRoutes(true);
            else setRerouteState(false);
          });
        }
        return;
      }
      return;
    }

    /* ,card / 章节 展开收起（按钮区域不触发） */
    var head = e.target.closest('.card-head, .chapter-head, .prep-head');
    if (head) {
      var hid = head.getAttribute('data-id');
      var idx = state.expanded.indexOf(hid);
      if (idx > -1) state.expanded.splice(idx, 1); else state.expanded.push(hid);
      save();
      if (hid === 'boat') renderBoat();
      else if (hid === 'prep') renderPrep();
      else renderRoute();
    }
  });

  document.addEventListener('click', function (e) {
    var infoLink = e.target.closest('.map-info-link');
    if (!infoLink) return;
    var id = infoLink.getAttribute('data-map-card');
    var activation = MapMod.infoActivation;
    var touchArmed = activation && infoTouchTarget === infoLink && infoTouchAt > activation.openedAt + 120;
    if (activation && activation.id === id && Date.now() - activation.openedAt < 1200 && !touchArmed && e.detail !== 0) return;
    MapMod.infoActivation = null;
    e.preventDefault();
    e.stopPropagation();
    if (byId(id)) MapMod.focus(id, true);
  });

  var infoTouchTarget = null;
  var infoTouchAt = 0;
  function rememberInfoTouch(e) {
    var target = e.target.closest && e.target.closest('.map-info-link');
    if (!target) {
      infoTouchTarget = null;
      infoTouchAt = 0;
      return;
    }
    var activation = MapMod.infoActivation;
    if (activation && activation.id === target.getAttribute('data-map-card') && Date.now() - activation.openedAt < 120) {
      infoTouchTarget = null;
      infoTouchAt = 0;
      return;
    }
    infoTouchTarget = target;
    infoTouchAt = Date.now();
  }
  document.addEventListener('pointerdown', rememberInfoTouch, true);
  document.addEventListener('touchstart', rememberInfoTouch, true);

  function amapUrl(p) {
    if (state.lang === 'de') {
      var destination = '&dlat=' + p.coord[1] + '&dlon=' + p.coord[0] +
        '&dname=' + encodeURIComponent(p.name.en || p.name.zh) + '&dev=0&t=2';
      var ios = /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
        (/Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
      if (ios) return 'iosamap://path?sourceApplication=citywalk' + destination;
      return 'amapuri://route/plan/?sourceApplication=citywalk' + destination;
    }
    return 'https://uri.amap.com/navigation?to=' + p.coord[0] + ',' + p.coord[1] + ',' +
      encodeURIComponent(p.name.zh) + '&mode=walk&policy=1&src=citywalk&coordinate=gaode&callnative=1';
  }

  function appleUrl(p) {
    return 'https://maps.apple.com/?daddr=' + p.coord[1] + ',' + p.coord[0] +
      '&q=' + encodeURIComponent(p.name.en || p.name.zh) + '&dirflg=w';
  }

  function openExternal(url, p) {
    try { window.location.href = url; } catch (e) { window.open(url, '_blank'); }
    setTimeout(function () {
      if (document.visibilityState === 'visible' && document.hasFocus && document.hasFocus()) {
        copyText(p.name.zh + ' / ' + p.name.en, t('navFail'));
      }
    }, 2200);
  }

  /* ---------------- 启动 ---------------- */
  render();

  /* 主题步行章节默认展开（首次访问） */
  var firstVisit = true;
  try { firstVisit = !localStorage.getItem(LS_KEY); } catch (e) {}
  if (firstVisit) {
    state.mapOpen = true;
    if (state.expanded.indexOf('prep') < 0) state.expanded.push('prep');
    PLACES.filter(function (p) { return p.type === 'chapter'; }).forEach(function (c) {
      if (state.expanded.indexOf(c.id) < 0) state.expanded.push(c.id);
    });
    save();
    renderRoute();
  }

  if (state.mapOpen) openMapSection(false);
})();

