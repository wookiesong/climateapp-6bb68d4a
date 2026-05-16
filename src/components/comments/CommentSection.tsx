import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { addComment, deleteComment } from "@/lib/comments.functions";
import { SCENARIOS, type ScenarioKey } from "@/data/scenarios";
import { Trash2 } from "lucide-react";

interface Comment {
  id: string;
  user_id: string;
  display_name: string;
  avatar_url: string | null;
  scenario_key: string;
  content: string;
  created_at: string;
}

const TABS: ScenarioKey[] = ["bau", "ndc", "50pct"];

export default function CommentSection() {
  const { user, profile } = useAuth();
  const [active, setActive] = useState<ScenarioKey>("ndc");
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addFn = useServerFn(addComment);
  const delFn = useServerFn(deleteComment);

  // Initial load + realtime
  useEffect(() => {
    let cancelled = false;
    supabase
      .from("comments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500)
      .then(({ data }) => {
        if (!cancelled && data) setComments(data as Comment[]);
      });

    const ch = supabase
      .channel("comments-feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "comments" },
        (payload) => {
          setComments((prev) => [payload.new as Comment, ...prev]);
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "comments" },
        (payload) => {
          const old = payload.old as { id: string };
          setComments((prev) => prev.filter((c) => c.id !== old.id));
        },
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(ch);
    };
  }, []);

  const filtered = useMemo(
    () => comments.filter((c) => c.scenario_key === active),
    [comments, active],
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Comment cannot be empty");
      return;
    }
    if (trimmed.length > 500) {
      setError("Comment must be 500 characters or fewer");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      await addFn({
        data: {
          scenario_key: active,
          content: trimmed,
          display_name: profile?.display_name ?? user.email ?? "User",
          avatar_url: profile?.avatar_url ?? null,
        },
      });
      setText("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  }

  async function onDelete(id: string) {
    try {
      await delFn({ data: { id } });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="rounded-xl bg-[#161b22] border border-[#21262d] p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white">Discussion</h3>
        <p className="text-xs text-[#8b949e]">{filtered.length} comments</p>
      </div>

      <div className="inline-flex rounded-lg border border-[#21262d] overflow-hidden mb-4">
        {TABS.map((k) => {
          const s = SCENARIOS[k];
          const isActive = active === k;
          return (
            <button
              key={k}
              onClick={() => setActive(k)}
              className="px-3 py-1.5 text-xs font-medium border-r border-[#21262d] last:border-r-0 transition-colors"
              style={{
                background: isActive ? s.color : "transparent",
                color: isActive ? "#0d1117" : "#c9d1d9",
              }}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {user ? (
        <form onSubmit={onSubmit} className="mb-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Share your thoughts on ${SCENARIOS[active].label}...`}
            maxLength={500}
            rows={3}
            className="w-full rounded-lg bg-[#0d1117] border border-[#21262d] px-3 py-2 text-sm text-[#c9d1d9] placeholder:text-[#484f58] focus:outline-none focus:border-[#388bfd]"
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-[#8b949e]">
              {text.length}/500
            </span>
            <button
              type="submit"
              disabled={submitting || !text.trim()}
              className="px-4 py-1.5 text-sm font-medium rounded-lg bg-[#238636] text-white hover:bg-[#2ea043] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? "Posting..." : "Post comment"}
            </button>
          </div>
          {error && (
            <p className="text-xs text-[#f85149] mt-2">{error}</p>
          )}
        </form>
      ) : (
        <div className="mb-4 rounded-lg border border-dashed border-[#21262d] p-3 text-xs text-[#8b949e]">
          Sign in to join the discussion.
        </div>
      )}

      <ul className="space-y-3">
        {filtered.length === 0 && (
          <li className="text-xs text-[#484f58] italic">
            No comments yet. Be the first to post.
          </li>
        )}
        {filtered.map((c) => (
          <li
            key={c.id}
            className="flex gap-3 p-3 rounded-lg bg-[#0d1117] border border-[#21262d]"
          >
            {c.avatar_url ? (
              <img
                src={c.avatar_url}
                alt=""
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#30363d] flex items-center justify-center text-xs font-semibold flex-shrink-0">
                {c.display_name.slice(0, 1).toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-medium text-white truncate">
                  {c.display_name}
                </span>
                <span className="text-xs text-[#8b949e]">
                  {new Date(c.created_at).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-[#c9d1d9] mt-1 whitespace-pre-wrap break-words">
                {c.content}
              </p>
            </div>
            {user?.id === c.user_id && (
              <button
                onClick={() => onDelete(c.id)}
                className="text-[#8b949e] hover:text-[#f85149] transition-colors self-start"
                aria-label="Delete comment"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
