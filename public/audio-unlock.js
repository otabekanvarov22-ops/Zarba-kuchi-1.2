/* Faqat iPhone/iPad uchun: ovoz chiqishi uchun. Kompyuterda hech narsa qilmaydi. */
(function(){
  var ua=navigator.userAgent||'';
  var ios=/iPad|iPhone|iPod/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  if(!ios)return;
  try{if(navigator.audioSession)navigator.audioSession.type='playback'}catch(e){}
  var ctxs=[],Native=window.AudioContext||window.webkitAudioContext;
  if(Native){
    var Wrapped=function(o){var c=new Native(o);ctxs.push(c);return c};
    Wrapped.prototype=Native.prototype;
    window.AudioContext=Wrapped;window.webkitAudioContext=Wrapped;
  }
  var silent=null,last=0;
  function unlock(){
    var now=Date.now();if(now-last<400)return;last=now;
    try{
      if(!silent){
        silent=document.createElement('audio');
        silent.setAttribute('playsinline','');
        silent.src='data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
        silent.loop=true;silent.volume=.01;
      }
      if(silent.paused)silent.play().catch(function(){});
    }catch(e){}
    ctxs.forEach(function(c){if(c.state!=='running')c.resume().catch(function(){})});
  }
  ['touchend','click'].forEach(function(t){document.addEventListener(t,unlock,true)});
  document.addEventListener('visibilitychange',function(){if(!document.hidden)ctxs.forEach(function(c){c.resume&&c.resume().catch(function(){})})});
})();
