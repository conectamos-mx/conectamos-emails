/**
 * build-templates.ts
 *
 * Compila cada template de React Email a HTML estático y lo guarda en /dist.
 *
 * Uso:
 *   npm run build        → escribe los HTMLs en dist/
 *   npm run build:dry    → solo imprime qué haría, sin escribir archivos
 */

import { render } from "@react-email/render";
import * as React from "react";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

// ─── Templates ────────────────────────────────────────────────────────────────
// Convención de IDs: {categoría}_{nombre}
import Bienvenida, { defaults as defaultsBienvenida } from "../emails/onboarding/bienvenida";
import VerificarEmail, { defaults as defaultsVerificarEmail } from "../emails/onboarding/verificar-email";
import InvitarUsuario, { defaults as defaultsInvitarUsuario } from "../emails/onboarding/invitar-usuario";
import CobroConfirmado, { defaults as defaultsCobroConfirmado } from "../emails/billing/cobro-confirmado";
import AlertaSaldo, { defaults as defaultsAlertaSaldo } from "../emails/billing/alerta-saldo";
import RecuperarPassword, { defaults as defaultsRecuperarPassword } from "../emails/notificaciones/recuperar-password";

interface TemplateEntry {
  id: string;
  component: React.FC<any>;
  defaults: Record<string, any>;
}

const TEMPLATES: TemplateEntry[] = [
  { id: "onb_bienvenida",         component: Bienvenida,        defaults: defaultsBienvenida },
  { id: "onb_verificar_email",    component: VerificarEmail,    defaults: defaultsVerificarEmail },
  { id: "onb_invitar_usuario",    component: InvitarUsuario,    defaults: defaultsInvitarUsuario },
  { id: "bil_cobro_confirmado",   component: CobroConfirmado,   defaults: defaultsCobroConfirmado },
  { id: "bil_alerta_saldo",       component: AlertaSaldo,       defaults: defaultsAlertaSaldo },
  { id: "not_recuperar_password", component: RecuperarPassword, defaults: defaultsRecuperarPassword },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const isDryRun = process.argv.includes("--dry-run");

  const distDir = join(process.cwd(), "dist");

  if (!isDryRun) {
    mkdirSync(distDir, { recursive: true });
  }

  let ok = 0;
  let errors = 0;

  for (const tpl of TEMPLATES) {
    try {
      const html = await render(React.createElement(tpl.component, tpl.defaults));
      const outPath = `dist/${tpl.id}.html`;

      if (isDryRun) {
        console.log(`  ✓ [${tpl.id}] → ${outPath} (${html.length} chars) [dry-run]`);
      } else {
        writeFileSync(join(distDir, `${tpl.id}.html`), html, "utf-8");
        console.log(`  ✓ [${tpl.id}] → ${outPath} (${html.length} chars)`);
      }

      ok++;
    } catch (err) {
      console.error(`  ✗ [${tpl.id}] error:`, err);
      errors++;
    }
  }

  console.log(`\n${isDryRun ? "🔍" : "✅"}  ${ok} templates listos${errors > 0 ? `, ${errors} con error` : ""}.\n`);

  if (errors > 0) process.exit(1);
}

main();
