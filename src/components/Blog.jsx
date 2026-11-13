const posts = [
  {
    category: 'Colorimetría',
    title: 'Encuentra los tonos que mejor te favorecen',
    text: 'Una guía sencilla para descubrir la paleta que ilumina tu rostro y combina con tu estilo.',
  },
  {
    category: 'Estilo',
    title: 'Cómo construir un armario cápsula en 10 pasos',
    text: 'Menos prendas, más combinaciones: el método para vestirte con intención cada día.',
  },
]

export function Blog() {
  return (
    <section id="blog" className="border-y border-rose/60 bg-sand/40">
      <div className="container-page py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="font-display text-caption uppercase tracking-[0.2em] text-black">
            Blog
          </p>
          <h2 className="mt-4 text-h2">Ideas para vestir con intención</h2>
          <p className="mt-4 text-body text-black/80">
            Consejos de estilo, color y armario para que la imagen deje de ser
            una duda y se vuelva una herramienta.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.title}
              className="rounded-card border border-rose/70 bg-surface p-6 shadow-card md:p-8"
            >
              <span className="font-display text-caption uppercase tracking-[0.14em] text-black">
                {post.category}
              </span>
              <h3 className="mt-4 text-h3">{post.title}</h3>
              <p className="mt-3 text-small text-black/75">{post.text}</p>
              <a
                href="#blog"
                className="mt-6 inline-flex items-center gap-2 font-display text-[0.7rem] uppercase tracking-[0.14em] text-black transition-colors hover:text-secondary"
              >
                Leer artículo
                <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog
