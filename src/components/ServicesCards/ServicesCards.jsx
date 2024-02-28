import { useEffect } from "react";
import { ServiceCard } from "../ServiceCard/ServiceCard";
import { Spinner } from "../Spinner/Spinner";
import styles from "./ServicesCards.module.scss";
import {
  getServices,
  servicesSlice,
} from "../../store/reducers/services/ServicesSlice";
import { RequestError } from "../RequestError/RequestError";
import { useDispatch, useSelector } from "react-redux";

export function ServicesCards() {
  const { services, servicesError, servicesLoading } = useSelector(
    (state) => state.services
  );
  const { resetServices } = servicesSlice.actions;
  const dispatch = useDispatch();

  const handleRequest = () => {
    dispatch(getServices());
  };

  useEffect(() => {
    dispatch(getServices());

    return () => {
      dispatch(resetServices());
    };
  }, [dispatch, resetServices]);

  if (servicesLoading) {
    return <Spinner />;
  }

  if (servicesError) {
    return <RequestError callback={handleRequest} />;
  }

  return (
    <div className={styles.servicesCardsWrapper}>
      {services.map(({ id, name, price }) => (
        <ServiceCard id={id} title={name} price={price} key={id} />
      ))}
    </div>
  );
}
