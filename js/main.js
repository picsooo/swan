(function(){
  var head=document.querySelector('.sw-head');
  if(head){var onS=function(){head.classList.toggle('is-scrolled',window.scrollY>8)};onS();window.addEventListener('scroll',onS,{passive:true});}

  var burger=document.querySelector('.sw-burger'),drawer=document.querySelector('.sw-drawer');
  if(burger&&drawer){burger.addEventListener('click',function(){
    var open=drawer.classList.toggle('is-open');burger.setAttribute('aria-expanded',open);
    document.body.style.overflow=open?'hidden':'';
  });}

  // Carrousel des grandes cartes
  document.querySelectorAll('[data-rail]').forEach(function(rail){
    var nav=rail.nextElementSibling,dots=nav&&nav.querySelector('.sw-dots'),cards=rail.children;
    if(dots)for(var i=0;i<cards.length;i++)dots.appendChild(document.createElement('i'));
    function step(){return cards[1]?cards[1].offsetLeft-cards[0].offsetLeft:rail.clientWidth;}
    function upd(){if(!dots)return;var idx=Math.round(rail.scrollLeft/step());
      var maxI=Math.max(0,Math.round((rail.scrollWidth-rail.clientWidth)/step()));
      Array.prototype.forEach.call(dots.children,function(d,k){d.classList.toggle('is-on',k===Math.min(idx,maxI)||(idx>=maxI&&k>=maxI&&k===cards.length-1));});}
    rail.addEventListener('scroll',function(){window.requestAnimationFrame(upd)},{passive:true});upd();
    if(nav)nav.querySelectorAll('.sw-rail-btn').forEach(function(b){b.addEventListener('click',function(){rail.scrollBy({left:step()*(+b.dataset.dir),behavior:'smooth'});});});
  });

  // Formulaires factices
  document.querySelectorAll('form[data-fake]').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var ok=f.parentNode.querySelector('.sw-ok');
      if(ok){ok.classList.add('is-on');ok.scrollIntoView({behavior:'smooth',block:'center'});}
      f.reset();
    });
  });

  // Simulateur de réception
  var sim=document.querySelector('[data-sim]');
  if(sim){
    var state={guests:150,per:10};
    var out=sim.querySelector('output'),rng=sim.querySelector('input[type=range]');
    function chipGroup(name,cb){
      var g=sim.querySelectorAll('[data-g="'+name+'"] .sw-chip');
      g.forEach(function(b){b.addEventListener('click',function(){
        g.forEach(function(x){x.setAttribute('aria-pressed','false')});
        b.setAttribute('aria-pressed','true');cb(b.dataset.v);calc();
      });});
    }
    chipGroup('type',function(){});
    chipGroup('table',function(v){state.per=+v;});
    rng.addEventListener('input',function(){state.guests=+rng.value;calc();});
    function set(k,v){var el=sim.querySelector('[data-r="'+k+'"]');if(el)el.textContent=v;}
    function calc(){
      var g=state.guests,t=Math.ceil(g/state.per);
      out.textContent=g;
      set('tables',t);set('chairs',g);
      set('flowers',state.per===10?t:Math.ceil(t*1.5));
      set('candles',t*3);
    }
    calc();
  }
})();
