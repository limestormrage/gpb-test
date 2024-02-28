/* eslint-disable react/jsx-one-expression-per-line */
import { Link } from "react-router-dom";
import styles from "./ServiceCard.module.scss";
import { AppRoute } from "../../const";

export function ServiceCard({ id, price, title }) {
  return (
    <Link
      to={`${AppRoute.SecondTasksService}/${id}`}
      className={styles.servicesCard}
    >
      <h3 className={styles.servicesCardTitle}>{title}</h3>
      <b>Цена: {price}</b>
    </Link>
  );
}
