import style from "../../styles/both/searchbar.module.css";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import Router from 'next/router';

export default function SearchBar() {
  const [name, setname] = useState("");
  const change = (e) => {
    setname(e.target.value);
  };
  const submit = (e) => {
    e.preventDefault();
    setname("");
    Router.push(({pathname:"/search" , query:{name : name}}))
  };
  return (
    <div className={style.div}>
      <form className={style.form} onSubmit={submit}>
        <FaSearch className={style.icon} />
        <input
          value={name}
          type="text"
          placeholder="Search"
          className={style.input}
          onChange={change}
        />
      </form>
    </div>
  );
}
