import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { stateProps } from '../../redux/reducers/productReducer';
import { RootState } from '../../redux/store';
import './style/PostCarouse2.scss';

interface Post {
  id: number;
  title: string;
  imageUrl: string;
}

const POSTS: Post[] = [
  {
    id: 1,
    title: 'Post 1',
    imageUrl: 'https://photos5.appleinsider.com/gallery/51971-103179-apple-products-sale-xl.jpg',
  },
  {
    id: 2,
    title: 'Post 2',
    imageUrl: 'https://www.feedough.com/wp-content/uploads/2019/07/hostinger-black-friday-sale.webp',
  },
  {
    id: 3,
    title: 'Post 3',
    imageUrl: 'https://img.paisawapas.com/ovz3vew9pw/2023/01/03165919/tatacliq-PaisaWapas-Deal.jpg',
  },
];
const ITEMS_PER_PAGE = 1;
const AUTO_CYCLE_INTERVAL = 4000;

const  PostCarouse2 = () => {
  const [currentPage, setCurrentPage] = useState(1);


  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPage(currentPage => currentPage === POSTS.length ? 1 : currentPage + 1);
    }, AUTO_CYCLE_INTERVAL);

    return () => clearInterval(intervalId);
  }, []);

  const handlePageClick = (pageNum: number) => {
    setCurrentPage(pageNum);
  }

  const totalPages = Math.ceil(POSTS.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPosts = POSTS.slice(startIndex, endIndex);

  return (
    <div className="app">
      {currentPosts.map((post) => (
        <div key={post.id} className="post">
          <img className='app__image' src={post.imageUrl} alt={post.title} />
          
        </div>
      ))}
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PostCarouse2;
