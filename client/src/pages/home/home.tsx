import { Link } from "react-router-dom"
import { BsArrowRightShort, BsSearchHeart } from "react-icons/bs"
import { TfiLocationPin } from "react-icons/tfi"
import { Avatar } from "@/components/avatar"
import Image from "@/assets/images/doctor-patient.jpg"
import { Button } from "@/components/button"
import style from "./style/home.module.css"
import { About } from "../about/about"

const Home = () => {
  return (
    <>
      <section className={style.bg}>
        <div className={style.container}>
          <h1 className={style.title}>Find the nearest hospital to you and make an appointment</h1>
          <p className={style.subtitle}>Discover Your Perfect Care: Find Your Hospital, Anytime, Anywhere!</p>
          <Button children={<span className={style.cta}>GET STARTED</span>} />
          <Link to="#" className={style.link}>Learn more <BsArrowRightShort className={style.icon} /></Link>
        </div>
        <div className={style.img}>
          <Avatar
            image={Image}
            alt="Doctor and patient"
            style={{ width: "100%", height: "100%", borderRadius: "3rem", objectFit: "cover" }}
          />
        </div>
        <div className={style.search}>
          <h2 className={style.heading}>Find a nearby hospital</h2>
          <label htmlFor="searchHospital" className={style.label}>
            <TfiLocationPin className={style.icon_location} />
            <input type="text" placeholder="Enter your location" className={style.input} />
            <BsSearchHeart className={style.icon_search} />
          </label>
        </div>
      </section>
      <About />
    </>
  );
}

export default Home