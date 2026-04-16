import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Row,
  Column,
  Text,
  Hr,
} from "@react-email/components";
import * as React from "react";

// ─── Logo wordmark URL pública ────────────────────────────────────────────────
const LOGO_URL =
  "https://atqmtsmjpjtrqooibubm.supabase.co/storage/v1/object/public/wa-media/assets/logo.svg";

// ─── Tipos ───────────────────────────────────────────────────────────────────
export interface LayoutProps {
  preview: string;
  badge?: string;
  children: React.ReactNode;
}

// ─── Tokens de diseño ────────────────────────────────────────────────────────
export const colors = {
  navy: "#0F2937",
  navyDark: "#0a1e2a",
  teal: "#66E2D0",
  tealLight: "#f5fffe",
  tealBorder: "#c8f0ea",
  text: "#0F2937",
  textMuted: "#4a5a6a",
  textSubtle: "#8a9aaa",
  border: "#eeeee6",
  bg: "#ffffff",
  warnBg: "#fffbf0",
  warnBorder: "#f0dca0",
  warnText: "#5a4a1a",
};

export const fonts = {
  // Email-safe font stack priorizando Geist y Onest desde Google Fonts
  // React Email incluye el <link> via el componente Font si se necesita
  sans: "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  display: "'Onest', 'Geist', -apple-system, sans-serif",
};

// ─── Componente layout principal ─────────────────────────────────────────────
export function Layout({ preview, badge = "plataforma", children }: LayoutProps) {
  return (
    <Html lang="es" dir="ltr">
      <Head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500&family=Onest:wght@400;500;600&display=swap');
          * { box-sizing: border-box; }
          body { margin: 0; padding: 0; background-color: #e8e8e2; }
        `}</style>
      </Head>
      <Preview>{preview}</Preview>
      <Body style={bodyStyle}>
        <Container style={containerStyle}>

          {/* ── Header ── */}
          <Section style={headerStyle}>
            <Row>
              <Column>
                <Img
                  src={LOGO_URL}
                  width="126"
                  height="20"
                  alt="ConectamOS"
                />
              </Column>
              <Column align="right">
                <Text style={badgeStyle}>{badge}</Text>
              </Column>
            </Row>
          </Section>

          {/* ── Accent bar ── */}
          <Section style={accentBarStyle} />

          {/* ── Body ── */}
          <Section style={bodyContentStyle}>
            {children}
          </Section>

          {/* ── Footer ── */}
          <Section style={footerStyle}>
            <Row style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid rgba(102,226,208,0.12)" }}>
              <Column>
                <Img
                  src={LOGO_URL}
                  width="90"
                  height="14"
                  alt="ConectamOS"
                  style={{ opacity: 0.4 }}
                />
              </Column>
              <Column align="right">
                <Row>
                  {["Plataforma", "Soporte", "Privacidad"].map((label) => (
                    <Column key={label} style={{ paddingLeft: "12px" }}>
                      <Link href="https://conectamos.ai" style={footerLinkStyle}>
                        {label}
                      </Link>
                    </Column>
                  ))}
                </Row>
              </Column>
            </Row>
            <Text style={footerLegalStyle}>
              Recibiste este correo porque tienes una cuenta activa en ConectamOS.
              {"\n"}
              Enviado desde{" "}
              <Link href="mailto:noreply@conectamos.ai" style={footerAnchorStyle}>
                noreply@conectamos.ai
              </Link>{" "}
              · Conectamos Tech & Delivery Solutions SAPI de CV · CDMX, México.
              {"\n"}
              <Link href="https://conectamos.ai/privacidad" style={footerAnchorStyle}>
                Aviso de privacidad
              </Link>{" "}
              ·{" "}
              <Link href="https://conectamos.ai/terminos" style={footerAnchorStyle}>
                Términos y condiciones
              </Link>{" "}
              ·{" "}
              <Link href="{{unsubscribe_url}}" style={footerAnchorStyle}>
                Cancelar suscripción
              </Link>
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
}

// ─── Estilos inline (requeridos por clientes de email) ───────────────────────
const bodyStyle: React.CSSProperties = {
  backgroundColor: "#e8e8e2",
  fontFamily: fonts.sans,
  margin: 0,
  padding: "28px 0 40px",
};

const containerStyle: React.CSSProperties = {
  maxWidth: "580px",
  margin: "0 auto",
};

const headerStyle: React.CSSProperties = {
  backgroundColor: colors.navy,
  borderRadius: "10px 10px 0 0",
  padding: "22px 36px",
};

const accentBarStyle: React.CSSProperties = {
  height: "3px",
  background: `linear-gradient(90deg, ${colors.teal} 0%, #2DD4BF 60%, transparent 100%)`,
};

const badgeStyle: React.CSSProperties = {
  fontFamily: fonts.sans,
  fontSize: "10px",
  fontWeight: 500,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#4a6a7a",
  margin: 0,
  textAlign: "right",
};

const bodyContentStyle: React.CSSProperties = {
  backgroundColor: colors.bg,
  padding: "36px 36px 28px",
  borderLeft: `1px solid ${colors.border}`,
  borderRight: `1px solid ${colors.border}`,
};

const footerStyle: React.CSSProperties = {
  backgroundColor: colors.navyDark,
  borderRadius: "0 0 10px 10px",
  padding: "24px 36px 28px",
};

const footerLinkStyle: React.CSSProperties = {
  fontFamily: fonts.sans,
  fontSize: "11px",
  color: "rgba(102,226,208,0.6)",
  textDecoration: "none",
};

const footerLegalStyle: React.CSSProperties = {
  fontFamily: fonts.sans,
  fontSize: "11px",
  color: "#3a5a6a",
  lineHeight: "1.75",
  margin: 0,
  whiteSpace: "pre-line",
};

const footerAnchorStyle: React.CSSProperties = {
  color: "rgba(102,226,208,0.5)",
  textDecoration: "none",
};
