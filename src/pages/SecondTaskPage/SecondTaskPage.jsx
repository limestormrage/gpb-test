import { ServicesCards } from "../../components/ServicesCards/ServicesCards";
import styles from "./SecondTaskPage.module.scss";

export function SecondTaskPage() {
  return (
    <div className={styles.secondTaskPageWrapper}>
      <ServicesCards />
    </div>
  );
}
