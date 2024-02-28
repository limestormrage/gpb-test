import styles from "./TaskCard.module.scss";

export function TaskCard({ header, options, text }) {
  return (
    <div className={styles.taskCard}>
      <h3 className={styles.taskCardTitle}>{header}</h3>
      <ul className={styles.taskCardOptions}>
        {options.map((option) => (
          <li key={option}>
            <p>{option}</p>
          </li>
        ))}
      </ul>
      <div className={styles.taskCardDescription}>
        <p>{text}</p>
      </div>
    </div>
  );
}
