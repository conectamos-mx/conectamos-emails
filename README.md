# conectamos-emails

Repo centralizado de email templates para ConectamOS.
Todos los templates se compilan con React Email y se sincronizan automáticamente a Resend.

## Tecnologías

- [React Email](https://react.email) — componentes React compilados a HTML compatible con todos los clientes de correo
- [Resend](https://resend.com) — plataforma de envío de correo transaccional
- GitHub Actions — CI que sincroniza templates a Resend en cada push a `main`

---

## Setup local

### 1. Clonar el repo

```bash
git clone https://github.com/conectamos-mx/conectamos-emails.git
cd conectamos-emails
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
# Editar .env y agregar tu RESEND_API_KEY
```

Obtén tu API key en: https://resend.com/api-keys

### 4. Preview en vivo

```bash
npm run preview
# Abre http://localhost:3000
# Muestra todos los templates con hot reload
```

### 5. Sincronizar con Resend (manual)

```bash
npm run sync          # sube todos los templates
npm run sync:dry      # dry run — imprime qué haría sin hacer cambios
```

---

## Estructura

```
emails/
  _shared/
    layout.tsx         Shell base: header, footer, tokens de diseño
    components.tsx     Componentes reutilizables: EmailLabel, InfoBox, MetaRow, etc.
  onboarding/
    bienvenida.tsx           ID: onb_bienvenida
    verificar-email.tsx      ID: onb_verificar_email
    invitar-usuario.tsx      ID: onb_invitar_usuario
  billing/
    cobro-confirmado.tsx     ID: bil_cobro_confirmado
    alerta-saldo.tsx         ID: bil_alerta_saldo
  notificaciones/
    recuperar-password.tsx   ID: not_recuperar_password
scripts/
  sync-resend.ts       Compila y sube templates a Resend
.github/workflows/
  sync-resend.yml      GitHub Action — auto-sync en push a main
```

---

## Convención de IDs

| Prefijo | Categoría       |
|---------|-----------------|
| `onb_`  | Onboarding      |
| `bil_`  | Billing         |
| `not_`  | Notificaciones  |
| `plt_`  | Plataforma      |

---

## Cómo consumir desde otros proyectos

Los proyectos consumidores (tenant-admin, conectamos-platform) **no instalan este repo**.
Solo necesitan la `RESEND_API_KEY` y el `templateId`.

```typescript
// Ejemplo en Next.js / cualquier Node.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Bienvenida
await resend.emails.send({
  from: "noreply@conectamos.ai",
  to: tenant.email,
  subject: `Bienvenido a ConectamOS, ${tenant.empresa}`,
  templateId: "onb_bienvenida",
  variables: {
    nombre: tenant.contacto,
    empresa: tenant.nombre,
    plan: tenant.plan,
    usuariosIncluidos: "5",
    fechaPrueba: "14 may 2025",
    urlPlataforma: "https://app.conectamos.ai",
    urlGuia: "https://docs.conectamos.ai/inicio",
  },
});

// Cobro confirmado
await resend.emails.send({
  from: "noreply@conectamos.ai",
  to: tenant.email,
  subject: "Tu cobro fue confirmado",
  templateId: "bil_cobro_confirmado",
  variables: {
    nombre: tenant.contacto,
    monto: "2,490",
    moneda: "MXN",
    plan: "Business",
    periodo: "Abr 2025",
    folio: "CNT-2025-0412",
    proximoCobro: "1 de mayo de 2025",
    urlFactura: `https://app.conectamos.ai/billing/invoices/${invoiceId}`,
    urlHistorial: "https://app.conectamos.ai/billing",
  },
});
```

### Variables disponibles por template

| Template ID              | Variables requeridas |
|--------------------------|----------------------|
| `onb_bienvenida`         | nombre, empresa, plan, usuariosIncluidos, fechaPrueba, urlPlataforma, urlGuia |
| `onb_verificar_email`    | nombre, urlVerificacion, minutosExpiracion |
| `onb_invitar_usuario`    | nombreInvitado, nombreInvitador, empresa, rol, horasExpiracion, urlInvitacion |
| `bil_cobro_confirmado`   | nombre, monto, moneda, plan, periodo, folio, proximoCobro, urlFactura, urlHistorial |
| `bil_alerta_saldo`       | nombre, saldoActual, promedioDiario, estimadoHoras, urlRecargar, urlConsumo |
| `not_recuperar_password` | nombre, urlReset, minutosExpiracion |

---

## CI/CD

GitHub Actions sincroniza automáticamente en cada push a `main` que toque archivos en `emails/` o `scripts/`.

**Para activar el CI**, agrega el secret `RESEND_API_KEY` en:
`GitHub → Repo → Settings → Secrets and variables → Actions → New repository secret`

---

## Agregar un nuevo template

1. Crea el archivo en la carpeta correspondiente (`emails/onboarding/nuevo.tsx`)
2. Usa `Layout` + los componentes de `_shared/components.tsx`
3. Agrégalo al array `TEMPLATES` en `scripts/sync-resend.ts` con su ID y subject
4. Corre `npm run preview` para verlo en localhost
5. Push a `main` → GitHub Actions lo sube a Resend automáticamente
