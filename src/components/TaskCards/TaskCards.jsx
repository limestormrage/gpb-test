import styles from "./TaskCards.module.scss";
import { TaskCard } from "../TaskCard/TaskCard";
import { MOCK_CARDS_DATA } from "./mock";

export function TaskCards() {
  return (
    <div className={styles.tasksCardWrapper}>
      {MOCK_CARDS_DATA.map(({ header, options, text }) => (
        <TaskCard key={header} header={header} options={options} text={text} />
      ))}
    </div>
  );
}
