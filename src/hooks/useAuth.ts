import { useEffect, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export interface AuthProfile {
  display_name: string | null;
  avatar_url: string | null;
}

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<AuthProfile | null>(null);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const user = session?.user;
    if (!user) {
      setProfile(null);
      return;
    }
    // Read profile; create if missing (defer to setTimeout to avoid blocking auth callback)
    setTimeout(async () => {
      const { data } = await supabase
        .from("profiles")
        .select("display_name, avatar_url")
        .eq("id", user.id)
        .maybeSingle();
      if (data) {
        setProfile(data);
      } else {
        const md = (user.user_metadata ?? {}) as Record<string, unknown>;
        const defaultName =
          (md.full_name as string) ||
          (md.name as string) ||
          user.email?.split("@")[0] ||
          "User";
        const defaultAvatar =
          (md.avatar_url as string) || (md.picture as string) || null;
        await supabase.from("profiles").insert({
          id: user.id,
          display_name: defaultName,
          avatar_url: defaultAvatar,
        });
        setProfile({ display_name: defaultName, avatar_url: defaultAvatar });
      }
    }, 0);
  }, [session]);

  return {
    session,
    user: session?.user ?? null as User | null,
    loading,
    profile,
    setProfile,
  };
}
