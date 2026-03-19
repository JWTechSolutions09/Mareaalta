import React from "react";
import { useSiteAssetsStore } from "../../zustand/siteAssetsStore";

type AssetKey = "heroMainImage" | "aboutImage" | "navbarLogo";

export const AdminAppearance: React.FC = () => {
  const { heroMainImage, aboutImage, navbarLogo, setAsset, uploadAsset, resetDefaults, fetchAssets } = useSiteAssetsStore();

  React.useEffect(() => {
    void fetchAssets().catch(() => undefined);
  }, [fetchAssets]);

  const onUpload = (key: AssetKey, file?: File | null) => {
    if (!file) return;
    void uploadAsset(key, file).catch(() => undefined);
  };

  const cards: Array<{ key: AssetKey; title: string; value: string }> = [
    { key: "heroMainImage", title: "Imagen principal", value: heroMainImage },
    { key: "aboutImage", title: "Imagen 2 sobre Mareaalta", value: aboutImage },
    { key: "navbarLogo", title: "Logo del navbar", value: navbarLogo },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="heading-serif text-2xl text-[var(--ma-black)]">Apariencia de la página</h2>
        <button
          className="btn-outline-gold !px-4 !py-1.5"
          onClick={() => {
            if (confirm("¿Restaurar las imágenes por defecto?")) resetDefaults();
          }}
        >
          Restaurar imágenes por defecto
        </button>
      </div>
      <p className="text-sm text-neutral-600">
        Cambia las imágenes principales desde aquí. Puedes subir archivos locales o pegar una URL.
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.key} className="card p-4 space-y-3">
            <p className="font-semibold">{c.title}</p>
            <img src={c.value || "/LogoM.png"} alt={c.title} className="w-full h-44 object-cover rounded-lg border" />
            <input
              className="w-full rounded border px-3 py-2 text-sm"
              placeholder="URL de imagen"
              value={c.value}
              onChange={(e) => { void setAsset(c.key, e.target.value); }}
            />
            <label className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-dashed px-3 py-2 text-sm cursor-pointer hover:bg-[var(--ma-pink-50)] transition">
              <span>📷 Subir desde mi equipo</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => onUpload(c.key, e.target.files?.[0])} />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
