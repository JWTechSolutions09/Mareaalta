import { create } from "zustand";
import { persist } from "zustand/middleware";

type SiteAssetsState = {
  heroMainImage: string;
  aboutImage: string;
  navbarLogo: string;
  setAsset: (key: "heroMainImage" | "aboutImage" | "navbarLogo", value: string) => void;
  resetDefaults: () => void;
};

export const useSiteAssetsStore = create<SiteAssetsState>()(
  persist(
    (set) => ({
      heroMainImage: "/LogoM.png",
      aboutImage: "/LogoM.png",
      navbarLogo: "/LogoM.png",
      setAsset: (key, value) => set({ [key]: value } as Pick<SiteAssetsState, typeof key>),
      resetDefaults: () =>
        set({
          heroMainImage: "/LogoM.png",
          aboutImage: "/LogoM.png",
          navbarLogo: "/LogoM.png",
        }),
    }),
    { name: "ma-site-assets" }
  )
);
