import style from "../../../styles/borse/group/list.module.css";
import { FaFrown } from "react-icons/fa";

export default function list({ data, group }) {
  if (data.length == 0) {
    return (
      <div className={style.div}>
        <FaFrown className={style.icon} />
        <p className={style.p}>
          متاسفانه در گروه {group} اطلاعات شرکتی پیدا نشد
        </p>
      </div>
    );
  } else {
    return (
      <div className={style.main}>
        <h1 className={style.header}>{group} لیست شرکت های گروه</h1>
        <table className={style.pag}>
          <tbody key="form">
            <tr className={style.trr}>
              <th className={style.hiddenscd}>بیشترین قیمت</th>
              <th className={style.hiddenscd}>کمترین قیمت</th>
              <th className={style.hiddenfirst}>قیمت دیروز</th>
              <th>تغیرات قیمت</th>
              <th>قیمت</th>
              <th>نام</th>
              <th className={style.th}>#</th>
            </tr>
            {data.map((data, index) => (
              <tr className={style.trr} key={data.attributes.inscode}>
                <td
                  style={
                    data.attributes.changeprice > 0
                      ? { color: "#56d62f" }
                      : { color: "#e8383b" }
                  }
                >
                  {data.attributes.changeprice}
                </td>
                <td className={style.hiddenscd}>
                  {mobadel(data.attributes.maxprice)}
                </td>
                <td className={style.hiddenscd}>
                  {mobadel(data.attributes.minprice)}
                </td>
                <td className={style.hiddenfirst}>
                  {mobadel(data.attributes.priceYesterday)}
                </td>
                <td>{mobadel(data.attributes.price)}</td>
                <td>
                  <a href={`/${data.attributes.inscode}`}>
                    <div className={style.scd}>
                      <p>
                        ({data.attributes.name}){" "}
                        {" " + data.attributes.fullname}
                      </p>
                    </div>
                  </a>
                </td>
                <td className={style.para}>{index + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

function addcomaa(a) {
  if (a < 1000) {
    return a;
  }
  let temp = a.toString();
  let len = temp.length;
  let b = "";
  while (len > 3) {
    let len2 = temp.length;
    b = "," + temp.slice(len2 - 3) + b;
    temp = temp.slice(0, len2 - 3);
    len = len - 3;
  }
  b = temp + b;
  return b;
}
function mobadel(number) {
  if (number < 1000) return number;
  if (number < 1000000) return (number / 1000).toFixed(2).toString() + " K";
  if (number < 1000000000)
    return (number / 1000000).toFixed(2).toString() + " M";
  if (number < 1000000000000)
    return (number / 1000000000).toFixed(2).toString() + " B";
  return (number / 1000000000000).toFixed(2).toString() + " T";
}
