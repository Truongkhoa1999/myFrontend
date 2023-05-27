import React, { useState } from 'react'
import './style/PostCarouse2.scss'

interface Post {
  id: number
  title: string
  imageUrl: string
}

const POSTS: Post[] = [
  {
    id: 1,
    title: 'Post 1',
    imageUrl: 'https://www.jimms.fi/Content/Images/frontpage_carousel/230502_Asus_FP.jpg',
  },
  {
    id: 2,
    title: 'Post 2',
    imageUrl: 'https://www.jimms.fi/Content/Images/frontpage_carousel/230214_XSTRM.jpg',
  },
  {
    id: 3,
    title: 'Post 3',
    imageUrl: 'https://www.jimms.fi/Content/Images/frontpage_carousel/230404_Nitro_FP.jpg',
  },
]
const ITEMS_PER_PAGE = 1
const AUTO_CYCLE_INTERVAL = 4000

const PostCarousel = () => {
  const [currentPage, setCurrentPage] = useState(1)

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPage((currentPage) => (currentPage === POSTS.length ? 1 : currentPage + 1))
    }, AUTO_CYCLE_INTERVAL)

    return () => clearInterval(intervalId)
  }, [])

  const handlePageClick = (pageNum: number) => {
    setCurrentPage(pageNum)
  }

  // const totalPages = Math.ceil(POSTS.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentPosts = POSTS.slice(startIndex, endIndex)

  return (
    <div className="app">
      {currentPosts.map((post) => (
        <div key={post.id} className="post">
          <img className="app__image" src={post.imageUrl} alt={post.title} />
        </div>
      ))}
    </div>
  )
}

export default PostCarousel