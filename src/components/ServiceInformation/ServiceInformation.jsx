import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./ServiceInformation.module.scss";
import {
  getService,
  servicesSlice,
} from "../../store/reducers/services/ServicesSlice";
import { RequestError } from "../RequestError/RequestError";
import { Spinner } from "../Spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";

export function ServiceInformation() {
  const { service, serviceError, serviceLoading } = useSelector(
    (state) => state.services
  );
  const { resetService } = servicesSlice.actions;
  const dispatch = useDispatch();

  const { id } = useParams();

  const handleRequest = () => {
    dispatch(getService(id));
  };

  useEffect(() => {
    dispatch(getService(id));

    return () => {
      dispatch(resetService());
    };
  }, [dispatch, id, resetService]);

  if (serviceLoading) {
    return <Spinner />;
  }

  if (serviceError) {
    return <RequestError callback={handleRequest} />;
  }

  if (!service) {
    return <></>;
  }

  return (
    <div className={styles.serviceInformationWrapper}>
      <h2>Информация об услуге</h2>
      <h3 className={styles.serviceName}>{service.name}</h3>
      <p className={styles.serviceDescription}>{service.content}</p>
      <b className={styles.servicePrise}>
        Цена услуги:
        {service.price}
      </b>
    </div>
  );
}
