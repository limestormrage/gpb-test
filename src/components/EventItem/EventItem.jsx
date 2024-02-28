import { Button, Flex, Typography } from "antd";
import { eventSlice } from "../../store/reducers/events/EventSlice";
import { useDispatch } from "react-redux";

export function EventItem({ event }) {
  const { eventTitle, timeEnd, timeStart, uid } = event;
  const dispatch = useDispatch();
  const { deleteEvent, changeShowForm, setEditedEvent } = eventSlice.actions;

  const handleDeleteEvent = () => {
    dispatch(deleteEvent(uid));
  };

  const handleEditEvent = () => {
    dispatch(setEditedEvent(event));
    dispatch(changeShowForm(true));
  };

  return (
    <Flex justify="space-between" align="flex-end">
      <Flex vertical gap="10px">
        <Typography.Title level={5}>{eventTitle}</Typography.Title>
        <Flex gap="10px">
          <Typography.Paragraph>{`C ${timeStart}`}</Typography.Paragraph>
          <Typography.Paragraph>{`По ${timeEnd}`}</Typography.Paragraph>
        </Flex>
      </Flex>
      <Flex gap="5px">
        <Button onClick={handleEditEvent}>Редактировать</Button>
        <Button onClick={handleDeleteEvent}>Удалить</Button>
      </Flex>
    </Flex>
  );
}
