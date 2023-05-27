import './style/NobleChair.scss'
import Chair2 from '../../assets/noblechairs/349574-ig800gg-removebg-preview.png'
import Chair1 from '../../assets/noblechairs/366981-ig800gg-removebg-preview.png'
import Chair3 from '../../assets/noblechairs/355577-ig800gg-removebg-preview.png'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ProductProps } from '../../type/Product/ProductProps'
import { RootState } from 'react-three-fiber'
import { handleClick } from '../../utils/productUtil'
import { useEffect, useState } from 'react'

export default function NobleChair({ products }: { products: ProductProps[] }) {
  const [chair1Status, setChair1Status] = useState(false)
  const [chair2Status, setChair2Status] = useState(false)
  const [chair3Status, setChair3Status] = useState(false)

  useEffect(() => {
    const chair1Data = products.filter((c) => c.id === id1)
    console.log(chair1Data, 'this is chair 1')
    if (chair1Data.some((e) => e.removed === false)) {
      setChair1Status(false)
    } else {
      setChair1Status(true)
    }

    const chair2Data = products.filter((c) => c.id === id2)
    if (chair2Data.some((e) => e.removed === false)) {
      setChair2Status(false)
    } else {
      setChair2Status(true)
    }

    const chair3Data = products.filter((c) => c.id === id3)
    if (chair3Data.some((e) => e.removed === false)) {
      setChair3Status(false)
    } else {
      setChair3Status(true)
    }
  }, [products])

  const id1 = '200814b3-4da8-4c44-8c3f-68ac3069c3ab'
  const statId1 = 'e9de3927-1d8b-4ce6-bf8c-5fe2086edfa4'
  const id2 = 'ee9f2726-aea9-4078-80fc-0e7a99520769'
  const statId2 = '2b85bb9e-9743-4a87-b024-d889326c602c'
  const id3 = '9028f02a-d787-43a4-8feb-1096fd950b2f'
  const statId3 = '476acf91-41cb-4313-84da-0371fa652fcf'

  return (
    <div className="products_container">
      <div className="upper">
        <div className="chair1">
          {chair1Status ? (
            <img src={Chair1} className="disabled" alt="Chair 1 (disabled)" />
          ) : (
            <Link to={`/product/${id1}`} onClick={() => handleClick(statId1)}>
              <img src={Chair1} alt="Chair 1" />
            </Link>
          )}
        </div>
        <div className="chair2">
          {chair2Status ? (
            <img src={Chair2} className="disabled" alt="Chair 2 (disabled)" />
          ) : (
            <Link to={`/product/${id2}`} onClick={() => handleClick(statId2)}>
              <img src={Chair2} alt="Chair 2" />
            </Link>
          )}
        </div>
        <div className="chair3">
          {chair3Status ? (
            <img src={Chair3} className="disabled" alt="Chair 3 (disabled)" />
          ) : (
          
            <Link to={`/product/${id3}`} onClick={() => handleClick(statId3)}>
            <img src={Chair3} alt="Chair 3" />
          </Link>
          )}
        </div>
      </div>
      <div className="below">
        <h1>NOBLE CHAIRS COLLECTION</h1>
      </div>
    </div>
  )
}
