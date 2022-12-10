import style from "../../styles/both/searchbar.module.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/router";

export default function SearchBar() {
  const router = useRouter();
  const [name, setname] = useState("");
  const change = (e) => {
    setname(e.target.value);
  };
  const submit = (e) => {
    e.preventDefault();
    setname("");
    router.push(`/crypto/search?name=${name.toLowerCase()}`);
  };
  return (
    <div className={style.div}>
      <form className={style.form} onSubmit={submit}>
        <FaSearch className={style.icon} />
        <input
          value={name}
          type="text"
          placeholder="CryptoCurrency"
          className={style.input}
          onChange={change}
        />
      </form>
    </div>
  );
}
