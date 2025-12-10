import prisma from "@/lib/client";

export default async function Question() {
  const questions = await prisma.question.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <section className="faq">
      <h2 className="faq-title">Veelgestelde vragen</h2>

      <div className="faq-list">
        {questions.map((q) => (
          <details key={q.id} className="faq-item">
            <summary className="faq-question">
              <span>{q.quest}</span>

              {/* Chevron */}
              <span className="faq-chevron" aria-hidden="true">
                ▼
              </span>
            </summary>

            <p className="faq-answer">{q.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}