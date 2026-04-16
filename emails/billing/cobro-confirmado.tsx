import { Section } from "@react-email/components";
import * as React from "react";
import { Layout } from "../_shared/layout";
import {
  EmailLabel,
  EmailTitle,
  EmailText,
  InfoBox,
  MetaRow,
  PrimaryButton,
  GhostButton,
  EmailDivider,
} from "../_shared/components";

export interface CobroConfirmadoProps {
  nombre: string;
  monto: string;
  moneda: string;
  plan: string;
  periodo: string;
  folio: string;
  proximoCobro: string;
  urlFactura: string;
  urlHistorial: string;
}

const defaults: CobroConfirmadoProps = {
  nombre: "{{nombre}}",
  monto: "{{monto}}",
  moneda: "{{moneda}}",
  plan: "{{plan}}",
  periodo: "{{periodo}}",
  folio: "{{folio}}",
  proximoCobro: "{{proximoCobro}}",
  urlFactura: "{{urlFactura}}",
  urlHistorial: "{{urlHistorial}}",
};

export default function CobroConfirmado(props: CobroConfirmadoProps = defaults) {
  const { nombre, monto, moneda, plan, periodo, folio, proximoCobro, urlFactura, urlHistorial } = props;

  return (
    <Layout preview={`Pago confirmado: $${monto} ${moneda} — ${periodo}. Folio ${folio}.`} badge="billing">
      <EmailLabel>Pago procesado</EmailLabel>
      <EmailTitle>Tu cobro fue confirmado</EmailTitle>
      <EmailText>
        Hola <strong style={{ color: "#0F2937", fontWeight: 500 }}>{nombre}</strong>, registramos
        el pago de tu suscripción correspondiente a {periodo}. Aquí el resumen.
      </EmailText>

      <MetaRow
        items={[
          { label: "Monto", value: `$${monto} ${moneda}` },
          { label: "Plan", value: plan },
          { label: "Período", value: periodo },
        ]}
      />

      <InfoBox>
        <strong style={{ color: "#0F2937", fontWeight: 500 }}>Folio: {folio}.</strong> Tu factura
        en PDF está disponible en el portal. Si necesitas actualizar datos de facturación, puedes
        hacerlo desde Configuración.
      </InfoBox>

      <Section style={{ margin: "22px 0" }}>
        <PrimaryButton href={urlFactura}>Descargar factura</PrimaryButton>
        <GhostButton href={urlHistorial}>Ver historial</GhostButton>
      </Section>

      <EmailDivider />

      <EmailText muted>
        Próximo cobro:{" "}
        <strong style={{ color: "#0F2937", fontWeight: 500 }}>{proximoCobro}</strong>. Preguntas
        sobre facturación:{" "}
        <a href="mailto:hola@conectamos.ai" style={{ color: "#66E2D0", textDecoration: "none" }}>
          hola@conectamos.ai
        </a>
      </EmailText>
    </Layout>
  );
}
