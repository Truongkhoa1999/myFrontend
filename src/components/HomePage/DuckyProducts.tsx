import { Link } from "react-router-dom";
import { ProductProps } from "../../type/Product/ProductProps";
import './style/HomePage.scss'
export default function duckyProducts ({duckyProducts, handleClick}:{duckyProducts:ProductProps[], handleClick: (id:string) =>void}) {
    return (
        <div className="ducky_container">
        <img
          className="ducky_ads"
          src="https://files.pccasegear.com/UserFiles/Ducky-Keyboards-Category-Banner.jpg"
        ></img>
        <div className="ducky_posts">
          {duckyProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <div
                className="card"
                 onClick={() =>handleClick(product.statics.statId)}
              >
                <img src={product.thumbnail} />
                {/* <h3>{limitTitleWords(product.title, 4)}</h3> */}
                <div className="information">
                  <h2>{product.price} €</h2>
                  {/* <p>{product.quantity}</p> */}
                </div>
                <button
                  disabled={product.quantity === 0}
                  className={product.quantity === 0 ? 'disabled' : ''}
                   onClick={() =>handleClick(product.statics.statId)}
                >
                  ADD TO BASKET
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
}