gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
duration: 1.4,
smoothWheel: true
});

function raf(time) {
lenis.raf(time);
requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

gsap.to(".boy",{

x:1200,

ease:"none",

scrollTrigger:{
trigger:".story",
start:"top top",
end:"bottom bottom",
scrub:true
}

});

gsap.utils.toArray(".stage").forEach(stage=>{

gsap.from(stage,{

opacity:0,
y:100,

scrollTrigger:{
trigger:stage,
start:"top 70%",
end:"top 40%",
scrub:true
}

});

});

gsap.utils.toArray(".bar div").forEach(bar=>{

gsap.to(bar,{

width:bar.dataset.width,

duration:2,

scrollTrigger:{
trigger:bar,
start:"top 85%"
}

});

});

gsap.from(".timeline-item",{

x:-200,
opacity:0,
stagger:.3,

scrollTrigger:{
trigger:".timeline",
start:"top 70%"
}

});

gsap.from(".cert-card",{

scale:.5,
opacity:0,
stagger:.2,

scrollTrigger:{
trigger:".certifications",
start:"top 70%"
}

});