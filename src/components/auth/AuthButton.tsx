import { useRef, useState } from "react";
import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { LogIn, LogOut, Upload } from "lucide-react";

export default function AuthButton() {
  const { user, profile, setProfile } = useAuth();
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function signIn() {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      console.error(result.error);
      alert("Sign-in failed. Please try again.");
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
    setOpen(false);
  }

  async function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "png";
      const path = `${user.id}/avatar-${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true, contentType: file.type });
      if (upErr) throw upErr;
      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
      const publicUrl = data.publicUrl;
      const { error: pErr } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl, updated_at: new Date().toISOString() })
        .eq("id", user.id);
      if (pErr) throw pErr;
      setProfile((p) => ({
        display_name: p?.display_name ?? null,
        avatar_url: publicUrl,
      }));
    } catch (err) {
      console.error(err);
      alert("Avatar upload failed.");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  if (!user) {
    return (
      <button
        onClick={signIn}
        className="inline-flex items-center gap-2 rounded-lg border border-[#21262d] bg-[#161b22] px-3 py-1.5 text-sm font-medium text-[#c9d1d9] hover:bg-[#1c2128] transition-colors"
      >
        <LogIn className="w-4 h-4" />
        Sign in with Google
      </button>
    );
  }

  const name = profile?.display_name ?? user.email ?? "User";
  const avatar = profile?.avatar_url;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-lg border border-[#21262d] bg-[#161b22] px-2 py-1 text-sm text-[#c9d1d9] hover:bg-[#1c2128]"
      >
        {avatar ? (
          <img
            src={avatar}
            alt=""
            className="w-7 h-7 rounded-full object-cover"
          />
        ) : (
          <div className="w-7 h-7 rounded-full bg-[#30363d] flex items-center justify-center text-xs font-semibold">
            {name.slice(0, 1).toUpperCase()}
          </div>
        )}
        <span className="hidden sm:inline max-w-[140px] truncate">{name}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg border border-[#21262d] bg-[#161b22] shadow-lg z-50 p-2">
          <div className="px-2 py-2 border-b border-[#21262d] mb-2">
            <p className="text-xs text-[#8b949e]">Signed in as</p>
            <p className="text-sm text-white truncate">{name}</p>
          </div>
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-[#c9d1d9] hover:bg-[#1c2128] rounded disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            {uploading ? "Uploading..." : "Change avatar"}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={onPickFile}
            className="hidden"
          />
          <button
            onClick={signOut}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-[#c9d1d9] hover:bg-[#1c2128] rounded"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
