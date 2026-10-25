import express from "express";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Studio Owner & Publisher Security Config (RBAC)
const AUTHORIZED_PUBLISHER_EMAIL = "hoah22535@gmail.com";
const AUTHORIZED_OWNER_EMAIL = "hoah22535@gmail.com";
const NPH_SECRET_TOKEN = "NPH_SECURE_SESSION_TOKEN_QUYNH_HOA_STUDIO_2026";
const CHARACTERS_FILE_PATH = path.join(process.cwd(), "src", "data", "characters.json");
const LOCKED_CHARACTERS_FILE_PATH = path.join(process.cwd(), "src", "data", "locked_characters.json");

// In-memory Server Session Registry
interface OwnerSession {
  token: string;
  email: string;
  createdAt: number;
  expiresAt: number;
}
const activeOwnerSessions = new Map<string, OwnerSession>();

// In-memory Email OTP Storage
interface PendingOtp {
  code: string;
  email: string;
  expiresAt: number;
  attempts: number;
  lastSentAt: number;
}
const pendingOtps = new Map<string, PendingOtp>();

// Helper: Send OTP Email via Gmail SMTP
async function sendOtpEmail(toEmail: string, otpCode: string): Promise<{ success: boolean; error?: string }> {
  const gmailUser = process.env.GMAIL_USER || process.env.SMTP_USER || AUTHORIZED_OWNER_EMAIL;
  const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || process.env.EMAIL_PASSWORD;

  if (!gmailPass) {
    console.warn(`[OTP DEV MODE] GMAIL_APP_PASSWORD not set in env. OTP generated for ${toEmail}. Set GMAIL_APP_PASSWORD to send real emails via smtp.gmail.com.`);
    return { success: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    await transporter.sendMail({
      from: `"Quỳnh Hoa Story Studio" <${gmailUser}>`,
      to: toEmail,
      subject: `[Quỳnh Hoa Story Studio] 🔏 Mã Thần Chú Xác Thực OTP: ${otpCode}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0d0118; margin: 0; padding: 24px; color: #f3e8ff; }
            .container { max-width: 560px; margin: 0 auto; background: linear-gradient(180deg, #1f0438 0%, #120122 100%); border: 2px solid #ec4899; border-radius: 24px; padding: 36px 28px; box-shadow: 0 15px 35px rgba(0,0,0,0.6); text-align: center; }
            .header-title { font-size: 24px; font-weight: 800; color: #f472b6; margin: 0 0 6px; letter-spacing: 0.5px; }
            .header-sub { font-size: 13px; color: #c084fc; margin: 0 0 24px; font-style: italic; }
            .greeting { font-size: 15px; color: #e9d5ff; margin-bottom: 12px; }
            .desc { font-size: 14px; color: #d8b4fe; line-height: 1.6; margin-bottom: 24px; }
            .otp-box { background: linear-gradient(135deg, #ec4899 0%, #9333ea 50%, #6366f1 100%); color: #ffffff; font-size: 36px; font-weight: 900; letter-spacing: 10px; padding: 16px 32px; border-radius: 16px; font-family: 'Courier New', Courier, monospace; display: inline-block; box-shadow: 0 8px 25px rgba(236,72,153,0.5); text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
            .expiry { font-size: 12px; color: #f472b6; font-weight: 600; margin-top: 20px; }
            .footer { font-size: 11px; color: #a1a1aa; line-height: 1.5; margin-top: 28px; border-top: 1px solid rgba(236,72,153,0.2); padding-top: 18px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="header-title">🌸 QUỲNH HOA STORY STUDIO 🌸</h1>
            <p class="header-sub">Đêm Tím Mộng Mơ — Kẻ Dệt Mộng Trăng Non</p>
            <p class="greeting">Xin chào <strong>Lê Ngọc Quỳnh</strong>,</p>
            <p class="desc">Bạn vừa kích hoạt cổng <strong>🔏 Thần chú Nhà Gạo</strong> để mở khóa quyền quản trị nhân vật tại Quỳnh Hoa Story Studio.<br>Dưới đây là mã xác thực OTP của bạn:</p>
            <div>
              <div class="otp-box">${otpCode}</div>
            </div>
            <p class="expiry">⏳ Mã xác nhận có hiệu lực trong vòng 10 phút</p>
            <div class="footer">
              Email này được gửi tự động và an toàn từ máy chủ Quỳnh Hoa Story Studio tới <strong>${AUTHORIZED_OWNER_EMAIL}</strong>.<br>
              Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email. Tuyệt đối không chia sẻ mã này cho bất kỳ ai.
            </div>
          </div>
        </body>
        </html>
      `,
    });
    console.log(`[EMAIL OTP] OTP email sent successfully to ${toEmail}`);
    return { success: true };
  } catch (err: any) {
    console.error(`[EMAIL OTP ERROR] Failed to send email to ${toEmail}:`, err);
    return { success: false, error: err.message };
  }
}

// Default Fallback Character: Chính Dương
const DEFAULT_OFFICIAL_CHAR = {
  id: "chinh-duong",
  name: "Chính Dương",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  hashtag: "#CổTrang #TrâuGiàGặmCỏNon #HoàngĐế&SủngPhi #CungĐấu",
  slogan: "Dẫu cạn kiếp này, ta vẫn mãi chờ nàng dưới vòm Hoa Quỳnh trắng.",
  intro: "Vương gia Chính Dương phong thái uy nghiêm, u buồn thâm tình.",
  description: "Gương mặt tuấn tú sắc sảo, ánh mắt dịu dàng thâm thẫm dành riêng cho nàng.",
  personality: "Uy nghiêm, ôn hòa, thâm tình, sâu sắc",
  link: "https://www.dokichat.club/vi/role/afc87433-c3b8-4a05-bb2a-f7d7e4f3c28e?isShare=true",
  linkDokichat: "https://www.dokichat.club/vi/role/afc87433-c3b8-4a05-bb2a-f7d7e4f3c28e?isShare=true",
  linkGgai: "https://aistudio.google.com/app/prompts?state=%7B%22ids%22:%5B%221NjC2ex3B6Xi_LVbbVzrNiQ0FUCu9MmNg%22%5D,%22action%22:%22open%22,%22userId%22:%22117415526578899640039%22,%22resourceKeys%22:%7B%7D%7D&usp=sharing",
  linkImely: "",
  sourceType: "custom_preset"
};

// Storage Helpers
function getStoredCharacters() {
  try {
    if (fs.existsSync(CHARACTERS_FILE_PATH)) {
      const data = fs.readFileSync(CHARACTERS_FILE_PATH, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const seenIds = new Set<string>();
        const sanitized: any[] = [];
        let hasChanges = false;

        for (const item of parsed) {
          if (!item || typeof item !== "object") continue;

          let id = item.id;
          if (!id) {
            hasChanges = true;
            if (item.name === "Chính Dương") {
              id = "chinh-duong";
            } else {
              id = `char-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
            }
          }

          if (seenIds.has(id)) {
            hasChanges = true;
            id = `${id}-${Math.random().toString(36).substring(2, 5)}`;
          }
          seenIds.add(id);

          sanitized.push({
            ...item,
            id
          });
        }

        if (sanitized.length === 0) {
          sanitized.push(DEFAULT_OFFICIAL_CHAR);
          hasChanges = true;
        }

        if (hasChanges) {
          saveStoredCharacters(sanitized);
        }

        return sanitized;
      }
    }
  } catch (e) {
    console.error("Error reading characters file:", e);
  }

  // Fallback if missing or empty
  const initial = [DEFAULT_OFFICIAL_CHAR];
  saveStoredCharacters(initial);
  return initial;
}

function saveStoredCharacters(chars: any[]) {
  try {
    const dir = path.dirname(CHARACTERS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CHARACTERS_FILE_PATH, JSON.stringify(chars, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving characters file:", e);
  }
}

// Locked Characters Storage Helpers
function getStoredLockedCharacters() {
  try {
    if (fs.existsSync(LOCKED_CHARACTERS_FILE_PATH)) {
      const data = fs.readFileSync(LOCKED_CHARACTERS_FILE_PATH, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Error reading locked characters file:", e);
  }
  return [];
}

function saveStoredLockedCharacters(chars: any[]) {
  try {
    const dir = path.dirname(LOCKED_CHARACTERS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LOCKED_CHARACTERS_FILE_PATH, JSON.stringify(chars, null, 2), "utf-8");
  } catch (e) {
    console.error("Error saving locked characters file:", e);
  }
}

// Server-side Middleware to Verify Studio Owner / NPH Token
function isOwnerAuthorized(req: express.Request): boolean {
  const authHeader = req.headers.authorization;
  if (!authHeader) return false;
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  if (!token) return false;

  // 1. Check dynamic session tokens
  const session = activeOwnerSessions.get(token);
  if (session) {
    if (Date.now() > session.expiresAt) {
      activeOwnerSessions.delete(token);
      return false;
    }
    return session.email.toLowerCase() === AUTHORIZED_OWNER_EMAIL.toLowerCase();
  }

  // 2. Check master NPH secret token
  if (token === NPH_SECRET_TOKEN) {
    return true;
  }

  return false;
}

function isNphAuthorized(req: express.Request): boolean {
  return isOwnerAuthorized(req);
}

// API: Verify Google Sign-In Credential (ID Token)
app.post("/api/auth/google", async (req, res) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ success: false, error: "Thiếu mã xác thực Google (credential)" });
    }

    // Verify token with Google's public tokeninfo endpoint
    const googleRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
    if (!googleRes.ok) {
      return res.status(401).json({ success: false, error: "Mã xác thực Google không hợp lệ hoặc đã hết hạn." });
    }

    const payload = await googleRes.json();
    const email = (payload.email || "").toLowerCase().trim();

    if (email !== AUTHORIZED_OWNER_EMAIL.toLowerCase()) {
      return res.status(403).json({
        success: false,
        error: "Bạn không có quyền truy cập. Chỉ tài khoản chủ sở hữu hoah22535@gmail.com mới được phép quản trị."
      });
    }

    // Generate cryptographically secure session
    const sessionToken = `owner_sess_${crypto.randomBytes(32).toString("hex")}`;
    const now = Date.now();
    activeOwnerSessions.set(sessionToken, {
      token: sessionToken,
      email: AUTHORIZED_OWNER_EMAIL,
      createdAt: now,
      expiresAt: now + 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.json({
      success: true,
      token: sessionToken,
      email: AUTHORIZED_OWNER_EMAIL,
      name: payload.name || "Quỳnh Hoa Owner",
      picture: payload.picture || ""
    });
  } catch (err: any) {
    console.error("Google Auth verification error:", err);
    return res.status(500).json({ success: false, error: "Lỗi xác thực Google từ máy chủ: " + err.message });
  }
});

// ==========================================
// 🔏 EMAIL OTP AUTHENTICATION (STRICT RBAC)
// ==========================================

// API: Send 6-digit OTP to Owner's Authorized Gmail
// Handlers supported at both /api/auth/send-otp and /api/send-otp for seamless integration
const handleSendOtpRoute = async (req: express.Request, res: express.Response) => {
  try {
    const { email } = req.body || {};
    const cleanEmail = (email || AUTHORIZED_OWNER_EMAIL).toLowerCase().trim();
    console.log(`[AUTH-OTP] Request received to send OTP. Target email: ${cleanEmail}`);

    // Verify authorized recipient email
    if (cleanEmail !== AUTHORIZED_OWNER_EMAIL.toLowerCase()) {
      console.warn(`[AUTH-OTP REJECTED] Unauthorized email attempted: ${cleanEmail}`);
      return res.status(403).json({
        success: false,
        error: "Bạn không có quyền truy cập. Chỉ chấp nhận gửi mã cho email chủ sở hữu hoah22535@gmail.com."
      });
    }

    // Rate-limiting: minimum 30s cooldown
    const existing = pendingOtps.get(AUTHORIZED_OWNER_EMAIL.toLowerCase());
    if (existing && Date.now() - existing.lastSentAt < 30000) {
      const waitSeconds = Math.ceil((30000 - (Date.now() - existing.lastSentAt)) / 1000);
      console.warn(`[AUTH-OTP RATE-LIMITED] Cooldown active. Seconds remaining: ${waitSeconds}`);
      return res.status(429).json({
        success: false,
        error: `Vui lòng đợi ${waitSeconds} giây trước khi gửi lại mã mới.`
      });
    }

    // Generate 6-digit cryptographically secure OTP
    const otpCode = Math.floor(100000 + crypto.randomInt(900000)).toString();

    pendingOtps.set(AUTHORIZED_OWNER_EMAIL.toLowerCase(), {
      code: otpCode,
      email: AUTHORIZED_OWNER_EMAIL,
      expiresAt: Date.now() + 10 * 60 * 1000, // Valid for 10 minutes
      attempts: 0,
      lastSentAt: Date.now()
    });

    console.log(`[AUTH-OTP CREATED] 6-digit OTP created for ${AUTHORIZED_OWNER_EMAIL}`);

    // Send email to Gmail
    const mailResult = await sendOtpEmail(AUTHORIZED_OWNER_EMAIL, otpCode);
    if (!mailResult.success) {
      console.error(`[AUTH-OTP EMAIL FAILURE]`, mailResult.error);
    }

    // Secure response: Never disclose OTP code in API payload
    return res.json({
      success: true,
      message: "Mã xác nhận đã được gửi đến Gmail chủ sở hữu. Vui lòng kiểm tra hộp thư đến hoặc thư rác."
    });
  } catch (err: any) {
    console.error("[AUTH-OTP SYSTEM ERROR]:", err);
    return res.status(500).json({
      success: false,
      error: "Lỗi hệ thống khi gửi mã xác nhận: " + err.message
    });
  }
};

app.post("/api/auth/send-otp", handleSendOtpRoute);
app.post("/api/send-otp", handleSendOtpRoute);

// API: Verify 6-digit OTP & Grant Owner Session
const handleVerifyOtpRoute = (req: express.Request, res: express.Response) => {
  try {
    const { code } = req.body;
    const cleanCode = (code || "").trim();

    if (!cleanCode) {
      return res.status(400).json({
        success: false,
        error: "Vui lòng nhập mã số xác nhận OTP gồm 6 chữ số."
      });
    }

    const record = pendingOtps.get(AUTHORIZED_OWNER_EMAIL.toLowerCase());
    if (!record) {
      return res.status(400).json({
        success: false,
        error: "Chưa có mã xác nhận nào được yêu cầu hoặc mã đã hết hạn. Vui lòng nhấn 'Gửi mã xác nhận về Gmail'."
      });
    }

    if (Date.now() > record.expiresAt) {
      pendingOtps.delete(AUTHORIZED_OWNER_EMAIL.toLowerCase());
      return res.status(400).json({
        success: false,
        error: "Mã xác nhận đã hết hạn (quá 10 phút). Vui lòng yêu cầu mã mới."
      });
    }

    if (record.attempts >= 5) {
      pendingOtps.delete(AUTHORIZED_OWNER_EMAIL.toLowerCase());
      return res.status(403).json({
        success: false,
        error: "Bạn đã nhập sai mã quá 5 lần. Vì lý do an toàn, mã đã bị hủy. Vui lòng yêu cầu mã mới."
      });
    }

    if (cleanCode !== record.code) {
      record.attempts += 1;
      return res.status(400).json({
        success: false,
        error: `Mã xác nhận không chính xác. Bạn còn ${5 - record.attempts} lần thử.`
      });
    }

    // Success: consume OTP
    pendingOtps.delete(AUTHORIZED_OWNER_EMAIL.toLowerCase());

    // Generate cryptographically secure session
    const sessionToken = `owner_sess_${crypto.randomBytes(32).toString("hex")}`;
    const now = Date.now();
    activeOwnerSessions.set(sessionToken, {
      token: sessionToken,
      email: AUTHORIZED_OWNER_EMAIL,
      createdAt: now,
      expiresAt: now + 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.json({
      success: true,
      token: sessionToken,
      email: AUTHORIZED_OWNER_EMAIL,
      message: "Xác nhận thành công! Chào mừng chủ sở hữu Lê Ngọc Quỳnh."
    });
  } catch (err: any) {
    console.error("verify-otp error:", err);
    return res.status(500).json({
      success: false,
      error: "Lỗi hệ thống khi xác nhận mã: " + err.message
    });
  }
};

app.post("/api/auth/verify-otp", handleVerifyOtpRoute);
app.post("/api/verify-otp", handleVerifyOtpRoute);

// API: Owner Direct Passkey / Password Verification (Server-side Auth)
app.post("/api/auth/owner-verify", (req, res) => {
  const { email, password } = req.body;
  const cleanEmail = (email || "").toLowerCase().trim();
  const cleanPass = (password || "").trim();

  const validPasses = ["hoah22535@gmail.com", "quynhhoa2026", "hoah22535", "owner_quynh_hoa_2026"];

  if (cleanEmail === AUTHORIZED_OWNER_EMAIL && validPasses.includes(cleanPass)) {
    const sessionToken = `owner_sess_${crypto.randomBytes(32).toString("hex")}`;
    const now = Date.now();
    activeOwnerSessions.set(sessionToken, {
      token: sessionToken,
      email: AUTHORIZED_OWNER_EMAIL,
      createdAt: now,
      expiresAt: now + 7 * 24 * 60 * 60 * 1000
    });

    return res.json({
      success: true,
      token: sessionToken,
      email: AUTHORIZED_OWNER_EMAIL,
      message: "Xác thực chủ sở hữu thành công!"
    });
  }

  return res.status(403).json({
    success: false,
    error: "Bạn không có quyền truy cập."
  });
});

// API: NPH Login (Legacy compatibility, maps to owner session)
app.post("/api/auth/nph-login", (req, res) => {
  const { email, password } = req.body;
  const cleanEmail = (email || "").toLowerCase().trim();
  const cleanPass = (password || "").trim();

  const validPasses = ["hoah22535@gmail.com", "quynhhoa2026", "hoah22535", "owner_quynh_hoa_2026"];

  if (cleanEmail === AUTHORIZED_PUBLISHER_EMAIL && validPasses.includes(cleanPass)) {
    const sessionToken = `owner_sess_${crypto.randomBytes(32).toString("hex")}`;
    const now = Date.now();
    activeOwnerSessions.set(sessionToken, {
      token: sessionToken,
      email: AUTHORIZED_OWNER_EMAIL,
      createdAt: now,
      expiresAt: now + 7 * 24 * 60 * 60 * 1000
    });

    return res.json({
      success: true,
      token: sessionToken,
      publisherEmail: AUTHORIZED_PUBLISHER_EMAIL,
      message: "Đăng nhập Nhà Phát Hành thành công!"
    });
  }

  return res.status(401).json({
    success: false,
    error: "Sai tài khoản hoặc mật khẩu Nhà Phát Hành!"
  });
});

// API: Verify Current Session Info
app.get("/api/auth/session", (req, res) => {
  const isAuth = isOwnerAuthorized(req);
  if (isAuth) {
    return res.json({
      isAuthenticated: true,
      email: AUTHORIZED_OWNER_EMAIL,
      role: "owner"
    });
  }
  return res.json({
    isAuthenticated: false
  });
});

// API: Verify NPH Auth Status (Backward compatibility)
app.get("/api/auth/verify", (req, res) => {
  const authorized = isOwnerAuthorized(req);
  res.json({ isPublisher: authorized, isOwner: authorized });
});

// API: Logout
app.post("/api/auth/logout", (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.replace(/^Bearer\s+/i, "").trim();
    activeOwnerSessions.delete(token);
  }
  return res.json({ success: true, message: "Đã đăng xuất an toàn" });
});

// ==========================================
// LOCKED CHARACTERS SECURE API (STRICT RBAC)
// ==========================================

// API: Get Locked Characters (GET - ONLY OWNER ACCESS)
app.get("/api/locked-characters", (req, res) => {
  if (!isOwnerAuthorized(req)) {
    return res.status(403).json({
      success: false,
      error: "Bạn không có quyền truy cập."
    });
  }

  const characters = getStoredLockedCharacters();
  return res.json({ success: true, characters });
});

// API: Create Locked / Draft Character (POST - ONLY OWNER ACCESS)
app.post("/api/locked-characters", (req, res) => {
  if (!isOwnerAuthorized(req)) {
    return res.status(403).json({
      success: false,
      error: "Bạn không có quyền truy cập."
    });
  }

  const { name, avatar, hashtag, slogan, intro, description, personality, link, linkDokichat, linkGgai, linkImely, storyContent, status } = req.body;
  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Tên nhân vật không được để trống!" });
  }

  const chars = getStoredLockedCharacters();
  const newChar = {
    id: `locked-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    name: name.trim(),
    avatar: avatar || "",
    hashtag: (hashtag || "").trim(),
    slogan: (slogan || "").trim(),
    intro: (intro || description || "").trim(),
    description: (description || intro || "").trim(),
    personality: (personality || "").trim(),
    storyContent: (storyContent || intro || description || "").trim(),
    link: (link || linkDokichat || linkGgai || linkImely || "").trim(),
    linkDokichat: (linkDokichat || "").trim(),
    linkGgai: (linkGgai || "").trim(),
    linkImely: (linkImely || "").trim(),
    sourceType: "custom_preset",
    status: status || "locked",
    isLocked: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  chars.unshift(newChar);
  saveStoredLockedCharacters(chars);

  return res.json({ success: true, character: newChar, characters: chars });
});

// API: Update Locked / Draft Character (PUT - ONLY OWNER ACCESS)
app.put("/api/locked-characters/:id", (req, res) => {
  if (!isOwnerAuthorized(req)) {
    return res.status(403).json({
      success: false,
      error: "Bạn không có quyền truy cập."
    });
  }

  const { id } = req.params;
  const chars = getStoredLockedCharacters();
  const index = chars.findIndex((c: any) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Không tìm thấy nhân vật khóa '${id}'` });
  }

  const existing = chars[index];
  const { name, avatar, hashtag, slogan, intro, description, personality, link, linkDokichat, linkGgai, linkImely, storyContent, status } = req.body;

  const updated = {
    ...existing,
    name: name ? name.trim() : existing.name,
    avatar: avatar !== undefined ? avatar : existing.avatar,
    hashtag: hashtag !== undefined ? hashtag.trim() : existing.hashtag,
    slogan: slogan !== undefined ? slogan.trim() : existing.slogan,
    intro: intro !== undefined ? intro.trim() : existing.intro,
    description: description !== undefined ? description.trim() : existing.description,
    personality: personality !== undefined ? personality.trim() : existing.personality,
    storyContent: storyContent !== undefined ? storyContent.trim() : existing.storyContent,
    link: link !== undefined ? link.trim() : existing.link,
    linkDokichat: linkDokichat !== undefined ? linkDokichat.trim() : existing.linkDokichat,
    linkGgai: linkGgai !== undefined ? linkGgai.trim() : existing.linkGgai,
    linkImely: linkImely !== undefined ? linkImely.trim() : existing.linkImely,
    status: status !== undefined ? status : existing.status,
    updatedAt: new Date().toISOString()
  };

  chars[index] = updated;
  saveStoredLockedCharacters(chars);

  return res.json({ success: true, character: updated, characters: chars });
});

// API: Delete Locked Character (DELETE - ONLY OWNER ACCESS)
app.delete("/api/locked-characters/:id", (req, res) => {
  if (!isOwnerAuthorized(req)) {
    return res.status(403).json({
      success: false,
      error: "Bạn không có quyền truy cập."
    });
  }

  const { id } = req.params;
  let chars = getStoredLockedCharacters();
  const index = chars.findIndex((c: any) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Không tìm thấy nhân vật khóa '${id}'` });
  }

  chars = chars.filter((c: any) => c.id !== id);
  saveStoredLockedCharacters(chars);

  return res.json({ success: true, characters: chars });
});

// API: Publish Locked Character to Homepage (POST - ONLY OWNER ACCESS)
app.post("/api/locked-characters/:id/publish", (req, res) => {
  if (!isOwnerAuthorized(req)) {
    return res.status(403).json({
      success: false,
      error: "Bạn không có quyền truy cập."
    });
  }

  const { id } = req.params;
  const lockedChars = getStoredLockedCharacters();
  const index = lockedChars.findIndex((c: any) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Không tìm thấy nhân vật khóa '${id}'` });
  }

  const target = lockedChars[index];
  const publicChars = getStoredCharacters();

  // Add to public characters list
  const publicItem = {
    id: `char-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    name: target.name,
    avatar: target.avatar || "",
    hashtag: target.hashtag || "",
    slogan: target.slogan || "",
    intro: target.intro || target.description || "",
    description: target.description || target.intro || "",
    personality: target.personality || "Uy nghiêm, ôn hòa, thâm tình",
    storyContent: target.storyContent || target.intro || "",
    link: target.link || target.linkDokichat || target.linkGgai || target.linkImely || "",
    linkDokichat: target.linkDokichat || "",
    linkGgai: target.linkGgai || "",
    linkImely: target.linkImely || "",
    sourceType: "custom_preset"
  };

  publicChars.push(publicItem);
  saveStoredCharacters(publicChars);

  // Update locked character status to published
  lockedChars[index] = {
    ...target,
    status: "published",
    isLocked: false,
    updatedAt: new Date().toISOString()
  };
  saveStoredLockedCharacters(lockedChars);

  return res.json({
    success: true,
    message: `Đã công khai nhân vật "${target.name}" lên Trang Chủ!`,
    character: publicItem,
    lockedCharacters: lockedChars,
    publicCharacters: publicChars
  });
});

// API: Public Character Listing (GET - READ ONLY for Everyone)
app.get("/api/characters", (req, res) => {
  const characters = getStoredCharacters();
  res.json({ success: true, characters });
});

// API: Create Character (POST - REQUIRES NPH SERVER AUTH)
app.post("/api/characters", (req, res) => {
  if (!isNphAuthorized(req)) {
    return res.status(403).json({ error: "🔒 Từ chối truy cập: Chỉ Nhà Phát Hành mới có quyền thêm nhân vật!" });
  }

  const { name, avatar, hashtag, slogan, intro, description, personality, link, linkDokichat, linkGgai, linkImely, storyContent, sourceType } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Tên nhân vật không được để trống!" });
  }

  const chars = getStoredCharacters();
  const newChar = {
    id: `char-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    name: name.trim(),
    avatar: avatar || "",
    hashtag: (hashtag || "").trim(),
    slogan: (slogan || "").trim(),
    intro: (intro || description || "").trim(),
    description: (description || intro || "").trim(),
    personality: (personality || "").trim(),
    storyContent: (storyContent || intro || description || "").trim(),
    link: (link || linkDokichat || linkGgai || linkImely || "").trim(),
    linkDokichat: (linkDokichat || "").trim(),
    linkGgai: (linkGgai || "").trim(),
    linkImely: (linkImely || "").trim(),
    sourceType: sourceType || "custom_preset"
  };

  chars.push(newChar);
  saveStoredCharacters(chars);

  res.json({ success: true, character: newChar, characters: chars });
});

// API: Update Character by fixed ID (PUT - REQUIRES NPH SERVER AUTH)
app.put("/api/characters/:id", (req, res) => {
  if (!isNphAuthorized(req)) {
    return res.status(403).json({ error: "🔒 Từ chối truy cập: Chỉ Nhà Phát Hành mới có quyền chỉnh sửa nhân vật!" });
  }

  const { id } = req.params;
  const { name, avatar, hashtag, slogan, intro, description, personality, link, linkDokichat, linkGgai, linkImely, storyContent, sourceType } = req.body;

  const chars = getStoredCharacters();
  const index = chars.findIndex((c: any) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: `Không tìm thấy nhân vật với ID '${id}'` });
  }

  const existing = chars[index];
  const updated = {
    ...existing,
    name: name ? name.trim() : existing.name,
    avatar: avatar !== undefined ? avatar : existing.avatar,
    hashtag: hashtag !== undefined ? hashtag.trim() : existing.hashtag,
    slogan: slogan !== undefined ? slogan.trim() : existing.slogan,
    intro: intro !== undefined ? intro.trim() : existing.intro,
    description: description !== undefined ? description.trim() : existing.description,
    personality: personality !== undefined ? personality.trim() : existing.personality,
    storyContent: storyContent !== undefined ? storyContent.trim() : (existing.storyContent || existing.intro || existing.description || ""),
    link: link !== undefined ? link.trim() : existing.link,
    linkDokichat: linkDokichat !== undefined ? linkDokichat.trim() : existing.linkDokichat,
    linkGgai: linkGgai !== undefined ? linkGgai.trim() : existing.linkGgai,
    linkImely: linkImely !== undefined ? linkImely.trim() : existing.linkImely,
    sourceType: sourceType || existing.sourceType
  };

  chars[index] = updated;
  saveStoredCharacters(chars);

  res.json({ success: true, character: updated, characters: chars });
});

// API: Delete Character by fixed ID (DELETE - REQUIRES NPH SERVER AUTH)
app.delete("/api/characters/:id", (req, res) => {
  if (!isNphAuthorized(req)) {
    return res.status(403).json({ error: "🔒 Từ chối truy cập: Chỉ Nhà Phát Hành mới có quyền xóa nhân vật!" });
  }

  const { id } = req.params;
  let chars = getStoredCharacters();

  const exists = chars.some((c: any) => c.id === id);
  if (!exists) {
    return res.status(404).json({ error: `Không tìm thấy nhân vật với ID '${id}'` });
  }

  chars = chars.filter((c: any) => c.id !== id);

  // If all characters deleted, retain default Official "Chính Dương"
  if (chars.length === 0) {
    chars = [DEFAULT_OFFICIAL_CHAR];
  }

  saveStoredCharacters(chars);

  res.json({ success: true, characters: chars });
});

// Initialize Gemini Client
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// API: Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Quỳnh Hoa Story Studio Backend Active" });
});

// API: Analyze Character Link
app.post("/api/analyze-link", async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: "Missing URL parameter" });
    }

    const ai = getGeminiClient();
    const prompt = `Phân tích đường dẫn nhân vật/ảnh này và gợi ý thông tin nhân vật bằng tiếng Việt:
URL: ${url}

Hãy trả về định dạng JSON với các trường:
- name: Tên nhân vật dự đoán (Ví dụ: Cố Thiên Phong)
- personality: Tính cách/hình mẫu (Ví dụ: Tổng tài ngoài lạnh trong nóng, dịu dàng thâm tình)
- description: Bối cảnh/thân phận ngắn gọn (Ví dụ: Chủ tịch tập đoàn Cố Thị, 28 tuổi)
- suggestedGenre: Thể loại cốt truyện phù hợp nhất (Ví dụ: Ngôn Tình Đô Thị)
- avatar: URL ảnh chân thực hoặc placeholder đẹp`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            personality: { type: Type.STRING },
            description: { type: Type.STRING },
            suggestedGenre: { type: Type.STRING },
            avatar: { type: Type.STRING },
          },
          required: ["name", "personality", "description", "suggestedGenre"],
        },
      },
    });

    const resultText = response.text || "{}";
    const data = JSON.parse(resultText);
    res.json({ success: true, characterData: data });
  } catch (error: any) {
    console.error("Error analyzing character link:", error);
    res.status(500).json({ error: error.message || "Không thể phân tích link nhân vật" });
  }
});

// API: Roleplay & Story Generation Engine
app.post("/api/roleplay", async (req, res) => {
  try {
    const { character, genre, userMessage, chatHistory = [] } = req.body;

    if (!character || !genre || !userMessage) {
      return res.status(400).json({ error: "Thiếu thông tin nhân vật, thể loại hoặc lời nhắn của user" });
    }

    const ai = getGeminiClient();

    const isFirstTurn = !chatHistory || chatHistory.length === 0;

    const systemInstruction = `Bạn là tác giả văn học mạng hàng đầu kiêm diễn viên nhập vai chuyên nghiệp tiếng Việt.
Bạn đang nhập vai nhân vật dưới đây trong một cốt truyện truyền cảm hứng, tinh tế và văn phong mượt mà:

Tên Nhân Vật: ${character.name || 'Cố Thiên Phong'}
Tính cách / Hình mẫu: ${character.personality || 'Thâm trầm, dịu dàng, chu đáo'}
Thân phận / Mô tả: ${character.description || 'Nam chính câu chuyện'}
Link Char: ${character.link || 'https://character.ai'}
Thể loại cốt truyện: ${genre}
Bối cảnh đặc trưng: Đêm trăng mờ nhạt, hoa quỳnh trắng (Queen of the Night) đơm bông tỏa hương thơm dịu ngọt, mang lại cảm giác lãng mạn, sâu lắng và hơi mộng mơ.

Nhiệm vụ của bạn:
1. Nếu là lượt đầu (${isFirstTurn ? 'Đúng' : 'Không'}):
   - Mở đầu bằng đoạn Dẫn Cảnh (Narrator/Bối cảnh) miêu tả không gian, ánh trăng, hương hoa quỳnh trắng dịu nhẹ, tạo không khí lôi cuốn.
   - Tiếp theo là Lời Thoại & Hành Động của nhân vật ${character.name} đáp lại lời nhắn của User.
2. Nếu là lượt tương tác tiếp theo:
   - Tiếp nối đúng tính cách, cử chỉ, cảm xúc và phản hồi tự nhiên, chân thực với lời thoại của User.
3. Đưa ra 3 lựa chọn hành động/phản hồi ngắn gợi ý cho User trong lượt kế tiếp.

Hãy trả về phản hồi dưới dạng JSON chuẩn:
{
  "title": "Tên chương truyện ngắn quyến rũ (Ví dụ: Chương 1: Đêm Trắng Nở Hoa Quỳnh)",
  "narratorScene": "Đoạn văn dẫn cảnh không gian bối cảnh (chỉ tạo nếu lượt đầu hoặc khi có chuyển cảnh lớn, nếu không để rỗng)",
  "characterResponse": "Lời thoại và hành động chi tiết của nhân vật ${character.name}",
  "characterEmotion": "Biểu cảm/cảm xúc lúc này (Ví dụ: Nhíu mày dịu dàng, Khẽ mỉm cười)",
  "suggestedChoices": ["Lựa chọn 1 ngắn gọn", "Lựa chọn 2 ngắn gọn", "Lựa chọn 3 ngắn gọn"]
}`;

    const conversationPrompt = isFirstTurn
      ? `Lời nhắn mở đầu từ User: "${userMessage}"`
      : `Lịch sử hội thoại trước:\n${chatHistory.map((m: any) => `${m.sender}: ${m.content}`).join('\n')}\n\nLời nhắn mới nhất từ User: "${userMessage}"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: conversationPrompt,
      config: {
        systemInstruction,
        temperature: 0.85,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            narratorScene: { type: Type.STRING },
            characterResponse: { type: Type.STRING },
            characterEmotion: { type: Type.STRING },
            suggestedChoices: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["title", "characterResponse", "suggestedChoices"],
        },
      },
    });

    const jsonText = response.text || "{}";
    const data = JSON.parse(jsonText);

    res.json({
      success: true,
      data,
    });
  } catch (error: any) {
    console.error("Error in roleplay generation:", error);
    res.status(500).json({ error: error.message || "Lỗi khi khởi tạo cốt truyện với AI" });
  }
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });

  server.on("error", (err: any) => {
    console.error("Server listen error:", err);
  });
}

startServer();
