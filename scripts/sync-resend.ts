/**
 * sync-resend.ts
 *
 * Compila cada template de React Email a HTML y lo registra / actualiza
 * en Resend vía API. Corre en local y en GitHub Actions.
 *
 * Uso:
 *   npm run sync           → sube todos los templates
 *   npm run sync:dry       → solo imprime qué haría, sin llamar a Resend
 */

import { render } from "@react-email/render";
import * as React from "react";
import { readFileSync } from "fs";

// ─── Templates ────────────────────────────────────────────────────────────────
// Cada entrada define el ID que usarás en resend.emails.send({ templateId })
// y el componente que se compila a HTML.
// Convención de IDs: {categoría}_{nombre}
import Bienvenida from "../emails/onboarding/bienvenida";
import VerificarEmail from "../emails/onboarding/verificar-email";
import InvitarUsuario from "../emails/onboarding/invitar-usuario";
import CobroConfirmado from "../emails/billing/cobro-confirmado";
import AlertaSaldo from "../emails/billing/alerta-saldo";
import RecuperarPassword from "../emails/notificaciones/recuperar-password";

interface TemplateEntry {
  id: string;
  name: string;
  subject: string;
  component: React.FC<any>;
}

const TEMPLATES: TemplateEntry[] = [
  {
    id: "onb_bienvenida",
    name: "Onboarding — Bienvenida",
    subject: "Bienvenido a ConectamOS, {{empresa}}",
    component: Bienvenida,
  },
  {
    id: "onb_verificar_email",
    name: "Onboarding — Verificar email",
    subject: "Confirma tu correo electrónico",
    component: VerificarEmail,
  },
  {
    id: "onb_invitar_usuario",
    name: "Onboarding — Invitar usuario",
    subject: "{{nombreInvitador}} te invitó a {{empresa}} en ConectamOS",
    component: InvitarUsuario,
  },
  {
    id: "bil_cobro_confirmado",
    name: "Billing — Cobro confirmado",
    subject: "Tu cobro fue confirmado — ${{monto}} {{moneda}}",
    component: CobroConfirmado,
  },
  {
    id: "bil_alerta_saldo",
    name: "Billing — Alerta de saldo bajo",
    subject: "Tu saldo está por agotarse — {{saldoActual}} mensajes restantes",
    component: AlertaSaldo,
  },
  {
    id: "not_recuperar_password",
    name: "Seguridad — Recuperar contraseña",
    subject: "Recupera tu contraseña en ConectamOS",
    component: RecuperarPassword,
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const isDryRun = process.argv.includes("--dry-run");
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey && !isDryRun) {
    console.error("❌  RESEND_API_KEY no está definida. Agrega el secret al entorno.");
    process.exit(1);
  }

  console.log(`\n📧  Sincronizando ${TEMPLATES.length} templates con Resend...\n`);
  if (isDryRun) console.log("🔍  Modo dry-run: no se harán cambios en Resend.\n");

  let ok = 0;
  let errors = 0;

  for (const tpl of TEMPLATES) {
    try {
      // 1. Compilar a HTML
      const html = await render(React.createElement(tpl.component));

      console.log(`  → [${tpl.id}] compilado (${html.length} chars)`);

      if (isDryRun) {
        ok++;
        continue;
      }

      // 2. Crear o actualizar en Resend
      // Resend no tiene upsert nativo; intentamos crear y si falla (409) actualizamos.
      const created = await upsertTemplate(apiKey!, tpl.id, tpl.name, tpl.subject, html);
      console.log(`  ✓ [${tpl.id}] ${created ? "creado" : "actualizado"} en Resend`);
      ok++;
    } catch (err) {
      console.error(`  ✗ [${tpl.id}] error:`, err);
      errors++;
    }
  }

  console.log(`\n${isDryRun ? "🔍" : "✅"}  ${ok} templates listos${errors > 0 ? `, ${errors} con error` : ""}.\n`);

  if (errors > 0) process.exit(1);
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
async function upsertTemplate(
  apiKey: string,
  id: string,
  name: string,
  subject: string,
  html: string
): Promise<boolean> {
  // Intenta crear
  const createRes = await fetch("https://api.resend.com/emails/templates", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, name, subject, html }),
  });

  if (createRes.ok) return true; // creado

  if (createRes.status === 409) {
    // Ya existe — actualizar
    const updateRes = await fetch(`https://api.resend.com/emails/templates/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, subject, html }),
    });

    if (!updateRes.ok) {
      const body = await updateRes.json();
      throw new Error(JSON.stringify(body));
    }
    return false; // actualizado
  }

  const body = await createRes.json();
  throw new Error(JSON.stringify(body));
}

main();
