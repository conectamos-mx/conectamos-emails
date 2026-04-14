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

// ─── Logo wordmark inline como SVG base64 ───────────────────────────────────
// El SVG del wordmark ConectamOS en teal #66E2D0
const LOGO_SVG_BASE64 =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYxIiBoZWlnaHQ9IjMyIiB2aWV3Qm94PSIwIDAgMTYxIDMyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMCkiPjxwYXRoIGQ9Ik05Mi4zMjE4IDMuODkxMjNMOTMuMzg3NiAzLjQ5ODM5TDkyLjMyMTggMy4xMDMzOEM5MS4zNzE5IDIuNzUyMDEgOTAuNjIzNCAyLjAwNTYyIDkwLjI3MSAxLjA1NjI3TDg5Ljg3OTMgLTAuMDAyMTk3MjdMODkuNDg1MyAxLjA2MDY0Qzg5LjEzNTIgMi4wMDU2MiA4OC4zODY3IDIuNzUyMDEgODcuNDM5IDMuMTAzMzhMODYuMzY4OCAzLjQ5ODM5TDg3LjQzNDYgMy44OTEyM0M4OC4zODQ1IDQuMjQwNDEgODkuMTMzIDQuOTg2OCA4OS40ODMxIDUuOTMzOTdMODkuODc3MSA2Ljk5NjhMOTAuMjcxIDUuOTMzOTdDOTAuNjIxMiA0Ljk4NjggOTEuMzY5NyA0LjI0MDQxIDkyLjMxOTYgMy44OTEyMyIgZmlsbD0iIzY2RTJEMCIvPjxwYXRoIGQ9Ik02LjYxNjE0IDEzLjIxNDVDOC4xMDg3NiAxMy4yMTQ1IDkuMzM0MzggMTMuOTU4NyAxMC4wMDYzIDE1LjE1NjhIMTIuODg4N0MxMi4wMTk4IDEyLjUzNTggOS42NDUxNiAxMC44MDI5IDYuNjE2MTQgMTAuODAyOUMyLjc5OTIyIDEwLjgwMjkgMCAxMy41OTQyIDAgMTcuNDAwNEMwIDIxLjIwNjUgMi43OTkyMiAyMy45OTc4IDYuNjE2MTQgMjMuOTk3OEM5LjY0Mjk3IDIzLjk5NzggMTIuMDE3NiAyMi4yNjUgMTIuODg4NyAxOS42NDYxSDkuOTk5NzFDOS4zMjc4MSAyMC44MzExIDguMTA0MzkgMjEuNTg4NCA2LjYxNjE0IDIxLjU4ODRDNC4zMjY4NiAyMS41ODg0IDIuNjcwMDkgMTkuODExOSAyLjY3MDA5IDE3LjQwMDRDMi42NzAwOSAxNC45ODg4IDQuMzI2ODYgMTMuMjEyMyA2LjYxNjE0IDEzLjIxMjMiIGZpbGw9IiM2NkUyRDAiLz48cGF0aCBkPSJNMTU0LjY5IDE2LjAxNDVDMTUyLjEzOCAxNi4wMTQ1IDE1MS4wNjYgMTUuNjM0OCAxNTEuMDY2IDE0LjY3MjRDMTUxLjA2NiAxMy41NTcxIDE1Mi4yNzQgMTIuOTc0NCAxNTQuNTU3IDEyLjk3NDRDMTU2LjY1MSAxMi45NzQ0IDE1OC4wNDggMTMuNjgzNyAxNTguMDQ4IDE0Ljc0ODdIMTYwLjczM0MxNjAuNzMzIDEyLjMxNTQgMTU4LjI2MiAxMC42OTM4IDE1NC41NTcgMTAuNjkzOEMxNTAuNTMgMTAuNjkzOCAxNDguMzgxIDEyLjA4ODQgMTQ4LjM4MSAxNC42NzI0QzE0OC4zODEgMTcuMjU2MyAxNTAuMjA2IDE4LjI5NzMgMTU0LjQ1IDE4LjI5NzNDMTU3LjEzNSAxOC4yOTczIDE1OC4zMTcgMTguNzI3MyAxNTguMzE3IDE5Ljc0MjFDMTU4LjMxNyAyMC45MzM3IDE1Ny4wMDEgMjEuNTkyOCAxNTQuNTU3IDIxLjU5MjhDMTUyLjMgMjEuNTkyOCAxNTAuNzk3IDIwLjg4MzUgMTUwLjc5NyAxOS44MTg1SDE0OC4xMTFDMTQ4LjExMSAyMi4yNTE5IDE1MC42OSAyMy44NzM0IDE1NC41NTcgMjMuODczNEMxNTguNzQ2IDIzLjg3MzQgMTYxIDIyLjQyODcgMTYxIDE5Ljc0MjFDMTYxIDE3LjA1NTYgMTU5LjEyIDE2LjAxNjcgMTU0LjY5IDE2LjAxNjciIGZpbGw9IiM2NkUyRDAiLz48cGF0aCBkPSJNMzcuODEyNCAxMC42NTY3QzM0LjIyNzUgMTAuNjU2NyAzMS4zMjEgMTMuNTg1NSAzMS4zMjEgMTcuMjAxOFYyMy43NDY4SDMzLjk2MDVWMTcuMjAxOEMzMy45NjA1IDE1LjA1NjUgMzUuNjg1MSAxMy4zMTcxIDM3LjgxMjQgMTMuMzE3MUMzOS45Mzk4IDEzLjMxNzEgNDEuNjY0NCAxNS4wNTY1IDQxLjY2NDQgMTcuMjAxOFYyMy43NDY4SDQ0LjMwMzhWMTcuMjAxOEM0NC4zMDM4IDEzLjU4NzcgNDEuMzk3NCAxMC42NTY3IDM3LjgxMjQgMTAuNjU2N1oiIGZpbGw9IiM2NkUyRDAiLz48cGF0aCBkPSJNNDYuOTQzMiAxMi45MjJWMjEuNjIzM0M0Ni45NDMyIDIyLjc5NTMgNDcuODk1MyAyMy43NDQ2IDQ5LjA3MDYgMjMuNzQ0Nkg1Ny4zOTgyVjIxLjQxMzhINDkuNDg2NFYxOC40MzdINTcuMzgyOVYxNi4xMDYySDQ5LjQ4NjRWMTMuMTI5NEg1Ny4zOTgyVjEwLjc5ODZINDkuMDcwNkM0Ny44OTUzIDEwLjc5ODYgNDYuOTQzMiAxMS43NDc5IDQ2Ljk0MzIgMTIuOTE5OSIgZmlsbD0iIzY2RTJEMCIvPjxwYXRoIGQ9Ik04My4yMTA2IDE5LjYxNzdWMTQuNTIxOEM4My4yMTA2IDEyLjQ3NjggODEuNTMxOSAxMC44MDI5IDc5LjQ4MTIgMTAuODAyOUg3NS4zMTg1VjEzLjIyMUg3OS40ODEyQzgwLjA3ODcgMTMuMjIxIDgwLjU2NDUgMTMuNzAzMyA4MC41NjQ1IDE0LjMwMTNWMjAuMjc0NkM4MC41NjQ1IDIyLjE5MjkgODIuMTIyOCAyMy43NDY4IDg0LjA0NjYgMjMuNzQ2OEg4OC4xMTc0VjIxLjExNDhIODQuNzEyQzgzLjg4MjUgMjEuMTE0OCA4My4yMTA2IDIwLjQ0NDggODMuMjEwNiAxOS42MTc3WiIgZmlsbD0iIzY2RTJEMCIvPjxwYXRoIGQ9Ik04Mi45MTczIDcuNDY2MDFWMY40OTgzOEg4MC41MTg2VjcuNDY2MDFDODA1MTg2IDkuMzc5OTkgODIuMDgxMiAxMC45MzgyIDg0LjAwMDYgMTAuOTM4Mkg4OC4xNjMzVjguNTQ2M0g4NC4wMDA2QzgzLjQwMzEgOC41NDYzIDgyLjkxNzMgOC4wNjE4MSA4Mi45MTczIDcuNDY2MDFaIiBmaWxsPSIjNjZFMkQwIi8+PHBhdGggZD0iTTIyLjEwNDggMjEuMTg2OUMxOS45ODg0IDIxLjE4NjkgMTguMjcwNCAxOS40NzM3IDE4LjI3MDQgMTcuMzYzM0MxOC4yNzA0IDE1LjI1MjkgMTkuOTg4NCAxMy41Mzc1IDIyLjEwNDggMTMuNTM3NUMyNC4yMjEyIDEzLjUzNzUgMjUuOTQxNCAxNS4yNTA3IDI1Ljk0MTQgMTcuMzYzM0MyNS45NDE0IDE5LjQ3NTggMjQuMjIzNCAyMS4xODY5IDIyLjEwNDggMjEuMTg2OVpNMjIuMTA0OCAxMC44MDUxQzE4LjQ3MzkgMTAuODA1MSAxNS41MjgxIDEzLjc0MjYgMTUuNTI4MSAxNy4zNjMzQzE1LjUyODEgMjAuOTgzOSAxOC40NzYxIDIzLjkyMzYgMjIuMTA0OCAyMy45MjM2QzI1LjczMzUgMjMuOTIzNiAyOC42ODU5IDIwLjk4NjEgMjguNjg1OSAxNy4zNjMzQzI4LjY4NTkgMTMuNzQwNSAyNS43Mzc5IDEwLjgwNTEgMjIuMTA0OCAxMC44MDUxWiIgZmlsbD0iIzY2RTJEMCIvPjxwYXRoIGQ9Ik0xMzguODkzIDIxLjE4NjlDMTM2Ljc3NyAyMS4xODY5IDEzNS4wNTggMTkuNDczNyAxMzUuMDU4IDE3LjM2MzNDMTM1LjA1OCAxNS4yNTI5IDEzNi43NzcgMTMuNTM3NSAxMzguODkzIDEzLjUzNzVDMTQxLjAwOSAxMy41Mzc1IDE0Mi43MyAxNS4yNTA3IDE0Mi43MyAxNy4zNjMzQzE0Mi43MyAxOS40NzU4IDE0MS4wMTEgMjEuMTg2OSAxMzguODkzIDIxLjE4NjlaTE0xMzguODkzIDEwLjgwNTFDMTM1LjI2MiAxMC44MDUxIDEzMi4zMTQgMTMuNzQyNiAxMzIuMzE0IDE3LjM2MzNDMTMyLjMxNCAyMC45ODM5IDEzNS4yNjIgMjMuOTIzNiAxMzguODkzIDIzLjkyMzZDMTQyLjUyNCAyMy45MjM2IDE0NS40NzQgMjAuOTg2MSAxNDUuNDc0IDE3LjM2MzNDMTQ1LjQ3NCAxMy43NDA1IDE0Mi41MjYgMTAuODA1MSAxMzguODkzIDEwLjgwNTFaIiBmaWxsPSIjNjZFMkQwIi8+PHBhdGggZD0iTTY2Ljc1NjcgMTAuODA1MUM2Ni43MjgyIDEwLjgwMjkgNjYuNjk5OCAxMC44MDI5IDY2LjY3MTMgMTAuODAyOUM2Mi44NTIyIDEwLjgwMjkgNjAuMDU1MiAxMy41OTQyIDYwLjA1NTIgMTcuNDAwNEM2MC4wNTUyIDIxLjIwNjUgNjIuODU0NCAyMy45OTc4IDY2LjY3MTMgMjMuOTk3OEM2OS42OTYgMjMuOTk3OCA3Mi4wNzA2IDIyLjI2NSA3Mi45NDE3IDE5LjY0MzlINzAuMDU0OUM2OS4zODMgMjAuODI4OSA2OC4xNTc0IDIxLjU4NCA2Ni42NzEzIDIxLjU4NEM2NC4zNzk5IDIxLjU4NCA2Mi43MjMxIDE5LjgwNzYgNjIuNzIzMSAxNy4zOTgyQzYyLjcyMzEgMTQuOTg4OCA2NC4zNzk5IDEzLjIwNzkgNjYuNjcxMyAxMy4yMDc5QzY2LjY5OTggMTMuMjA3OSA2Ni43MjgyIDEzLjIwNzkgNjYuNzU2NyAxMy4yMTAxVjEzLjIwNThINzIuOTQxN1YxMC43OTg2SDY2Ljc1NjdWMTAuODA1MVoiIGZpbGw9IiM2NkUyRDAiLz48cGF0aCBkPSJNOTMuNDA5NSAxOC40NjU0VjE3LjE5OTZDOTMuNDA5NSAxNS4wNTQzIDk1LjEzNDEgMTMuMzE0OSA5Ny4yNjE0IDEzLjMxNDlDOTkuMzg4NyAxMy4zMTQ5IDEwMS4xMTMgMTUuMDU0MyAxMDEuMTEzIDE3LjE5OTZWMTguNDY1NEg5My40MDk1Wk05Ny4yNjE0IDEwLjY1NjdDOTMuNjc2NSAxMC42NTY3IDkwLjc3IDEzLjU4NTUgOTAuNzcgMTcuMjAxOFYyMy43NDY4SDkzLjQwOTVWMjEuMTA4M0gxMDEuMTEzVjIzLjc0NjhIMTAzLjc1M1YxNy4yMDE4QzEwMy43NTMgMTMuNTg3NyAxMDAuODQ2IDEwLjY1NjcgOTcuMjYxNCAxMC42NTY3WiIgZmlsbD0iIzY2RTJEMCIvPjxwYXRoIGQ9Ik0xMjMuMjI5IDEwLjY1NjdDMTIxLjExNSAxMC42NTY3IDExOS4yNDQgMTEuNjgwMyAxMTguMDU3IDEzLjI1ODJDMTE2Ljg3MSAxMS42ODAzIDExNSAxMC42NTY3IDExMi44ODYgMTAuNjU2N0MxMDkuMzAxIDEwLjY1NjcgMTA2LjM5NCAxMy41ODU1IDEwNi4zOTQgMTcuMjAxOFYyMy43NDY4SDEwOS4wMzRWMTcuMjAxOEMxMDkuMDM0IDE1LjA1NjUgMTEwLjc1OCAxMy4zMTcxIDExMi44ODYgMTMuMzE3MUMxMTUuMDEzIDEzLjMxNzEgMTE2LjczNiAxNS4wNTQzIDExNi43MzggMTcuMTk3NFYyMy43NDQ3SDExOS4zNzdWMTcuMTk5NkMxMTkuMzc3IDE1LjA1MjEgMTIxLjEwMiAxMy4zMTQ5IDEyMy4yMjkgMTMuMzE0OUMxMjUuMzU2IDEzLjMxNDkgMTI3LjA4MSAxNS4wNTQzIDEyNy4wODEgMTcuMTk5NlYyMy43NDQ3SDEyOS43MjFWMTcuMTk5NkMxMjkuNzIxIDEzLjU4NTUgMTI2LjgxNCAxMC42NTQ1IDEyMy4yMjkgMTAuNjU0NSIgZmlsbD0iIzY2RTJEMCIvPjwvZz48ZGVmcz48Y2xpcFBhdGggaWQ9ImNsaXAwIj48cmVjdCB3aWR0aD0iMTYxIiBoZWlnaHQ9IjI0IiBmaWxsPSJ3aGl0ZSIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPg==";

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
                  src={LOGO_SVG_BASE64}
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
                  src={LOGO_SVG_BASE64}
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
