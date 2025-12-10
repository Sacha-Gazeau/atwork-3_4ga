import prisma from "@/lib/client";

export default async function Question() {
  const questions = await prisma.question.findMany();

  return (
    <div>
      <h2>Veelgestelde vragen</h2>
      <ul>
        {questions.map((q) => (
          <li key={q.id}>
            <p>{q.quest}</p>
            <p>{q.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
