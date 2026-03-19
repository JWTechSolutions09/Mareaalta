import { create } from "zustand";
import { ensureSupabaseConfigured, supabase } from "../lib/supabase";

type SiteAssetsState = {
  heroMainImage: string;
  aboutImage: string;
  navbarLogo: string;
  loading: boolean;
  fetchAssets: () => Promise<void>;
  setAsset: (key: "heroMainImage" | "aboutImage" | "navbarLogo", value: string) => Promise<void>;
  uploadAsset: (key: "heroMainImage" | "aboutImage" | "navbarLogo", file: File) => Promise<void>;
  resetDefaults: () => Promise<void>;
};

const DEFAULTS = {
  heroMainImage: "/LogoM.png",
  aboutImage: "/LogoM.png",
  navbarLogo: "/LogoM.png",
} as const;

export const useSiteAssetsStore = create<SiteAssetsState>()((set) => ({
  ...DEFAULTS,
  loading: false,
  fetchAssets: async () => {
    ensureSupabaseConfigured();
    set({ loading: true });
    const { data, error } = await supabase.from("site_assets").select("key, value");
    if (error) {
      set({ loading: false });
      throw error;
    }
    const next = { ...DEFAULTS } as Record<string, string>;
    for (const row of data ?? []) {
      next[row.key] = row.value;
    }
    set({
      heroMainImage: next.heroMainImage || DEFAULTS.heroMainImage,
      aboutImage: next.aboutImage || DEFAULTS.aboutImage,
      navbarLogo: next.navbarLogo || DEFAULTS.navbarLogo,
      loading: false,
    });
  },
  setAsset: async (key, value) => {
    ensureSupabaseConfigured();
    set({ [key]: value } as Pick<SiteAssetsState, typeof key>);
    const { error } = await supabase.from("site_assets").upsert({ key, value }, { onConflict: "key" });
    if (error) throw error;
  },
  uploadAsset: async (key, file) => {
    ensureSupabaseConfigured();
    const ext = file.name.split(".").pop() || "jpg";
    const path = `site-assets/${key}-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("site-assets").upload(path, file, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from("site-assets").getPublicUrl(path);
    await useSiteAssetsStore.getState().setAsset(key, data.publicUrl);
  },
  resetDefaults: async () => {
    ensureSupabaseConfigured();
    set({ ...DEFAULTS });
    const payload = Object.entries(DEFAULTS).map(([key, value]) => ({ key, value }));
    const { error } = await supabase.from("site_assets").upsert(payload, { onConflict: "key" });
    if (error) throw error;
  },
}));
