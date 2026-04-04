"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { LuEye, LuEyeOff, LuLock, LuMail, LuChrome, LuArrowLeft } from "react-icons/lu";

export function AdminSignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Invalid credentials");
        return;
      }
      // Full page load ensures middleware reads the fresh session cookie
      window.location.href = "/admin/dashboard";
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/admin/dashboard" });
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setForgotSent(true);
      } else {
        const data = await res.json();
        setError(data.message || "Failed to send reset email.");
      }
    } catch {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0D0906",
        position: "relative",
        overflow: "hidden",
        padding: "16px",
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: "url('/images/patterns/arabic-geometric.svg')",
          backgroundSize: "300px",
          backgroundRepeat: "repeat",
        }}
      />

      <div style={{ maxWidth: "400px", width: "100%", position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "32px",
              fontWeight: 700,
              color: "#C8A951",
              margin: 0,
            }}
          >
            Sultan
          </h1>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.4)",
              fontSize: "13px",
              marginTop: "4px",
            }}
          >
            Restaurant Management Portal
          </p>
        </div>

        <div
          style={{
            background: "#FFFFFF",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          {/* Gold accent */}
          <div
            style={{
              height: "3px",
              background: "linear-gradient(90deg, transparent, #C8A951, transparent)",
            }}
          />

          <div style={{ padding: "32px" }}>
            {!forgotMode ? (
              // ===== SIGN IN FORM =====
              <form onSubmit={handleSubmit}>
                <div style={{ textAlign: "center", marginBottom: "24px" }}>
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#1A0F0A",
                      margin: 0,
                    }}
                  >
                    Welcome Back
                  </h2>
                  <p style={{ color: "#6B7280", fontSize: "14px", marginTop: "4px" }}>
                    Sign in to manage your restaurant
                  </p>
                </div>

                {/* Google Sign In */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "1px solid #E5E7EB",
                    background: "#FFFFFF",
                    color: "#374151",
                    fontSize: "14px",
                    fontWeight: 500,
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "all 0.2s",
                    marginBottom: "20px",
                  }}
                >
                  <LuChrome size={18} />
                  Continue with Google
                </button>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                  }}
                >
                  <div style={{ flex: 1, height: "1px", background: "#E5E7EB" }} />
                  <span style={{ fontSize: "12px", color: "#9CA3AF" }}>or sign in with email</span>
                  <div style={{ flex: 1, height: "1px", background: "#E5E7EB" }} />
                </div>

                {/* Email */}
                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "block",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#6B7280",
                      marginBottom: "6px",
                    }}
                  >
                    Email
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #E5E7EB",
                      borderRadius: "10px",
                      padding: "0 12px",
                      transition: "all 0.2s",
                    }}
                  >
                    <LuMail size={16} color="#9CA3AF" />
                    <input
                      type="email"
                      placeholder="admin@sultanrestaurant.co.uk"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{
                        flex: 1,
                        padding: "12px",
                        border: "none",
                        outline: "none",
                        fontSize: "14px",
                        background: "transparent",
                      }}
                    />
                  </div>
                </div>

                {/* Password */}
                <div style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "6px",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "#6B7280",
                      }}
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setForgotMode(true)}
                      style={{
                        fontSize: "12px",
                        color: "#C8A951",
                        fontWeight: 600,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #E5E7EB",
                      borderRadius: "10px",
                      padding: "0 12px",
                      transition: "all 0.2s",
                    }}
                  >
                    <LuLock size={16} color="#9CA3AF" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{
                        flex: 1,
                        padding: "12px",
                        border: "none",
                        outline: "none",
                        fontSize: "14px",
                        background: "transparent",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#9CA3AF",
                        padding: "4px",
                      }}
                    >
                      {showPassword ? <LuEyeOff size={16} /> : <LuEye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div
                    style={{
                      background: "#FEF2F2",
                      border: "1px solid #FECACA",
                      borderRadius: "10px",
                      padding: "12px",
                      marginBottom: "20px",
                    }}
                  >
                    <p style={{ fontSize: "13px", color: "#DC2626", margin: 0 }}>{error}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "14px",
                    borderRadius: "10px",
                    border: "none",
                    background: "#C8A951",
                    color: "#1A0F0A",
                    fontSize: "14px",
                    fontWeight: 700,
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </form>
            ) : (
              // ===== FORGOT PASSWORD =====
              <form onSubmit={handleForgotPassword}>
                <div style={{ textAlign: "center", marginBottom: "24px" }}>
                  <h2
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "24px",
                      fontWeight: 700,
                      color: "#1A0F0A",
                      margin: 0,
                    }}
                  >
                    Reset Password
                  </h2>
                  <p style={{ color: "#6B7280", fontSize: "14px", marginTop: "4px" }}>
                    Enter your email and we'll send you a reset link
                  </p>
                </div>

                {forgotSent ? (
                  <div
                    style={{
                      background: "#F0FDF4",
                      border: "1px solid #BBF7D0",
                      borderRadius: "10px",
                      padding: "16px",
                      textAlign: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <p style={{ fontSize: "14px", color: "#166534", fontWeight: 600, margin: 0 }}>
                      Reset link sent! Check your inbox.
                    </p>
                    <p style={{ fontSize: "12px", color: "#22C55E", marginTop: "4px" }}>
                      If you don't see it, check your spam folder.
                    </p>
                  </div>
                ) : (
                  <>
                    <div style={{ marginBottom: "20px" }}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#6B7280",
                          marginBottom: "6px",
                        }}
                      >
                        Email
                      </label>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid #E5E7EB",
                          borderRadius: "10px",
                          padding: "0 12px",
                        }}
                      >
                        <LuMail size={16} color="#9CA3AF" />
                        <input
                          type="email"
                          placeholder="admin@sultanrestaurant.co.uk"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          style={{
                            flex: 1,
                            padding: "12px",
                            border: "none",
                            outline: "none",
                            fontSize: "14px",
                            background: "transparent",
                          }}
                        />
                      </div>
                    </div>

                    {error && (
                      <div
                        style={{
                          background: "#FEF2F2",
                          border: "1px solid #FECACA",
                          borderRadius: "10px",
                          padding: "12px",
                          marginBottom: "20px",
                        }}
                      >
                        <p style={{ fontSize: "13px", color: "#DC2626", margin: 0 }}>{error}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={forgotLoading}
                      style={{
                        width: "100%",
                        padding: "14px",
                        borderRadius: "10px",
                        border: "none",
                        background: "#C8A951",
                        color: "#1A0F0A",
                        fontSize: "14px",
                        fontWeight: 700,
                        cursor: forgotLoading ? "not-allowed" : "pointer",
                        transition: "all 0.2s",
                      }}
                    >
                      {forgotLoading ? "Sending..." : "Send Reset Link"}
                    </button>
                  </>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setForgotMode(false);
                    setError("");
                    setForgotSent(false);
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                    marginTop: "16px",
                    padding: "8px",
                    background: "none",
                    border: "none",
                    color: "#6B7280",
                    fontSize: "13px",
                    cursor: "pointer",
                  }}
                >
                  <LuArrowLeft size={14} />
                  Back to sign in
                </button>
              </form>
            )}
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: "12px", color: "rgba(255, 255, 255, 0.3)", marginTop: "24px" }}>
          © 2025 Sultan Restaurant. Admin Portal.
        </p>
      </div>
    </div>
  );
}
