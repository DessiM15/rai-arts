import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Old routes from the first build of the site. Anything that linked to them
   * (search results, Kira's Instagram bio, printed material) keeps working.
   */
  async redirects() {
    return [
      { source: "/workshops", destination: "/services", permanent: true },
      {
        source: "/workshops/college",
        destination: "/services/consulting",
        permanent: true,
      },
      {
        source: "/workshops/online",
        destination: "/services/literacy-series",
        permanent: true,
      },
      { source: "/founders", destination: "/about", permanent: true },
      { source: "/shop", destination: "/learn", permanent: true },
    ];
  },
};

export default nextConfig;
