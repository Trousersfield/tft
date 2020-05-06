import React from 'react'
import { GoChevronRight, GoChevronLeft } from 'react-icons/go'

let debounce = null

class News extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      numberOfNewsCards: 0,
      news: [],
      slidingWindow: { start: -1, end: -1 },
      displayedNews: []
    }
  }

  componentDidMount () {
    this.setNewsCards()
    this.loadNews()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)

    if (debounce) clearTimeout(debounce)
  }

  handleResize = () => {
    console.log('handling resize')
    if (debounce) clearTimeout(debounce)
    console.log('actually doing sth')

    debounce = setTimeout(async () => {
      await this.setNewsCards()
      this.slideNews(true, true)
      this.debounce = null
    }, 500)
  }

  async loadNews () {
    console.log('loading news')
    this.setState({ news: [1, 2, 3, 4] }, () => this.slideNews())
  }

  async setNewsCards () {
    const box = document.getElementById('news-container').getBoundingClientRect()
    // take left and right navigation button + spacings into account
    const newsContainerWidth = box.width - 100
    // w-128: 32em and default pixel size = 16px --> 16x32 = 512px
    const numberOfNewsCards = Math.floor(newsContainerWidth / (16 * 32))
    console.log('num of cards: ', numberOfNewsCards)
    new Promise(resolve => {
      this.setState({ numberOfNewsCards }, () => { resolve() })
    })
  }

  slideNews (right = true, keep = false) {
    console.log('sliding news')
    const news = this.state.news
    const numberOfNewsCards = this.state.numberOfNewsCards < news.length ?
      this.state.numberOfNewsCards : news.length

    let slidingWindow = this.state.slidingWindow

    // init
    if (slidingWindow.start === -1) {
      Object.assign(slidingWindow, { start: 0, end: numberOfNewsCards })
    } else if (keep) {
      Object.assign(slidingWindow, {
        start: slidingWindow.start,
        end: slidingWindow.start + numberOfNewsCards
      })
      // need to check if keep element is last element!!!
    } else {
      // move sliding window
      if (right) {
        slidingWindow.start = slidingWindow.end
        slidingWindow.end += numberOfNewsCards
        // check if out of bounds
        if (slidingWindow.end >= news.length) {
          const overflow = slidingWindow.end - news.length + 1
          slidingWindow.end = overflow - 1
          // slidingWindow.end -= news.length
          if (slidingWindow.start >= news.length) {
            slidingWindow.start = slidingWindow.end - numberOfNewsCards
          }
        }
      } else {
        slidingWindow.end = slidingWindow.start
        slidingWindow.start -= numberOfNewsCards
        // check if out of bounds
        if (slidingWindow.start < 0) {
          const overflow = slidingWindow.start * -1
          slidingWindow.start = news.length - overflow
          //
          if (slidingWindow.end < 0) {
            slidingWindow.end = slidingWindow.start + numberOfNewsCards
          }
        }
      }
    }
    console.log('sliding window: ', slidingWindow)

    const displayedNews = slidingWindow.start <= slidingWindow.end ?
      news.slice(slidingWindow.start, slidingWindow.end) :
      (news.slice(slidingWindow.start, news.length).concat(news.slice(0, slidingWindow.end)))

    this.setState({ slidingWindow, displayedNews })
  }

  render () {
    const { displayedNews } = this.state

    return (
      <div
        id="news-container"
        className="relative flex flex-no-wrap justify-center"
      >
        <SlideNavButton
          direction="left"
          onSlide={() => this.slideNews(false)}
        />
        {displayedNews.map((content, index) =>
          <StatCard key={'news-' + index} content={content}/>
        )}
        <SlideNavButton
          direction="right"
          onSlide={() => this.slideNews()}
        />
      </div>
    )
  }
}

const StatCard = (props) => {
  const { content } = props

  return (
    <div className="flex-none flex flex-col shadow-lg m-2 h-56 w-128">
      <div className="w-full h-12 bg-indigo-400 flex flex-no-wrap items-center
        text-white text-lg font-semibold">
        <p className="mx-auto">Headline</p>
      </div>
      <p>{content}</p>
    </div>
  )
}

const SlideNavButton = (props) => {
  const { direction } = props

  return (
    <button
      className="w-10 h-10 my-auto bg-gray-200 rounded-lg text-center
        hover:bg-gray-400"
      onClick={props.onSlide}
    >
      {direction === 'left' ?
        <GoChevronLeft className="m-auto" /> :
        <GoChevronRight className="m-auto" />
      }
    </button>
  )
}

export default News