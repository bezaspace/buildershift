import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Loader2 } from "lucide-react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import db from "../lib/db";
import { useAuthModal } from "../context/AuthModalContext";

// The client name registered in the Instant dashboard Auth tab.
const GOOGLE_CLIENT_NAME = "google-web";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal } = useAuthModal();
  const [error, setError] = useState<string | null>(null);
  // Generate a nonce once per modal open for the Google ID token flow.
  // The same nonce must be passed to GoogleLogin and signInWithIdToken.
  const [nonce, setNonce] = useState("");

  useEffect(() => {
    if (isAuthModalOpen) {
      setNonce(crypto.randomUUID());
      setError(null);
    }
  }, [isAuthModalOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isAuthModalOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAuthModal();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isAuthModalOpen, closeAuthModal]);

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={closeAuthModal}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md bg-[#FDFCFB] border-2 border-[#1A1A1A] p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeAuthModal}
              aria-label="Close"
              className="absolute top-4 right-4 text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <span className="text-[10px] font-mono font-bold text-[#F27D26] uppercase tracking-widest block mb-3">
                [JOIN THE COMMUNITY]
              </span>
              <h2 className="text-3xl font-serif italic text-[#1A1A1A] leading-tight mb-2">
                Sign in to BuilderShift.
              </h2>
              <p className="text-sm text-gray-500 font-sans leading-relaxed">
                Create your account with Google to join build sessions, project
                reviews, and hiring intel.
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-4 px-4 py-3 border-2 border-rose-600 bg-rose-50 text-rose-700 text-xs font-mono">
                {error}
              </div>
            )}

            {/* Google sign-in button (ID Token flow — no cross-site cookies) */}
            <div className="flex flex-col items-center gap-4">
              <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <GoogleLogin
                  nonce={nonce}
                  size="large"
                  width="360"
                  text="continue_with"
                  shape="rectangular"
                  theme="outline"
                  onSuccess={({ credential }) => {
                    db.auth
                      .signInWithIdToken({
                        clientName: GOOGLE_CLIENT_NAME,
                        idToken: credential,
                        // Must match the nonce passed to GoogleLogin
                        nonce,
                      })
                      .then(() => {
                        closeAuthModal();
                      })
                      .catch((err) => {
                        setError(
                          err?.body?.message ||
                            "Sign-in failed. Please try again."
                        );
                      });
                  }}
                  onError={() => {
                    setError("Google sign-in was cancelled or failed.");
                  }}
                  useOneTap
                />
              </GoogleOAuthProvider>

              {/* Styled fallback button label for design consistency */}
              <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
                Click the button above to continue
              </p>
            </div>

            {/* Footer note */}
            <p className="text-center text-[10px] font-mono text-gray-400 uppercase tracking-wider mt-6 leading-relaxed">
              By signing in you agree to the community code of conduct.
              <br />
              No spam. No courses. Just building.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
