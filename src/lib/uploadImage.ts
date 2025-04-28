import { supabase } from "@/supabase/supabase.config";

export async function uploadImage(file: File): Promise<string | null> {
  const fileName = `${Date.now()}-${file.name}`;

  // 画像をアップロード
  const { error } = await supabase.storage
    .from("post-images") // ← バケット名に合わせて
    .upload(fileName, file);

  if (error) {
    console.error("❌ アップロード失敗:", error.message);
    return null;
  }

  // 公開URLを取得
  const { data: publicUrlData } = supabase.storage
    .from("post-images")
    .getPublicUrl(fileName);

  return publicUrlData?.publicUrl ?? null;
}
