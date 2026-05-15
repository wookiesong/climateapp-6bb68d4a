CREATE TABLE public.test_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.test_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read test_items" ON public.test_items FOR SELECT USING (true);
CREATE POLICY "Public can insert test_items" ON public.test_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can delete test_items" ON public.test_items FOR DELETE USING (true);