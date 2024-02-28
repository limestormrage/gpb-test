import { Button, Flex, Input, TimePicker, message } from "antd";
import { useCallback } from "react";
import uuidv1 from "uuid/v1";
import dayjs from "dayjs";
import { eventSlice } from "../../store/reducers/events/EventSlice";
import "dayjs/locale/ru";
import { useDispatch, useSelector } from "react-redux";

export function NewEventForm() {
  const dispatch = useDispatch();
  const {
    eventTitle,
    currentDay,
    timeEnd,
    timeStart,
    timeTo,
    eventUid,
    isEdit,
  } = useSelector((state) => state.event);
  const {
    changeEventTitle,
    changeTimeStart,
    changeTimeEnd,
    addEvent,
    changeShowForm,
    editEvent,
    resetEventState,
    changeTimeTo,
  } = eventSlice.actions;
  const [messageApi, contextHolder] = message.useMessage();

  const handleChangeTitle = (event) => {
    const title = event.target.value;
    dispatch(changeEventTitle(title));
  };

  const handleTimeStart = useCallback(
    (_, dateSting) => {
      dispatch(changeTimeStart(dateSting));
    },
    [changeTimeStart, dispatch]
  );

  const handleTimeEnd = (_, date) => {
    dispatch(changeTimeEnd(date));
  };

  const handleTimeTo = (_, value) => {
    dispatch(changeTimeTo(value));
  };

  const addNewEvent = () => {
    const eventData = {
      eventTitle,
      timeStart,
      timeEnd,
      timeTo,
      currentDay,
      uid: uuidv1(),
    };

    dispatch(addEvent(eventData));
    dispatch(changeShowForm(false));

    messageApi.open({
      type: "success",
      content: "Событие успешно добавлено",
    });
  };

  const handleEditEvent = () => {
    const eventData = {
      eventTitle,
      timeStart,
      timeEnd,
      currentDay,
      timeTo,
      uid: eventUid,
    };

    dispatch(editEvent(eventData));
    dispatch(resetEventState());

    messageApi.open({
      type: "success",
      content: "Событие успешно обновлено",
    });
  };

  const disabledButton = !currentDay || !eventTitle || !timeStart || !timeEnd;

  return (
    <Flex vertical gap={30}>
      {contextHolder}
      <Input
        placeholder="Новая задача"
        onChange={handleChangeTitle}
        value={eventTitle}
      />
      <TimePicker
        format="HH:mm"
        placeholder="Время начала"
        onChange={handleTimeStart}
        needConfirm={false}
        style={{ width: "130px" }}
        value={timeStart ? dayjs(timeStart, "HH:mm") : null}
      />
      <TimePicker
        format="HH:mm"
        placeholder="Время окончания"
        onChange={handleTimeEnd}
        needConfirm={false}
        style={{ width: "130px" }}
        value={timeEnd ? dayjs(timeEnd, "HH:mm") : null}
      />
      <TimePicker
        format="HH:mm"
        placeholder="Оповещать за"
        onChange={handleTimeTo}
        needConfirm={false}
        style={{ width: "130px" }}
        value={timeTo ? dayjs(timeTo, "HH:mm") : null}
      />
      <Button
        type="primary"
        disabled={disabledButton}
        onClick={isEdit ? handleEditEvent : addNewEvent}
      >
        {isEdit ? "Редактировать" : "Создать событие"}
      </Button>
    </Flex>
  );
}
