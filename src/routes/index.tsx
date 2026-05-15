import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

type TestItem = {
  id: string;
  content: string;
  created_at: string;
};

function Index() {
  const [items, setItems] = useState<TestItem[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("test_items")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else setItems(data ?? []);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    setError(null);
    const { error } = await supabase
      .from("test_items")
      .insert({ content: content.trim() });
    if (error) setError(error.message);
    else {
      setContent("");
      await fetchItems();
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("test_items").delete().eq("id", id);
    if (error) setError(error.message);
    else await fetchItems();
  };

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Supabase 테스트 페이지
        </h1>
        <p className="text-muted-foreground mb-8">
          데이터를 읽고 쓰는 간단한 테스트입니다.
        </p>

        <Card className="p-4 mb-6">
          <form onSubmit={handleAdd} className="flex gap-2">
            <Input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요..."
              disabled={loading}
            />
            <Button type="submit" disabled={loading || !content.trim()}>
              추가
            </Button>
          </form>
          {error && (
            <p className="text-sm text-destructive mt-2">{error}</p>
          )}
        </Card>

        <div className="space-y-2">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              아직 데이터가 없습니다.
            </p>
          ) : (
            items.map((item) => (
              <Card
                key={item.id}
                className="p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-foreground">{item.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </Card>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
