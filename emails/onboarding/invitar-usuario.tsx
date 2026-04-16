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
  EmailDivider,
} from "../_shared/components";

export interface InvitarUsuarioProps {
  nombreInvitado: string;
  nombreInvitador: string;
  empresa: string;
  rol: string;
  horasExpiracion: number;
  urlInvitacion: string;
}

export const defaults: InvitarUsuarioProps = {
  nombreInvitado: "{{nombreInvitado}}",
  nombreInvitador: "{{nombreInvitador}}",
  empresa: "{{empresa}}",
  rol: "{{rol}}",
  horasExpiracion: "{{horasExpiracion}}" as any,
  urlInvitacion: "{{urlInvitacion}}",
};

export default function InvitarUsuario(props: InvitarUsuarioProps = defaults) {
  const { nombreInvitado, nombreInvitador, empresa, rol, horasExpiracion, urlInvitacion } = props;

  return (
    <Layout preview={`${nombreInvitador} te invitó a unirte a ${empresa} en ConectamOS.`} badge="plataforma">
      <EmailLabel>Nueva invitación</EmailLabel>
      <EmailTitle>Te invitaron a unirte a {empresa}</EmailTitle>
      <EmailText>
        Hola <strong style={{ color: "#0F2937", fontWeight: 500 }}>{nombreInvitado}</strong>,{" "}
        <strong style={{ color: "#0F2937", fontWeight: 500 }}>{nombreInvitador}</strong> te invitó
        como <strong style={{ color: "#0F2937", fontWeight: 500 }}>{rol}</strong> al espacio de
        trabajo de {empresa} en ConectamOS. Acepta la invitación para comenzar.
      </EmailText>

      <InfoBox>
        <strong style={{ color: "#0F2937", fontWeight: 500 }}>ConectamOS</strong> es la plataforma
        de operaciones conversacionales para WhatsApp. Tu cuenta estará lista en menos de 2
        minutos.
      </InfoBox>

      <Section style={{ margin: "22px 0" }}>
        <PrimaryButton href={urlInvitacion}>Aceptar invitación</PrimaryButton>
      </Section>

      <EmailDivider />

      <MetaRow
        items={[
          { label: "Espacio", value: empresa },
          { label: "Rol asignado", value: rol },
          { label: "Expira", value: `en ${horasExpiracion} horas` },
        ]}
      />

      <EmailText muted>
        Si no esperabas esta invitación, puedes ignorar este correo.
      </EmailText>
    </Layout>
  );
}
