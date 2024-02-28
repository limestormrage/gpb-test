import { ServiceInformation } from "../../components/ServiceInformation/ServiceInformation";
import styles from "./ServicePage.module.scss";

export function ServicePage() {
  return (
    <div className={styles.servicePageWrapper}>
      <ServiceInformation />
    </div>
  );
}
