import Link from "next/link";
import style from "../../styles/both/footer.module.css";

export default function footer() {
  return (
    <div className={style.main}>
      <div className={style.sec}>
        <Link href="/aboutus">About Us</Link>
        <a href="mailto:sinaheidari2000">Contact Us</a>
      </div>
      <p>&copy; 2022 Charkhoone, All Rights Reserved.</p>
    </div>
  );
}
