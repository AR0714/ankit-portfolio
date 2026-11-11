import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Headers are checked before the filesystem, so this also covers
        // /public files. Vercel serves PDFs as `inline`, which makes some
        // browsers ignore the anchor's `download` attribute and do nothing;
        // forcing `attachment` makes the report download everywhere.
        source: "/docs/:file*",
        headers: [{ key: "Content-Disposition", value: "attachment" }],
      },
    ];
  },
};

export default nextConfig;
