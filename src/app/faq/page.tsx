import prisma from "@/lib/client";

export default async function Question() {
  const questions = await prisma.question.findMany({
    orderBy: [{ theme: "asc" }, { id: "asc" }],
  });

  const groupedQuestions = questions.reduce((acc, question) => {
    acc[question.theme] = acc[question.theme] || [];
    acc[question.theme].push(question);
    return acc;
  }, {} as Record<string, typeof questions>);

  return (
    <section className="faq">
      <h2 className="faq-title">Veelgestelde vragen</h2>

      <div className="faq-list">
        {Object.entries(groupedQuestions).map(([theme, themeQuestions]) => (
          <div key={theme} className="faq-theme">
            <h3 className="faq-theme-title">{theme}</h3>

            {themeQuestions.map((q) => (
              <details key={q.id} className="faq-item">
                <summary className="faq-question">
                  <span>{q.quest}</span>
                  <span className="faq-chevron" aria-hidden="true">
                    ▼
                  </span>
                </summary>

                <p className="faq-answer">{q.answer}</p>
              </details>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}