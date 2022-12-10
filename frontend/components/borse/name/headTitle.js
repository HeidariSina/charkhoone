import React from "react";
import style from "../../../styles/borse/name/headTitle.module.css";

export default function headTitle({ fullname, name, group }) {
  return (
    <div className={style.main}>
      <p className={style.head}>
        ({name}) {fullname}
      </p>
      <p>گروه شماره {group}</p>
    </div>
  );
}
