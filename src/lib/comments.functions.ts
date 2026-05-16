import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const ScenarioKeySchema = z.enum(["bau", "ndc", "50pct"]);

const AddCommentSchema = z.object({
  scenario_key: ScenarioKeySchema,
  content: z.string(),
  display_name: z.string().min(1).max(120),
  avatar_url: z.string().url().max(2048).optional().nullable(),
});

export const addComment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => AddCommentSchema.parse(input))
  .handler(async ({ data, context }) => {
    // validate-comment logic (replaces the requested edge function)
    const content = data.content.trim();
    if (content.length === 0) {
      throw new Error("Comment cannot be empty");
    }
    if (content.length > 500) {
      throw new Error("Comment must be 500 characters or fewer");
    }

    const { supabase, userId } = context;
    const { error } = await supabase.from("comments").insert({
      user_id: userId,
      scenario_key: data.scenario_key,
      content,
      display_name: data.display_name,
      avatar_url: data.avatar_url ?? null,
    });

    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteComment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("comments")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
