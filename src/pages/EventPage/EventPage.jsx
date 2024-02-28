import { Button, Modal } from "antd";
import { Link, useParams } from "react-router-dom";
import styles from "./EventPage.module.scss";
import { AppRoute } from "../../const";
import { NewEventForm } from "../../components/NewEventForm/NewEventForm";
import { eventSlice } from "../../store/reducers/events/EventSlice";
import { EventsList } from "../../components/EventsList/EventsList";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export function EventPage() {
  const dispatch = useDispatch();
  const { changeShowForm, resetEventState, setCurrentData, resetEvent } =
    eventSlice.actions;
  const isShowForm = useSelector((state) => state.event.isShowForm);
  const { date: currentDate } = useParams();
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

  const handleCloseModal = () => {
    dispatch(changeShowForm(false));
    dispatch(resetEventState());
  };

  useEffect(() => {
    dispatch(setCurrentData(currentDate));
  }, [currentDate, dispatch, setCurrentData]);

  useEffect(() => {
    return () => {
      dispatch(resetEvent());
    };
  }, [dispatch, resetEvent]);

  if (!dateFormatRegex.test(currentDate)) {
    return (
      <div>
        <p>Несуществующий роут, данной даты не существует</p>
      </div>
    );
  }

  return (
    <div className={styles.newEventPageWrapper}>
      <Link to={AppRoute.Calendar}>Назад к календарю</Link>

      <Button
        type="primary"
        onClick={() => dispatch(changeShowForm(true))}
        style={{ display: "block", marginTop: "30px" }}
      >
        Новая задача
      </Button>

      <EventsList />

      <Modal
        title="Новая задача"
        open={isShowForm}
        centered
        onCancel={handleCloseModal}
        footer={false}
      >
        <NewEventForm />
      </Modal>
    </div>
  );
}
