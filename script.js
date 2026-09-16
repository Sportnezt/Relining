document.addEventListener("DOMContentLoaded",()=>{
  const cards=[...document.querySelectorAll("[data-key]")];
  const map={}; cards.forEach(card=>map[card.dataset.key]=card.getAttribute("href"));
  document.addEventListener("keydown",e=>{
    if(e.ctrlKey||e.metaKey||e.altKey) return;
    if(["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName)) return;
    const href=map[e.key]; if(!href) return;
    e.preventDefault(); window.location.href=href;
  });
  const input=document.querySelector("#faqSearch");
  if(!input) return;
  const items=[...document.querySelectorAll("#faqList details")];
  const empty=document.querySelector("#noResults");
  function filter(){
    const q=input.value.trim().toLowerCase();
    let visible=0;
    items.forEach(item=>{
      const hay=(item.dataset.search+" "+item.textContent).toLowerCase();
      const ok=!q||hay.includes(q);
      item.hidden=!ok;
      if(ok) visible++;
    });
    empty.hidden=visible!==0;
  }
  input.addEventListener("input",filter);
});