import styles from "./RequestError.module.scss";

export function RequestError({ callback }) {
  return (
    <div className={styles.requestErrorWrapper}>
      <h2>Произошла ошибка!</h2>
      <button
        className={styles.requestErrorButton}
        type="button"
        onClick={callback}
      >
        Повторить запрос
      </button>
    </div>
  );
}
