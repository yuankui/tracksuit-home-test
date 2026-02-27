import { Header } from "../components/header/header.tsx";
import { Insights } from "../components/insights/insights.tsx";
import styles from "./app.module.css";
import { useInsights } from "../hooks/useInsights.ts";

export const App = () => {
  const { data: insights } = useInsights();

  console.log(insights);
  return (
    <main className={styles.main}>
      <Header />
      <Insights className={styles.insights} insights={insights ?? []} />
    </main>
  );
};
