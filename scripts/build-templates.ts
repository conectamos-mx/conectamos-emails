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
import Bienvenida from "../emails/onboarding/bienvenida";
import VerificarEmail from "../emails/onboarding/verificar-email";
import InvitarUsuario from "../emails/onboarding/invitar-usuario";
import CobroConfirmado from "../emails/billing/cobro-confirmado";
import AlertaSaldo from "../emails/billing/alerta-saldo";
import RecuperarPassword from "../emails/notificaciones/recuperar-password";

interface TemplateEntry {
  id: string;
  component: React.FC<any>;
}

const TEMPLATES: TemplateEntry[] = [
  { id: "onb_bienvenida",        component: Bienvenida },
  { id: "onb_verificar_email",   component: VerificarEmail },
  { id: "onb_invitar_usuario",   component: InvitarUsuario },
  { id: "bil_cobro_confirmado",  component: CobroConfirmado },
  { id: "bil_alerta_saldo",      component: AlertaSaldo },
  { id: "not_recuperar_password", component: RecuperarPassword },
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
      const html = await render(React.createElement(tpl.component));
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
