import './style/Footer.scss'
export default function Footer() {
  return (
    <div className='footer_container'>
      <div className="upper">
        <div>
        <h2>Newsletter</h2>
        <p>To recieve the newest announcement and promotion information </p>
        </div>
        <input placeholder='leave your email address here'></input>
      </div>
      <div className="lower">
        <div className="about">
          <h3>About us</h3>
          <p>The official ecommerce from Khoa FS project</p>
        </div>
        <div className="contact">
          <h3>Contact Information</h3>
          <p>0413108118</p>
        </div>
        <div className="customer">
          <h3>Customer service</h3>
          <p>Sorry we dont have physical sales points, we now do online shopping</p>
        </div>
      </div>
      <div className="bottom">
        <p>Copyright © 2023 Khoa's FE project - Images and data source: Jimms | Designed by Khoa</p>
      </div>
    </div>
  )
}
