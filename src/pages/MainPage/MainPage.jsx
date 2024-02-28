import styles from "./MainPage.module.scss";
import { MainLinks } from "../../components/MainLinks/MainLinks";

export function MainPage() {
  return (
    <div className={styles.mainPageWrapper}>
      <MainLinks />
    </div>
  );
}
