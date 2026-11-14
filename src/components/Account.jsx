import { useState } from 'react'

const inputClass =
  'mt-2 w-full rounded-panel border border-rose/60 bg-white px-4 py-3 font-body text-body text-black placeholder:text-black/40 focus:border-primary focus:outline-none'

const labelClass =
  'font-display text-caption uppercase tracking-[0.14em] text-black'

function LoginForm({ onCreate }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form
      className="mt-8 space-y-5"
      onSubmit={(e) => {
        e.preventDefault()
      }}
      noValidate
    >
      <div>
        <label htmlFor="login-email" className={labelClass}>
          Correo electrónico
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          className={inputClass}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
        />
      </div>
      <div>
        <label htmlFor="login-password" className={labelClass}>
          Contraseña
        </label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          className={inputClass}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>

      <button type="submit" className="btn btn-primary mt-2 w-full sm:w-auto">
        Iniciar sesión
      </button>

      <p className="pt-2 font-body text-small text-black/75">
        ¿No tienes cuenta?{' '}
        <button
          type="button"
          onClick={onCreate}
          className="font-bold text-primary underline decoration-rose underline-offset-4 transition-colors hover:text-secondary"
        >
          Crear cuenta
        </button>
      </p>
    </form>
  )
}

function RegisterForm({ onBack }) {
  const [values, setValues] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    password: '',
    confirm: '',
  })
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)

  const set = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
    setErrors((err) => ({ ...err, [field]: '' }))
  }

  const validate = () => {
    const next = {}
    if (!values.nombre.trim()) next.nombre = 'Ingresa tu nombre.'
    if (!values.apellido.trim()) next.apellido = 'Ingresa tu apellido.'
    if (!values.email.trim()) next.email = 'Ingresa tu correo electrónico.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      next.email = 'Ingresa un correo válido.'
    if (!values.password) next.password = 'Ingresa una contraseña.'
    else if (values.password.length < 8)
      next.password = 'La contraseña debe tener al menos 8 caracteres.'
    if (!values.confirm) next.confirm = 'Confirma tu contraseña.'
    else if (values.password !== values.confirm)
      next.confirm = 'Las contraseñas no coinciden.'
    return next
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length === 0) setDone(true)
  }

  if (done) {
    return (
      <div className="mt-8 rounded-panel border border-rose/50 bg-rose/20 p-6">
        <h2 className="font-display text-h3 text-black">Cuenta lista para crear</h2>
        <p className="mt-3 font-body text-body text-black/80">
          Los datos se validaron en el formulario. La creación real de la cuenta
          se completará cuando se conecte el backend y la base de datos.
        </p>
        <button type="button" onClick={onBack} className="btn btn-primary mt-6">
          Volver a iniciar sesión
        </button>
      </div>
    )
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={onSubmit} noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="reg-nombre" className={labelClass}>
            Nombre
          </label>
          <input
            id="reg-nombre"
            type="text"
            autoComplete="given-name"
            className={inputClass}
            value={values.nombre}
            onChange={set('nombre')}
          />
          {errors.nombre && (
            <p className="mt-2 font-body text-small text-primary">{errors.nombre}</p>
          )}
        </div>
        <div>
          <label htmlFor="reg-apellido" className={labelClass}>
            Apellido
          </label>
          <input
            id="reg-apellido"
            type="text"
            autoComplete="family-name"
            className={inputClass}
            value={values.apellido}
            onChange={set('apellido')}
          />
          {errors.apellido && (
            <p className="mt-2 font-body text-small text-primary">{errors.apellido}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="reg-telefono" className={labelClass}>
          Teléfono <span className="normal-case tracking-normal text-black/60">(opcional)</span>
        </label>
        <input
          id="reg-telefono"
          type="tel"
          autoComplete="tel"
          className={inputClass}
          value={values.telefono}
          onChange={set('telefono')}
          placeholder="+57 300 000 0000"
        />
      </div>

      <div>
        <label htmlFor="reg-email" className={labelClass}>
          Correo electrónico
        </label>
        <input
          id="reg-email"
          type="email"
          autoComplete="email"
          className={inputClass}
          value={values.email}
          onChange={set('email')}
          placeholder="tu@correo.com"
        />
        {errors.email && (
          <p className="mt-2 font-body text-small text-primary">{errors.email}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="reg-password" className={labelClass}>
            Contraseña
          </label>
          <input
            id="reg-password"
            type="password"
            autoComplete="new-password"
            className={inputClass}
            value={values.password}
            onChange={set('password')}
          />
          {errors.password && (
            <p className="mt-2 font-body text-small text-primary">{errors.password}</p>
          )}
        </div>
        <div>
          <label htmlFor="reg-confirm" className={labelClass}>
            Confirmar contraseña
          </label>
          <input
            id="reg-confirm"
            type="password"
            autoComplete="new-password"
            className={inputClass}
            value={values.confirm}
            onChange={set('confirm')}
          />
          {errors.confirm && (
            <p className="mt-2 font-body text-small text-primary">{errors.confirm}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
        <button type="submit" className="btn btn-primary w-full sm:w-auto">
          Crear cuenta
        </button>
        <button
          type="button"
          onClick={onBack}
          className="font-display text-caption uppercase tracking-[0.14em] text-black transition-colors hover:text-secondary"
        >
          Ya tengo cuenta
        </button>
      </div>
    </form>
  )
}

export function Account() {
  const [mode, setMode] = useState('login')

  return (
    <section
      id="entrar"
      className="container-page pb-16 pt-28 md:pb-24 md:pt-32"
    >
      <div className="mx-auto max-w-xl">
        <p className="font-display text-caption uppercase tracking-[0.2em] text-black">
          Mi cuenta
        </p>
        <h1 className="mt-4 text-h2">
          {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
        </h1>
       {mode !== 'login' && (
  <p className=" max-w-prose font-body text-body text-black/80">
    Completa tus datos para crear tu cuenta.
  </p>
)}
        {mode === 'login' ? (
          <LoginForm onCreate={() => setMode('register')} />
        ) : (
          <RegisterForm onBack={() => setMode('login')} />
        )}

        <a
          href="#inicio"
          className="mt-12 inline-flex items-center gap-2 font-display text-caption uppercase tracking-[0.14em] text-black transition-colors hover:text-secondary"
        >
          <span aria-hidden="true">←</span> Volver al inicio
        </a>
      </div>
    </section>
  )
}

export default Account
