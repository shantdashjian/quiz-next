import Link from "next/link";
import { sql } from "./db";

async function Quizzes() {
  const quizzes = await sql`
    SELECT * FROM quizzes
  `

  return (
    <ul>
      {
        quizzes.map((quiz) => (
          <li key={quiz.quiz_id}>
            <Link href={`/quiz/${quiz.quiz_id}`}>{quiz.title}</Link>
          </li>
        ))
      }
    </ul>
  )
}
export default function Home() {
  return (
    <>
      <h1 className="border-4 border-green-900 w-fit px-2 py-1 bg-green-300">All Quizzes</h1>
      <Quizzes />
    </>
  );
}
