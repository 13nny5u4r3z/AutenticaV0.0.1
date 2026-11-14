# Guía de backend: autenticación, credenciales y base de datos

Documento de referencia para implementar el backend de cuentas (inicio de sesión y registro) de Auténtica. El frontend actual (`src/components/Account.jsx`) recoge los datos y hace validaciones básicas; este archivo describe lo necesario para hacerlo seguro y persistente en servidor.

## 1. Datos del registro (frontend actual)

Campos solicitados al crear cuenta:

| Campo | Requerido | Notas |
| --- | --- | --- |
| Nombre | Sí | Texto, recortar espacios |
| Apellido | Sí | Texto, recortar espacios |
| Teléfono | No (opcional) | Validar formato si se envía; normalizar (E.164 recomendado) |
| Correo electrónico | Sí | Único en el sistema; normalizar a minúsculas |
| Contraseña | Sí | Nunca guardar en texto plano |
| Confirmar contraseña | Sí | Solo validar en cliente/servidor; **no** almacenar |

> `Confirmar contraseña` es un control de UX: el backend debe recibir y verificar coincidencia (opcional pero recomendado) y **nunca** persistirla.

## 2. Validaciones (cliente y servidor)

**Siempre validar en el servidor**, aunque el frontend ya valide. El cliente puede ser manipulado.

### Reglas sugeridas
- **Nombre / Apellido:** obligatorios, longitud razonable (ej. 1–80), permitir caracteres acentuados, recortar.
- **Correo:** formato válido, normalizar (`trim` + `toLowerCase`), único (índice/constraint único en BD), considerar verificación por email (token de confirmación).
- **Teléfono (opcional):** si viene vacío guardar `NULL`; si viene, validar formato/longitud y normalizar.
- **Contraseña:** mínimo 8 caracteres (mejor 10–12+), limitar máximo razonable (ej. 128) para evitar abusos, rechazar contraseñas vacías o solo espacios. Opcional: comprobar contra listas de contraseñas filtradas/comunes.
- **Confirmación:** debe coincidir con la contraseña en la petición de registro.
- **Rate limiting:** limitar intentos de registro e inicio de sesión por IP/cuenta para mitigar fuerza bruta y enumeración.
- **Mensajes de error:** en login no revelar si el correo existe (“credenciales inválidas” genérico).

## 3. Credenciales y manejo de contraseñas (hashing)

- **Nunca** almacenar contraseñas en texto plano ni con cifrado reversible para autenticación.
- Usar un algoritmo de hash de contraseñas lento y con sal:
  - **Recomendado:** Argon2id (parámetros ajustados al servidor).
  - **Alternativa sólida:** bcrypt (cost factor adecuado, ej. 12+ según entorno).
- La sal la gestiona la librería; almacenar el hash resultante (y parámetros si aplica según formato).
- **Rehash:** si en el futuro cambian parámetros/algoritmo, rehashear al iniciar sesión exitosamente.
- Comparar contraseñas con la función de verificación de la librería (comparación segura en tiempo constante).

## 4. Qué proteger

- **Secretos:** claves JWT/session, credenciales de BD, API keys, SMTP, etc. Solo en variables de entorno / gestor de secretos; **nunca** en el repositorio ni en el frontend.
- **Datos personales (PII):** nombre, apellido, correo, teléfono — proteger en tránsito (HTTPS/TLS siempre) y controlar acceso en BD/logs.
- **Logs:** no registrar contraseñas, tokens, ni datos sensibles en texto plano.
- **Tokens/sesiones:** si usas JWT, definir expiración corta para access token y rotación/refresh seguro; si usas sesiones, cookies `HttpOnly`, `Secure`, `SameSite` apropiado.
- **Base de datos:** usuario de BD con mínimos privilegios, backups cifrados, y no exponer la BD a internet directamente.
- **Dependencias:** mantener librerías actualizadas y revisar vulnerabilidades.

## 5. Modelo de datos sugerido (base de datos)

Ejemplo de tabla `users` (ajustar tipos según motor: PostgreSQL/MySQL/SQLite):

| Columna | Tipo sugerido | Restricciones / notas |
| --- | --- | --- |
| `id` | UUID o BIGINT autoincrement | PK |
| `nombre` | VARCHAR(80) | NOT NULL |
| `apellido` | VARCHAR(80) | NOT NULL |
| `telefono` | VARCHAR(20) | NULL (opcional), normalizado |
| `email` | VARCHAR(255) | NOT NULL, UNIQUE, almacenado normalizado |
| `password_hash` | VARCHAR(255) | NOT NULL (hash Argon2/bcrypt) |
| `email_verified_at` | TIMESTAMP | NULL hasta verificar correo (recomendado) |
| `created_at` | TIMESTAMP | NOT NULL, default now |
| `updated_at` | TIMESTAMP | NOT NULL, actualizado en cambios |

Opcionales según necesidades: `role`, `is_active`, `last_login_at`, tabla de `refresh_tokens`/`sessions`, tabla de tokens de verificación de correo y recuperación de contraseña.

## 6. API backend sugerida

Endpoints mínimos (REST, ejemplo):

- `POST /api/auth/register`
  - Body: `{ nombre, apellido, telefono?, email, password, confirmPassword }`
  - Validar, verificar email único, hashear contraseña, crear usuario.
  - Respuesta: 201 con datos públicos del usuario (sin hash) o iniciar sesión; manejar 409 si email existe, 422 por validación.
- `POST /api/auth/login`
  - Body: `{ email, password }`
  - Verificar credenciales, emitir sesión/token.
  - Respuesta: 200 con token/sesión + usuario público; 401 genérico si falla.
- `POST /api/auth/logout` (si hay sesión/token revocable)
- `GET /api/auth/me` (protegido) — datos del usuario autenticado.
- (Recomendado) `POST /api/auth/forgot-password`, `POST /api/auth/reset-password`, `POST /api/auth/verify-email`.

### Consideraciones
- Usar HTTPS en producción.
- Configurar CORS solo para orígenes permitidos.
- Validar y sanear entradas (tamaño, tipos) para evitar inyección y abusos.
- Respuestas JSON consistentes con códigos HTTP adecuados.

## 7. Pasos prácticos para integrar con este frontend

1. **Elegir stack backend/BD:** p.ej. Node (Express/Fastify/Nest) + PostgreSQL; Python + Django/FastAPI; etc.
2. **Configurar entorno:** `.env` con `DATABASE_URL`, secreto de sesión/JWT, configuración SMTP (si hay verificación), y cargarlo solo en servidor.
3. **Crear esquema/migraciones:** tabla `users` (y tablas auxiliares) con constraints e índices (`UNIQUE` en `email`).
4. **Implementar hashing:** integrar Argon2id o bcrypt en el flujo de registro y login.
5. **Implementar endpoints:** register/login (+ logout/me) con validación servidor y rate limiting.
6. **Conectar frontend:** en `src/components/Account.jsx`, reemplazar los `submit` de ejemplo por llamadas `fetch`/cliente HTTP al API, manejar estados de carga, errores del servidor y éxito (redirigir/guardar sesión según estrategia).
7. **Proteger rutas/datos:** middleware de autenticación para endpoints privados y manejo seguro de tokens/cookies.
8. **Pruebas:** casos de registro válido/inválido, email duplicado, login correcto/incorrecto, y revisión básica de seguridad.

## 8. Checklist rápido de seguridad

- [ ] HTTPS obligatorio en producción
- [ ] Contraseñas hasheadas con Argon2id o bcrypt (nunca texto plano)
- [ ] Validación y normalización en servidor
- [ ] Email único + manejo seguro de duplicados
- [ ] Rate limiting en auth
- [ ] Secretos fuera del código (variables de entorno)
- [ ] Cookies/tokens configurados de forma segura (`HttpOnly`, `Secure`, `SameSite`, expiración)
- [ ] Sin datos sensibles en logs
- [ ] Verificación de correo y recuperación de contraseña (recomendado)
- [ ] CORS restringido y mínimos privilegios en BD
