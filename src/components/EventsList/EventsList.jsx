import { Flex } from "antd";
import { EventItem } from "../EventItem/EventItem";
import { useSelector } from "react-redux";

export function EventsList() {
  const events = useSelector((state) => state.event.events);
  const currentDay = useSelector((state) => state.event.currentDay);

  return (
    <Flex vertical gap="20px" style={{ marginTop: "30px" }}>
      {events
        .filter((event) => event.currentDay === currentDay)
        .map((event) => (
          <EventItem event={event} key={event.uid} />
        ))}
    </Flex>
  );
}
