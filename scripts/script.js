




// ! smooth scrolling

const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".smooth-scroll"),
    smooth: true,
    multiplier: 5
})

// locoScroll.on("scroll", ScrollTrigger.update);
// ScrollTrigger.scrollerProxy(".smooth-scroll", {
//     scrollTop(value) {
//         return arguments.length
//             ? locoScroll.scrollTo(value, 0, 0)
//             : locoScroll.scroll.instance.scroll.y;
//     },
//     getBoundingClientRect() {
//         return {
//             top: 0,
//             left: 0,
//             width: window.innerWidth,
//             height: window.innerHeight,
//         };
//     },
//     pinType: document.querySelector(".smooth-scroll").style.transform
//         ? "transform"
//         : "fixed",
// });

// let tl = gsap.timeline({ defaults: { ease: "none" }});
// tl.to(".box", { rotation: 360, duration: 3 });

// ScrollTrigger.create({
//     trigger: ".box",
//     start: "50% 50%",
//     end: "+=300",
//     scroller: ".smooth-scroll",
//     animation: tl,
//     scrub: true,

// });

// ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
// ScrollTrigger.refresh();



// register plugins
gsap.registerPlugin(EasePack)

// hue animation
gsap.to('.gradient-text', {
    filter : 'hue-rotate(-360deg)',
    duration: 3,
    ease: "rough",
    yoyo: true,
    stagger: .3,
    repeat: -1,
})


// animation of navbar button
let ease = "linear"
let duration = .4
let tl = gsap.timeline({ defaults: {transform: "scaleX(1.5)", transformOrigin : "center", ease: ease, repeat: -1,yoyo: true, filter : 'hue-rotate(-200deg)', filter : 'hue-rotate(-120deg)',} } )
gsap.set('.line1',{transform: "scaleX(.4)"})
gsap.set('.line2',{transform: "scaleX(1)"})
gsap.set('.line3',{transform: "scaleX(.7)"})
tl.to('.line1', {duration:duration + .2})
  .to('.line2',{duration:(duration - .3)})
  .to('.line3',{duration:(duration + .1)})
  .play()

// ! animation on menu when click
let navBtn = document.querySelector('.navbar-button')
let tls = gsap.timeline({defaults: {duration:.3, transformOrigin : "center center"}})
tls.to('.nav-line',{transform: "scaleX(1)", opacity:1})
   .to('.line2', {transform: "translate(100%)", opacity:0, transformOrigin : "right"})
   .to('.line1', {transform: "translateY(6.4px) rotate(90deg)"})
   .to('.line3', {transform: "translateY(-5px)"})
   .to('.navbar-button', {transform: "rotate(45deg)"})
tls.pause()

// scale navbar
let moveBG = gsap.timeline()
moveBG.to(".line",{
    ease: "power4",
    width: "100%",
    duration: 1.5,
    delay: 1.2
}).pause()

// controle nav button
navBtn.addEventListener('click', ()=>{
    if (tl.paused()){
        tls.reverse(0)
        tl.play()
        moveBG.reverse(0)
    }else{
        tl.pause()
        tls.play()
        moveBG.play()
    }
})


// animate reviews
function animateReviews(duration){
    let row_tl = gsap.timeline({defaults:{duration: duration, ease:'Power1.easeInOut'}})
    let row_tl1 = gsap.timeline({defaults:{duration: duration, ease:'Power1.easeInOut'}})

    let windowWidth = window.innerWidth

    let row1 = Array.from(document.querySelectorAll('.reviews .row'))[0]
    let row2 = Array.from(document.querySelectorAll('.reviews .row'))[1]

    let moveBy = windowWidth - row1.scrollWidth
    let moveBy2 = windowWidth - row2.scrollWidth

    row_tl.to(row1, {x: moveBy - 32}).to(row1,{x: 0}).repeat(-1)

    gsap.set(row2, {x: moveBy2 - 32})

    row_tl1.to(row2,{x: 0}).to(row2, {x: moveBy - 32}).repeat(-1)

    row1.addEventListener('mouseover', ()=>{
        row_tl.pause()
    })

    row1.addEventListener('mouseleave', ()=>{
        row_tl.resume()
    })

    row2.addEventListener('mouseover', ()=>{
        row_tl1.pause()
    })

    row2.addEventListener('mouseleave', ()=>{
        row_tl1.resume()
    })
}
animateReviews(10)



// animate images scrolling
function animateImgScroll(duration){
    let imgs = Array.from(document.querySelectorAll('.img-hover'))
    imgs.forEach((img)=>{
        img.addEventListener('mouseover', ()=>{
            gsap.to(img, {
                objectPosition: '50% 100%',
                duration: duration
            })
        })
        
        img.addEventListener('mouseleave', ()=>{
            gsap.to(img, {
                objectPosition: '50% 0%',
                duration: duration
            })
        })
    })
}
animateImgScroll(3)




// ! ------------- audio animation start -------------
const mp3 = document.querySelector('#audio')

// chage defaults
gsap.defaults({duration: .2})

const audioBox = document.querySelector('.audio')


gsap.set('.toggle_off', {opacity: 0})
const audioTimeline = gsap.timeline()
audioTimeline.to('.toggle', {y:'-50%'})
             .to('.toggle_on', {opacity: 0}, '-=.2')
             .to('.toggle_off', {opacity: 1}, '-=.2').pause()


audioBox.addEventListener('click', ()=>{    
    if (mp3.paused && mp3.currentTime > 0 && !mp3.ended) {
        mp3.play();
        audioTimeline.reverse()
    } else {
        mp3.pause();
        audioTimeline.play()
    }
})
// ! ------------- audio animation end -------------


// cursor animation
function cursorAnimation(){
    // ! ------------- cursor animation start -------------
    gsap.set(".ball", {xPercent: -50, yPercent: -50});

    let xTo = gsap.quickTo(".ball", "x", {duration: 0.6, ease: "power3"})
    let yTo = gsap.quickTo(".ball", "y", {duration: 0.6, ease: "power3"})


    window.addEventListener("mousemove", (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
    });
    // ! ------------- cursor animation end -------------
}
cursorAnimation()