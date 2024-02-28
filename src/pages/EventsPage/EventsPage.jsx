import { Calendar, notification } from "antd";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import styles from "./EventsPage.module.scss";
import { AppRoute } from "../../const";
import { useSelector } from "react-redux";

export function EventsPage() {
  const events = useSelector((state) => state.event.events);
  const [api, contextHolder] = notification.useNotification({
    stack: {
      threshold: 3,
    },
  });

  const dateCellRender = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    const day = date.format("DD");
    const dayEvents = events.filter(
      (event) => event.currentDay === formattedDate
    );

    return (
      <Link
        className="ant-picker-cell-inner ant-picker-calendar-date"
        to={`${AppRoute.Event}/${formattedDate}`}
      >
        <div className="ant-picker-calendar-date-value">{day}</div>
        <div className="ant-picker-calendar-date-content">
          {dayEvents.length > 0 && (
            <ul>
              {dayEvents.map((event) => (
                <li key={event.eventUid}>{event.eventTitle}</li>
              ))}
            </ul>
          )}
        </div>
      </Link>
    );
  };

  useEffect(() => {
    const timeFormat = "HH:mm";
    const todayDay = dayjs().format("YYYY-MM-DD");
    const currentTime = dayjs().format(timeFormat);

    const timersId = [];

    events.forEach((event) => {
      const timeNotification = dayjs(event.timeStart, timeFormat)
        .subtract(dayjs(event.timeTo, timeFormat).hour(), "hour")
        .subtract(dayjs(event.timeTo, timeFormat).minute(), "minute")
        .format(timeFormat);

      if (
        event.currentDay === todayDay &&
        dayjs(timeNotification, "HH:mm").isAfter(dayjs(currentTime, "HH:mm"))
      ) {
        const delay = dayjs(timeNotification, timeFormat).diff(
          dayjs(currentTime, timeFormat)
        );

        const timerId = setTimeout(() => {
          api.open({
            message: "Запланированное событие скоро начнется",
            description: `У Вас запланировано "${event.eventTitle}"  с ${event.timeStart} до 11:46`,
            duration: null,
          });
        }, delay);

        timersId.push(timerId);
      }
    });

    return () => {
      timersId.forEach(clearTimeout);
    };
  }, [api, events]);

  return (
    <div className={styles.eventsPageWrapper}>
      {contextHolder}
      <h1 className={styles.eventsPageTitle}>Календарь событий</h1>
      <Calendar fullCellRender={dateCellRender} />
    </div>
  );
}
