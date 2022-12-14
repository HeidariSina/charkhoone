import style from "../../styles/both/footer.module.css";
import Link from "next/link"

export default function footer() {
  return (
    <div className={style.main}>
      <div className={style.sec}>
        <Link href="/aboutus">درباره ی ما</Link>
        <a href="mailto:sinaheidari2000">تماس با ما</a>
      </div>
      <p>&copy; 2022 Charkhoone, All Rights Reserved.</p>
    </div>
  );
}
