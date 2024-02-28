import { Link } from "react-router-dom";
import styles from "./MainLinks.module.scss";
import { MAIN_LINKS } from "./const";

export function MainLinks() {
  return (
    <div className={styles.mainLinksWrapper}>
      {MAIN_LINKS.map(({ title, to }) => (
        <Link to={to} className={styles.mainLink} key={title}>
          {title}
        </Link>
      ))}
    </div>
  );
}
