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
      sticky.scrollLeft = (scrollWidth / verticalScrollHeight) * -scrolled * 0.8
      scrollerBackground.style.transform = `translateX(${sticky.scrollLeft}px)`
    }
  }
}

const carrouselContainer = document.querySelector('.skills__cards_carrousel')

const swipeHandler = (element, right, left) => {
  let start, end
  element.addEventListener('touchstart', (e) => {
    start = e.changedTouches[0].clientX
  })
  element.addEventListener('touchend', (e) => {
    end = e.changedTouches[0].clientX
    if (start > end) {
      right()
    }
    if (start < end) {
      left()
    }
  })
}

let carrouselHandler = (isRight) => {
  const element = document.querySelector('.skills__cards')
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

swipeHandler(carrouselContainer, toRight, toLeft)

generateStars()
horizontalScroller()

const modal = document.querySelector('.indentity__modal')

const handleOutside = (e) => {
  const modalContent = document.querySelector('.indentity__modal__content')
  if (e.target != modalContent) {
    closeModal()
    modal.removeEventListener('click', handleOutside)
  }
}

const createOutside = () => {
  modal.addEventListener('click', handleOutside)
}

const openModal = (e) => {
  modal.classList.add('open')
  const element = e.target.src ? e.target : e.target.children[0]
  if (element.alt == 'Estudio olmedo') {
    modal.children[0].innerHTML = `
    <iframe
    src="./images/manual-de-marca.pdf"
    width="80%"
    height="80%"
    style="border: none"
    class="indentity__modal__content"
    >
    </iframe>`
  } else {
    modal.children[0].innerHTML = `
    <img 
    class="indentity__modal__content" 
    src=${element.src} 
    alt=${element.alt} 
    >
    `
  }

  gsap.from('.indentity__modal__content', {
    opacity: 0,
    scale: 0.5,
    duration: 0.5,
  })
  createOutside()
}

const closeModal = () => {
  modal.removeEventListener('click', handleOutside)
  modal.classList.remove('open')
}

const placeItems = (index, images, query) => {
  const carrousel = document.querySelectorAll(query)
  let currentIndex = index % (images.length - 2) || 0

  carrousel.forEach((element, index) => {
    element.children[0].addEventListener('click', openModal)
    const container = element.children[0].children
    element.style.transform = 'scale(1.1)'
    setTimeout(() => {
      for (let i = 0; i < container.length; i++) {
        container[i].src = images[index + currentIndex].src
        container[i].alt = images[index + currentIndex].alt
      }
      element.style.transform = 'scale(1)'
    }, 100)
  })

  return currentIndex
}

const images = [
  { src: './images/identity/Kung-fu-panda.webp', alt: 'kung fu panda' },
  { src: './images/identity/TLOU.webp', alt: 'the last of us' },
  { src: './images/identity/Monster.webp', alt: 'moster' },
  { src: './images/identity/Poker.webp', alt: 'poker' },
  { src: './images/identity/Estudio-Olmedo.webp', alt: 'Estudio olmedo' },
  { src: './images/identity/Kung-fu-panda.webp', alt: 'kung fu panda' },
  { src: './images/identity/TLOU.webp', alt: 'the last of us' },
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

swipeHandler(
  document.querySelector('.indentity__carrousel__container'),
  identityOnRight,
  identityOnLeft
)

document.addEventListener('DOMContentLoaded', (event) => {
  gsap.registerPlugin(SplitText)
  gsap.registerPlugin(ScrollTrigger)
})

const cascadeAnimation = (parent, elements, animations, delay) => {
  const timeLine = gsap.timeline({
    scrollTrigger: {
      trigger: '.main',
      toggleActions: 'play none none none',
      start: 'top center',
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
  ['.invitado__texto', '.recorte6'],
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
    onEnter: () => {
      placeItems(identityIndex, images, '.indentity__card')
    },
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

const campaignVideoOne = document.getElementById('campaign1').children[1]
cascadeAnimation(
  {
    trigger: '#campaign1',
    start: 'top center',
    end: 'center top+=100',
    onEnter: (e) => {
      campaignVideoOne.play()
      campaignVideoOne.muted = false
    },
    onLeave: () => {
      campaignVideoOne.pause()
    },
    onEnterBack: () => {
      campaignVideoOne.play()
    },
    onLeaveBack: () => {
      campaignVideoOne.pause()
    },
  },
  ['#campaign1'],
  [{ y: 200 }],
  [0]
)
const campaignVideoTwo = document.getElementById('campaign2').children[0]
cascadeAnimation(
  {
    trigger: '#campaign2',
    start: 'top center',

    end: 'bottom-=200 top+=100',
    onEnter: (e) => {
      campaignVideoTwo.play()
      campaignVideoTwo.muted = false
    },
    onLeave: () => {
      campaignVideoTwo.pause()
    },
    onEnterBack: () => {
      campaignVideoTwo.play()
    },
    onLeaveBack: () => {
      campaignVideoTwo.pause()
    },
  },
  ['#campaign2'],
  [{ y: 200 }],
  [0]
)

campaignVideoOne.volume = 0.05
campaignVideoTwo.volume = 0.05

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

  element.addEventListener('touchmove', (e) => {
    outerRY(
      gsap.utils.interpolate(
        -short * 2,
        short * 2,
        e.touches[0].clientX / window.innerWidth
      )
    )
    innerX(
      gsap.utils.interpolate(
        -long * 2,
        long * 2,
        e.touches[0].clientX / window.innerWidth
      )
    )
  })

  element.addEventListener('touchend', (e) => {
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

slides.forEach((slide, i) => {
  slide.classList.add('graphics__carrousel__card-abs')
  gsap.set(slide.children, { opacity: i === 0 ? 1 : 0 })
  const video = slide.children[0].children[0]
  video.volume = 0.05
  gsap.to(video, {
    scrollTrigger: {
      trigger: video,
      start: 'top bottom-=200',
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
})

next.addEventListener('click', () => changeSlide(1))
prev.addEventListener('click', () => changeSlide(-1))

swipeHandler(
  document.querySelector('.graphics__carrousel'),
  () => changeSlide(1),
  () => changeSlide(-1)
)

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
