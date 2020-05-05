import React from 'react'
import { GoChevronRight, GoChevronLeft } from 'react-icons/go'

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
  }

  async loadNews () {
    console.log('loading news')
    this.setState({ news: [1, 2, 3, 4] },() => this.slideNews())
  }

  setNewsCards () {
    const box = document.getElementById('news-container').getBoundingClientRect()
    // w-128: 32em and default pixel size = 16px --> 16x32 = 512px
    const numberOfNewsCards = Math.floor(box.width / (16 * 32))
    this.setState({ numberOfNewsCards })
  }

  slideNews (right = true) {
    console.log('sliding')
    const news = this.state.news
    const numberOfNewsCards = this.state.numberOfNewsCards < news.length ?
      this.state.numberOfNewsCards : news.length

    let slidingWindow = this.state.slidingWindow

    // init
    if (slidingWindow.start === -1) {
      Object.assign(slidingWindow, { start: 0, end: numberOfNewsCards })
    } else {
      // move sliding window
      if (right) {
        slidingWindow.start = slidingWindow.end + 1
        slidingWindow.end += (numberOfNewsCards + 1)
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
        slidingWindow.end = slidingWindow.start -1
        slidingWindow.start -= (numberOfNewsCards + 1)
        // check if out of bounds
        if (slidingWindow.start < 0) {
          const overflow = slidingWindow.start * -1
          slidingWindow.start = news.length - 1 - overflow
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
      <div id="news-container" className="relative flex flex-no-wrap justify-center">
        {displayedNews.map((content, index) =>
          <StatCard key={'news-' + index} content={content}/>
        )}
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
        <p>{content}</p>
      </div>
    </div>
  )
}

export default News