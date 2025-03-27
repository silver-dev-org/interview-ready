import Link from "next/link";

const paths = [
  "autocomplete",
  "file-tree-viewer",
  "hooks",
  "market",
  "shopping-cart",
  "signup",
  "stopwatch",
  "sudoku",
  "tetris",
  "questionnaire",
  "weather",
];

const completedChallenges = new Set(["signup", "autocomplete"]);
const ongoingChallenges = new Set(["tetris"]);

export default function Home() {
  return (
    <div style={{ padding: "20px", margin: "20px" }}>
      <h1>React Challenges</h1>
      <ol>
        {paths.map((path, i) => {
          let color = "red";
          if (completedChallenges.has(path)) {
            color = "green";
          } else if (ongoingChallenges.has(path)) {
            color = "orange";
          }
          return (
            <li key={i} style={{ margin: "10px" }}>
              <Link href={`/challenges/${path}`} style={{ color }}>
                {path}
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
