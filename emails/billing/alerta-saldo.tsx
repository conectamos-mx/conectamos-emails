import { Section } from "@react-email/components";
import * as React from "react";
import { Layout } from "../_shared/layout";
import {
  EmailLabel,
  EmailTitle,
  EmailText,
  WarnBox,
  MetaRow,
  PrimaryButton,
  GhostButton,
  EmailDivider,
} from "../_shared/components";

export interface AlertaSaldoProps {
  nombre: string;
  saldoActual: number;
  promedioDiario: number;
  estimadoHoras: number;
  urlRecargar: string;
  urlConsumo: string;
}

const defaults: AlertaSaldoProps = {
  nombre: "Carlos",
  saldoActual: 87,
  promedioDiario: 340,
  estimadoHoras: 6,
  urlRecargar: "https://app.conectamos.ai/billing/recharge",
  urlConsumo: "https://app.conectamos.ai/usage",
};

export default function AlertaSaldo(props: AlertaSaldoProps = defaults) {
  const { nombre, saldoActual, promedioDiario, estimadoHoras, urlRecargar, urlConsumo } = props;

  return (
    <Layout preview={`Aviso: tu saldo en ConectamOS está por agotarse — ${saldoActual} mensajes restantes.`} badge="billing">
      <EmailLabel>Aviso importante</EmailLabel>
      <EmailTitle>Tu saldo está por agotarse</EmailTitle>
      <EmailText>
        Hola <strong style={{ color: "#0F2937", fontWeight: 500 }}>{nombre}</strong>, tu saldo de
        mensajes en ConectamOS está por debajo del umbral mínimo. Para evitar interrupciones en tu
        operación, te recomendamos recargar pronto.
      </EmailText>

      <WarnBox>
        <strong style={{ color: "#0F2937", fontWeight: 500 }}>
          Saldo actual: {saldoActual} mensajes restantes.
        </strong>{" "}
        Al llegar a cero, el envío de mensajes se pausará automáticamente hasta que recargues.
      </WarnBox>

      <Section style={{ margin: "22px 0" }}>
        <PrimaryButton href={urlRecargar}>Recargar ahora</PrimaryButton>
        <GhostButton href={urlConsumo}>Ver consumo</GhostButton>
      </Section>

      <EmailDivider />

      <MetaRow
        items={[
          { label: "Saldo actual", value: `${saldoActual} msg` },
          { label: "Promedio diario", value: `~${promedioDiario} msg` },
          { label: "Estimado", value: `~${estimadoHoras} horas` },
        ]}
      />

      <EmailText muted>
        ¿Preguntas sobre tu plan?{" "}
        <a href="mailto:hola@conectamos.ai" style={{ color: "#66E2D0", textDecoration: "none" }}>
          hola@conectamos.ai
        </a>
      </EmailText>
    </Layout>
  );
}
