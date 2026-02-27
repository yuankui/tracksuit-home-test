import { BRANDS } from "../../lib/consts.ts";
import { Button } from "../button/button.tsx";
import { Modal, type ModalProps } from "../modal/modal.tsx";
import styles from "./add-insight.module.css";
import { useAddInsights } from "../../hooks/useAddInsights.ts";

type AddInsightProps = ModalProps;

export const AddInsight = (props: AddInsightProps) => {
  const { mutate: addInsight } = useAddInsights();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const brandId = Number(
      (form.elements.namedItem("brand") as HTMLSelectElement).value,
    );
    const text = (form.elements.namedItem("text") as HTMLTextAreaElement).value;
    addInsight({ brandId, createdAt: new Date(), text });
    props.onClose();
  };

  return (
    <Modal {...props}>
      <h1 className={styles.heading}>Add a new insight</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.field}>
          <select className={styles["field-input"]} name="brand">
            {BRANDS.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </label>
        <label className={styles.field}>
          Insight
          <textarea
            className={styles["field-input"]}
            name="text"
            rows={5}
            placeholder="Something insightful..."
          />
        </label>
        <Button className={styles.submit} type="submit" label="Add insight" />
      </form>
    </Modal>
  );
};
