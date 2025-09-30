-- Create storage bucket for plant images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'plant-images',
  'plant-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
);

-- Storage policies for plant images
CREATE POLICY "Anyone can view plant images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'plant-images');

CREATE POLICY "Admins can upload plant images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'plant-images' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can update plant images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'plant-images' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can delete plant images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'plant-images' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );