import { definePlugin } from "emdash";
import type { PluginDescriptor, ResolvedPlugin } from "emdash";

interface ThaiSonEmailTemplateOptions {
  brandName?: string;
  accentColor?: string;
}

interface SubmissionField {
  label: string;
  value: string;
}

interface ParsedSubmission {
  formName?: string;
  fields: SubmissionField[];
  submittedAt?: string;
}

interface NormalizedPhone {
  display: string;
  href: string;
}

const DEFAULT_OPTIONS = {
  brandName: "THÁI SƠN PLASTIC",
  accentColor: "#0b4f83",
} satisfies Required<ThaiSonEmailTemplateOptions>;

const FORM_EMAIL_SOURCE = "emdash-forms";
const FORM_SUBJECT_PREFIX = "New submission:";

export function thaiSonEmailTemplate(
  options: ThaiSonEmailTemplateOptions = {},
): PluginDescriptor<ThaiSonEmailTemplateOptions> {
  return {
    id: "thai-son-email-template",
    version: "1.1.0",
    entrypoint: "/src/plugins/thai-son-email-template.ts",
    format: "native",
    options,
    capabilities: ["hooks.email-events:register"],
  };
}

export function createPlugin(
  options: ThaiSonEmailTemplateOptions = {},
): ResolvedPlugin {
  const config = { ...DEFAULT_OPTIONS, ...options };

  return definePlugin({
    id: "thai-son-email-template",
    version: "1.1.0",
    capabilities: ["hooks.email-events:register"],
    hooks: {
      "email:beforeSend": {
        errorPolicy: "continue",
        handler: async (event, ctx) => {
          if (
            event.source !== FORM_EMAIL_SOURCE ||
            !event.message.subject.startsWith(FORM_SUBJECT_PREFIX)
          ) {
            return event.message;
          }

          const submission = normalizeSubmission(
            parseSubmissionText(event.message.text),
          );
          const customerName = findFieldValue(submission.fields, isNameField);
          const subject = customerName
            ? `[Website] Yêu cầu tư vấn mới - ${customerName}`
            : "[Website] Yêu cầu tư vấn mới";

          return {
            ...event.message,
            subject,
            text: renderSubmissionText(submission),
            html: renderSubmissionEmail({
              config,
              submission,
              logoUrl: ctx.url("/images/logo.png"),
              submissionsUrl: ctx.url(
                "/_emdash/admin/plugins/emdash-forms/submissions",
              ),
            }),
          };
        },
      },
    },
  });
}

function parseSubmissionText(text: string): ParsedSubmission {
  const lines = text.split(/\r?\n/);
  const firstLine = lines[0]?.trim() ?? "";
  const formName = firstLine.match(/^New submission for ["“](.+?)["”]$/)?.[1];
  const fields: SubmissionField[] = [];
  let submittedAt: string | undefined;

  for (const rawLine of lines.slice(1)) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith("Submitted at:")) {
      submittedAt = line.slice("Submitted at:".length).trim();
      continue;
    }

    const separatorIndex = line.indexOf(":");
    if (separatorIndex > 0) {
      fields.push({
        label: line.slice(0, separatorIndex).trim(),
        value: line.slice(separatorIndex + 1).trim(),
      });
      continue;
    }

    const previousField = fields.at(-1);
    if (previousField) {
      previousField.value += `\n${line}`;
    }
  }

  return { formName, fields, submittedAt };
}

function normalizeLabel(label: string): string {
  return label.trim().toLocaleLowerCase("vi-VN");
}

function isNameField(label: string): boolean {
  const normalized = normalizeLabel(label);
  return ["họ và tên", "họ tên", "name", "full name"].includes(normalized);
}

function isPhoneField(label: string): boolean {
  const normalized = normalizeLabel(label);
  return (
    normalized.includes("điện thoại") ||
    normalized.includes("phone") ||
    normalized === "tel"
  );
}

function isEmailField(label: string): boolean {
  return normalizeLabel(label).includes("email");
}

function isMessageField(label: string): boolean {
  const normalized = normalizeLabel(label);
  return ["nội dung", "tư vấn", "lời nhắn", "message", "request"].some(
    (keyword) => normalized.includes(keyword),
  );
}

function isConsentField(label: string): boolean {
  const normalized = normalizeLabel(label);
  return normalized.includes("đồng ý") || normalized.includes("consent");
}

function findFieldValue(
  fields: SubmissionField[],
  predicate: (label: string) => boolean,
): string | undefined {
  return fields.find((field) => predicate(field.label))?.value;
}

function normalizePhoneNumber(value: string): NormalizedPhone {
  const trimmed = value.trim();
  let dialable = trimmed.replace(/[^\d+]/g, "");

  // A Vietnamese mobile number becomes 9 digits when a numeric field strips
  // its leading zero. Restore it for existing EmDash forms configured as number.
  if (/^\d{9}$/.test(dialable)) {
    dialable = `0${dialable}`;
  } else if (/^84\d{9}$/.test(dialable)) {
    dialable = `+${dialable}`;
  }

  let display = dialable || trimmed;
  if (/^0\d{9}$/.test(dialable)) {
    display = dialable.replace(/^(\d{4})(\d{3})(\d{3})$/, "$1 $2 $3");
  } else if (/^\+84\d{9}$/.test(dialable)) {
    display = dialable.replace(/^(\+84)(\d{3})(\d{3})(\d{3})$/, "$1 $2 $3 $4");
  }

  return { display, href: dialable };
}

function normalizeSubmission(submission: ParsedSubmission): ParsedSubmission {
  return {
    ...submission,
    fields: submission.fields.map((field) =>
      isPhoneField(field.label)
        ? { ...field, value: normalizePhoneNumber(field.value).display }
        : field,
    ),
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getSafeAccentColor(value: string): string {
  return /^#[\da-f]{6}$/i.test(value) ? value : DEFAULT_OPTIONS.accentColor;
}

function renderFieldValue(field: SubmissionField, accentColor: string): string {
  const value = field.value.trim();
  const escapedValue = escapeHtml(value).replaceAll("\n", "<br>");

  if (isEmailField(field.label) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return `<a href="mailto:${escapeHtml(value)}" style="color:${accentColor};text-decoration:none;font-weight:600;">${escapedValue}</a>`;
  }

  if (isPhoneField(field.label)) {
    const phone = normalizePhoneNumber(value);
    return `<a href="tel:${escapeHtml(phone.href)}" style="color:${accentColor};text-decoration:none;font-weight:600;white-space:nowrap;">${escapeHtml(phone.display)}</a>`;
  }

  if (
    isConsentField(field.label) &&
    ["true", "1", "on", "yes"].includes(value.toLowerCase())
  ) {
    return '<span style="color:#247a46;font-weight:600;">✓ Khách hàng đã đồng ý cung cấp thông tin</span>';
  }

  return escapedValue;
}

function formatSubmittedAt(value?: string): string {
  if (!value) return "Vừa gửi";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function renderSubmissionText(submission: ParsedSubmission): string {
  const lines = [
    "YÊU CẦU TƯ VẤN MỚI TỪ WEBSITE",
    submission.formName ? `Biểu mẫu: ${submission.formName}` : "",
    "",
    ...submission.fields.map((field) => `${field.label}: ${field.value}`),
    "",
    `Thời gian gửi: ${formatSubmittedAt(submission.submittedAt)} (GMT+7)`,
  ];

  return lines.filter((line, index) => line || lines[index - 1] !== "").join("\n");
}

function renderSubmissionEmail({
  config,
  submission,
  logoUrl,
  submissionsUrl,
}: {
  config: Required<ThaiSonEmailTemplateOptions>;
  submission: ParsedSubmission;
  logoUrl: string;
  submissionsUrl: string;
}): string {
  const brandName = escapeHtml(config.brandName);
  const accentColor = getSafeAccentColor(config.accentColor);
  const submittedAt = escapeHtml(formatSubmittedAt(submission.submittedAt));
  const safeLogoUrl = escapeHtml(logoUrl);
  const safeSubmissionsUrl = escapeHtml(submissionsUrl);
  const customerName =
    findFieldValue(submission.fields, isNameField) ?? "Khách hàng mới";
  const customerEmail = findFieldValue(submission.fields, isEmailField);
  const customerPhoneValue = findFieldValue(submission.fields, isPhoneField);
  const customerPhone = customerPhoneValue
    ? normalizePhoneNumber(customerPhoneValue)
    : undefined;
  const messageFields = submission.fields.filter((field) =>
    isMessageField(field.label),
  );
  const detailFields = submission.fields.filter(
    (field) => !isMessageField(field.label) && !isConsentField(field.label),
  );
  const consentField = submission.fields.find((field) =>
    isConsentField(field.label),
  );

  const detailRows = detailFields
    .map(
      (field) => `
        <tr>
          <td class="detail-label" width="175" valign="top" style="width:175px;padding:13px 16px;border-bottom:1px solid #e8edf2;color:#647386;font-size:13px;line-height:1.5;">
            ${escapeHtml(field.label)}
          </td>
          <td class="detail-value" valign="top" style="padding:13px 16px;border-bottom:1px solid #e8edf2;color:#14283d;font-size:14px;font-weight:500;line-height:1.55;word-break:break-word;">
            ${renderFieldValue(field, accentColor)}
          </td>
        </tr>`,
    )
    .join("");

  const messageBlocks = messageFields
    .map(
      (field) => `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;margin-top:10px;border:1px solid #dfe7ee;border-radius:8px;background:#f7f9fb;">
          <tr>
            <td style="padding:17px 18px;">
              <div style="margin-bottom:7px;color:#647386;font-size:12px;font-weight:600;letter-spacing:.02em;">${escapeHtml(field.label)}</div>
              <div style="color:#14283d;font-size:15px;line-height:1.7;word-break:break-word;">${renderFieldValue(field, accentColor)}</div>
            </td>
          </tr>
        </table>`,
    )
    .join("");

  const emailAction =
    customerEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)
      ? `<td class="action-cell" style="padding:0 6px 8px 0;"><a href="mailto:${escapeHtml(customerEmail)}" style="display:block;padding:11px 17px;border-radius:7px;background:${accentColor};color:#ffffff;font-size:13px;font-weight:600;text-align:center;text-decoration:none;">Gửi email cho khách</a></td>`
      : "";
  const phoneAction = customerPhone?.href
    ? `<td class="action-cell" style="padding:0 0 8px 6px;"><a href="tel:${escapeHtml(customerPhone.href)}" style="display:block;padding:10px 17px;border:1px solid #ccd7e0;border-radius:7px;background:#ffffff;color:#253e56;font-size:13px;font-weight:600;text-align:center;text-decoration:none;">Gọi ${escapeHtml(customerPhone.display)}</a></td>`
    : "";

  return `<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      @media only screen and (max-width: 620px) {
        .email-padding { padding: 16px 8px !important; }
        .content-padding { padding-left: 20px !important; padding-right: 20px !important; }
        .detail-label, .detail-value { display: block !important; box-sizing: border-box !important; width: 100% !important; }
        .detail-label { padding-bottom: 2px !important; border-bottom: 0 !important; }
        .detail-value { padding-top: 2px !important; }
        .action-cell { display: block !important; box-sizing: border-box !important; width: 100% !important; padding: 0 0 8px !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background:#eef2f5;color:#14283d;font-family:'Segoe UI',Roboto,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${escapeHtml(customerName)} vừa gửi yêu cầu tư vấn qua website ${brandName}.
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;background:#eef2f5;">
      <tr>
        <td class="email-padding" align="center" style="padding:34px 12px;">
          <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="width:100%;max-width:640px;border-collapse:separate;background:#ffffff;border:1px solid #dfe6ec;border-radius:10px;overflow:hidden;">
            <tr><td height="5" style="height:5px;background:${accentColor};font-size:0;line-height:0;">&nbsp;</td></tr>
            <tr>
              <td class="content-padding" style="padding:24px 32px;border-bottom:1px solid #e8edf2;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="66" valign="middle" style="width:66px;">
                      <img src="${safeLogoUrl}" width="54" height="54" alt="Thái Sơn Plastic" style="display:block;width:54px;height:54px;border:1px solid #e1e7ec;border-radius:50%;object-fit:cover;">
                    </td>
                    <td valign="middle">
                      <div style="color:#102d49;font-size:17px;font-weight:700;letter-spacing:.01em;">${brandName}</div>
                      <div style="margin-top:4px;color:#748294;font-size:12px;line-height:1.4;">Bộ phận tiếp nhận yêu cầu từ website</div>
                    </td>
                    <td valign="middle" align="right" style="color:#748294;font-size:12px;white-space:nowrap;">${submittedAt}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td class="content-padding" style="padding:30px 32px 22px;">
                <div style="margin-bottom:10px;color:${accentColor};font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;">Yêu cầu tư vấn từ website</div>
                <h1 style="margin:0 0 10px;color:#102d49;font-size:25px;font-weight:700;line-height:1.3;letter-spacing:-.015em;">Có khách hàng mới cần được hỗ trợ</h1>
                <p style="margin:0;color:#596a7c;font-size:14px;line-height:1.65;">Thông tin dưới đây vừa được gửi qua biểu mẫu${submission.formName ? ` <strong style="color:#344a60;">${escapeHtml(submission.formName)}</strong>` : ""}. Vui lòng kiểm tra và liên hệ lại với khách hàng trong thời gian sớm nhất.</p>
              </td>
            </tr>
            <tr>
              <td class="content-padding" style="padding:0 32px 24px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border:1px solid #dfe7ee;border-radius:8px;background:#f8fafb;">
                  <tr>
                    <td style="padding:18px 20px;">
                      <div style="color:#748294;font-size:12px;font-weight:600;">Khách hàng</div>
                      <div style="margin-top:4px;color:#102d49;font-size:20px;font-weight:700;line-height:1.35;">${escapeHtml(customerName)}</div>
                      <div style="margin-top:8px;color:#53677a;font-size:13px;line-height:1.6;">
                        ${customerPhone ? `<span style="white-space:nowrap;">${escapeHtml(customerPhone.display)}</span>` : ""}
                        ${customerPhone && customerEmail ? `<span style="padding:0 7px;color:#b0bac3;">•</span>` : ""}
                        ${customerEmail ? `<span>${escapeHtml(customerEmail)}</span>` : ""}
                      </div>
                    </td>
                  </tr>
                </table>
                ${emailAction || phoneAction ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;margin-top:12px;"><tr>${emailAction}${phoneAction}</tr></table>` : ""}
              </td>
            </tr>
            <tr>
              <td class="content-padding" style="padding:0 32px 24px;">
                <h2 style="margin:0 0 10px;color:#243f59;font-size:15px;font-weight:700;line-height:1.4;">Thông tin khách hàng</h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border:1px solid #dfe7ee;border-radius:8px;border-collapse:separate;overflow:hidden;">
                  ${detailRows}
                </table>
              </td>
            </tr>
            ${messageBlocks ? `<tr><td class="content-padding" style="padding:0 32px 24px;"><h2 style="margin:0;color:#243f59;font-size:15px;font-weight:700;line-height:1.4;">Nội dung cần tư vấn</h2>${messageBlocks}</td></tr>` : ""}
            ${consentField ? `<tr><td class="content-padding" style="padding:0 32px 22px;color:#5f7082;font-size:12px;line-height:1.5;">${renderFieldValue(consentField, accentColor)}</td></tr>` : ""}
            <tr>
              <td class="content-padding" style="padding:22px 32px 26px;border-top:1px solid #e8edf2;text-align:center;">
                <a href="${safeSubmissionsUrl}" style="display:inline-block;padding:12px 20px;border-radius:7px;background:${accentColor};color:#ffffff;font-size:13px;font-weight:600;text-decoration:none;">Mở yêu cầu trong EmDash</a>
                <p style="margin:13px 0 0;color:#7a8795;font-size:11px;line-height:1.6;">Thời gian tiếp nhận: ${submittedAt} (GMT+7)</p>
              </td>
            </tr>
            <tr>
              <td class="content-padding" style="padding:18px 32px;background:#f8fafb;color:#7a8795;font-size:11px;line-height:1.6;text-align:center;">
                Đây là email thông báo tự động từ website ${brandName}.<br>
                Không chuyển tiếp email này ra bên ngoài nếu có thông tin khách hàng.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
