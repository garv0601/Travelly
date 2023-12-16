TweenMax.from(".logo1",2,{
    opacity:0,
    x:-80,
    ease: Expo.easeInOut 
  })

  TweenMax.staggerFrom(".navbar ul li", 2, {
    opacity: 0,
    y: -50,
    ease: Power3.easeInOut
  }, 0.08)

  TweenMax.from(".action_btn",2,{
    opacity:0,
    x:80,
    ease: Expo.easeInOut 
  })