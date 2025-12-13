'use strict'

const generateStars = () => {
  const numStars = 200
  for (let i = 0; i < numStars; i++) {
    let star = document.createElement('div')
    let background = document.querySelector('.background-container')
    star.classList.add('star')

    let size = Math.random() * 7 + 2
    star.style.width = size + 'px'
    star.style.height = size + 'px'

    star.style.top = Math.random() * window.innerHeight - 20 + 'px'
    star.style.left = Math.random() * window.innerWidth - 20 + 'px'
    background.appendChild(star)
  }
}

const horizontalScroller = () => {
  document.addEventListener('scroll', horizontalScroll)

  let sticky = document.querySelector('.scroller')
  let scrollerContainer = document.querySelector('.scroller__container')
  let scrollerBackground = document.querySelector(
    '.participantes__background__container'
  )

  let scrollWidth = sticky.scrollWidth

  function horizontalScroll() {
    let stickyPosition = sticky.getBoundingClientRect().top
    if (stickyPosition > 1) {
      return
    } else {
      let scrolled = scrollerContainer.getBoundingClientRect().top
      let verticalScrollHeight =
        scrollerContainer.getBoundingClientRect().height -
        sticky.getBoundingClientRect().height
      sticky.scrollLeft =
        (scrollWidth / verticalScrollHeight) * -scrolled * 0.85
      scrollerBackground.style.transform = `translateX(${sticky.scrollLeft}px)`
    }
  }
}

let carrouselHandler = (isRight) => {
  let carrouselContainer = document.querySelector('.skills__cards_carrousel')
  let element = document.querySelector('.skills__cards')
  let elementWIdth = element.getBoundingClientRect().width
  let margin = window.getComputedStyle(element).marginLeft

  if (isRight) {
    carrouselContainer.scrollLeft += elementWIdth + parseInt(margin) * 2
  } else {
    carrouselContainer.scrollLeft -= elementWIdth + parseInt(margin) * 2
  }
}

let toRight = () => {
  carrouselHandler(true)
}

let toLeft = () => {
  carrouselHandler(false)
}

generateStars()
horizontalScroller()

const placeItems = (index, images, query) => {
  const carrousel = document.querySelectorAll(query)
  let currentIndex = index % (images.length - 2) || 0

  carrousel.forEach((element, index) => {
    const container = element.children[0].children
    element.style.transform = 'scale(1.1)'
    setTimeout(() => {
      for (let i = 0; i < container.length; i++) {
        container[i].src = images[index + currentIndex]
      }
      element.style.transform = 'scale(1)'
    }, 100)
  })

  return currentIndex
}

const images = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ58l8qJHkSvuxuD5-_a84Eev_0WIrpZKU9EA&s',
  './tlou.jpg',
  'https://www.originalfilmart.com/cdn/shop/products/KungFuPanda_2008_teaser_original_film_art_5000x.webp?v=1678484028',
  'https://i5.walmartimages.com/seo/Red-Dead-Redemption-2-Vedio-Game-Poster-and-Prints-Unframed-Wall-Art-Gifts-Decor-12-x-18-inch-30cm-x-46cm_3e60832e-babb-495b-8133-fb01a92092a7.abc48332075e6c8a8c190b8ce056b9f3.jpeg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3MeGyB86AkHf17ORknVpu_Nc7pI94aNVXhg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ58l8qJHkSvuxuD5-_a84Eev_0WIrpZKU9EA&s',
  './tlou.jpg',
]

let identityIndex = 0

const identityOnRight = () => {
  identityIndex++
  identityIndex = placeItems(identityIndex, images, '.indentity__card')
}

const identityOnLeft = () => {
  if (identityIndex < 1) {
    identityIndex = images.length - 2
  }
  identityIndex--
  identityIndex = placeItems(identityIndex, images, '.indentity__card')
}

identityOnRight()

document.addEventListener('DOMContentLoaded', (event) => {
  gsap.registerPlugin(SplitText)
  gsap.registerPlugin(ScrollTrigger)
})
gsap.registerPlugin(SplitText)
gsap.registerPlugin(ScrollTrigger)

const cascadeAnimation = (parent, elements, animations, delay) => {
  const timeLine = gsap.timeline({
    scrollTrigger: {
      trigger: '.main',
      toggleActions: 'play none none none',
      start: 'top center',
      // markers: true,
      ...parent,
    },
  })

  gsap.utils.toArray(elements).forEach((item, index) => {
    timeLine.from(
      item,
      { opacity: 0, duration: 1.2, ...animations[index] },
      delay[index]
    )
  })
}

cascadeAnimation(
  {
    trigger: '.invitado',
    start: 'top center+=100',
  },
  ['.invitado__texto', '.invitado__card'],
  [{ x: 200 }, { scale: 0.2 }],
  [0, '-=0.5']
)

cascadeAnimation(
  {
    trigger: '.skills',
    start: 'top center+=200px',
  },
  ['.first', '.second'],
  [{ y: -200 }, { x: 100 }],
  [0, '+=0']
)

cascadeAnimation(
  {
    trigger: '.indentity',
  },
  ['.indentity__titles__container', '.indentity__carrousel__container'],
  [{ y: -200 }, { scale: 0.2 }],
  [0, '-=0.5']
)

cascadeAnimation(
  {
    trigger: '.models3d',
    start: 'top center+=100',
  },
  ['.model3d__title', '.model3d__subtitle'],
  [{ scale: 0.2 }, { scale: 0.2 }],
  [0, '-=0.5']
)

const models = document.querySelectorAll('.model3d__container')

for (let i = 0; i < models.length; i++) {
  cascadeAnimation(
    {
      trigger: `#model${i + 1}`,
      start: 'top bottom-=200px',
    },
    [`#model${i + 1}`],
    [{ scale: 0.2 }],
    [0]
  )
}

cascadeAnimation(
  {
    trigger: '.extras',
  },
  ['.extras__background', '.extras__title', '.extras__card'],
  [{}, { scale: 0.2 }, { y: 200 }, { y: 200 }, { y: 200 }],
  [0, '-=1.2', '-=0.5', '-=0.5', '-=0.5']
)

const container3d = document.querySelectorAll('.model3d__container')

gsap.set('.model3d__container', { perspective: 900 })

const outerRX = gsap.quickTo('.model3d', 'rotationX', { ease: 'power3' })
const outerRY = gsap.quickTo('.model3d', 'rotationY', { ease: 'power3' })
const innerX = gsap.quickTo('.model3d__name', 'x', { ease: 'power3' })
const innerY = gsap.quickTo('.model3d__name', 'y', { ease: 'power3' })
const short = 15
const long = 80

container3d.forEach((element) => {
  element.addEventListener('pointermove', (e) => {
    outerRX(gsap.utils.interpolate(short, -short, e.y / window.innerHeight))
    outerRY(gsap.utils.interpolate(-short, short, e.x / window.innerWidth))
    innerX(gsap.utils.interpolate(-long, long, e.x / window.innerWidth))
    innerY(gsap.utils.interpolate(-long, long, e.y / window.innerHeight))
  })

  element.addEventListener('pointerleave', (e) => {
    outerRX(0)
    outerRY(0)
    innerX(0)
    innerY(0)
  })
})

const slides = gsap.utils.toArray('.graphics__carrousel__card')
const prev = document.querySelector('#graphics-left')
const next = document.querySelector('#graphics-right')
let currentIndex = 0

slides.forEach(
  (slide, i) => {
    slide.classList.add('graphics__carrousel__card-abs')
    gsap.set(slide.children, { opacity: i === 0 ? 1 : 0 })
    const video = slide.children[0].children[0]
    video.volume = 0.05
    gsap.to(video, {
      scrollTrigger: {
        trigger: video,
        markers: true,
        start: 'top bottom-=100',
        end: 'bottom top+=100',
        onEnter: () => {
          if (i === currentIndex) {
            video.play()
          }
          slide.children[0].children[0].muted = false
        },
        onLeave: () => {
          video.pause()
        },
        onEnterBack: () => {
          if (i === currentIndex) {
            video.play()
          }
        },
        onLeaveBack: () => {
          video.pause()
        },
      },
    })
  }
)

next.addEventListener('click', () => changeSlide(1))
prev.addEventListener('click', () => changeSlide(-1))

function changeSlide(dir) {
  const oldLayers = slides[currentIndex].children

  currentIndex = gsap.utils.wrap(0, slides.length, (currentIndex += dir))

  const newLayers = slides[currentIndex].children
  gsap.killTweensOf([oldLayers, newLayers])

  document.querySelectorAll('.motions').forEach((video) => video.pause())

  gsap
    .timeline({ defaults: { ease: 'expo' } })
    .to(
      oldLayers[0],
      {
        duration: 0.3,
        rotateY: dir < 0 ? -75 : 75,
        scale: 0.6,
        ease: 'power2.in',
      },
      0
    )
    .to(
      oldLayers,
      {
        duration: 0.3,
        opacity: 0,
        ease: 'power2.in',
      },
      0
    )
    .to(
      newLayers,
      {
        opacity: 1,
        ease: 'power1.in',
        stagger: 0.2,
      },
      0.2
    )
    .fromTo(
      newLayers[0],
      {
        rotateY: dir < 0 ? 90 : -90,
        scale: 0.6,
      },
      {
        rotateY: 0,
        scale: 1,
      },
      0.3
    )
  newLayers[0].children[0].play()
  newLayers[0].parentNode.classList.add('higher')
  oldLayers[0].parentNode.classList.remove('higher')
}
