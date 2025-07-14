// SEO Meta Manager - Dynamically manage meta tags based on PAXIS SEO profile

export interface MetaTagConfig {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  twitterSite?: string;
  canonicalUrl?: string;
  robots?: string;
  language?: string;
  structuredData?: object;
}

export class SEOManager {
  private static instance: SEOManager;

  static getInstance(): SEOManager {
    if (!SEOManager.instance) {
      SEOManager.instance = new SEOManager();
    }
    return SEOManager.instance;
  }

  updateMetaTags(config: MetaTagConfig): void {
    // Update document title
    if (config.title) {
      document.title = config.title;
    }

    // Update or create meta tags
    this.setMetaTag("description", config.description);
    this.setMetaTag("keywords", config.keywords);
    this.setMetaTag("author", config.author);
    this.setMetaTag("robots", config.robots || "index, follow");

    // Open Graph tags
    this.setMetaProperty("og:title", config.ogTitle || config.title);
    this.setMetaProperty(
      "og:description",
      config.ogDescription || config.description,
    );
    this.setMetaProperty("og:image", config.ogImage);
    this.setMetaProperty("og:url", config.ogUrl);
    this.setMetaProperty("og:type", config.ogType || "website");

    // Twitter Card tags
    this.setMetaTag(
      "twitter:card",
      config.twitterCard || "summary_large_image",
    );
    this.setMetaTag("twitter:site", config.twitterSite || "@paxisdao");
    this.setMetaTag("twitter:title", config.ogTitle || config.title);
    this.setMetaTag(
      "twitter:description",
      config.ogDescription || config.description,
    );
    this.setMetaTag("twitter:image", config.ogImage);

    // Canonical URL
    if (config.canonicalUrl) {
      this.setLinkTag("canonical", config.canonicalUrl);
    }

    // Language
    if (config.language) {
      document.documentElement.lang = config.language;
    }

    // Structured Data
    if (config.structuredData) {
      this.setStructuredData(config.structuredData);
    }
  }

  private setMetaTag(name: string, content?: string): void {
    if (!content) return;

    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", name);
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", content);
  }

  private setMetaProperty(property: string, content?: string): void {
    if (!content) return;

    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("property", property);
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", content);
  }

  private setLinkTag(rel: string, href: string): void {
    let link = document.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", rel);
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);
  }

  private setStructuredData(data: object): void {
    const id = "structured-data-ld-json";
    let script = document.getElementById(id);

    if (!script) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = id;
      document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);
  }

  // Predefined SEO configurations for PAXIS pages
  static getPageConfig(path: string): MetaTagConfig {
    const baseConfig: MetaTagConfig = {
      author: "Wild Panther, PAXIS Initiative",
      ogType: "website",
      twitterCard: "summary_large_image",
      twitterSite: "@paxisdao",
      robots: "index, follow",
      language: "en",
      structuredData: {
        "@context": "https://schema.org",
        "@type": "NGO",
        name: "PAXIS",
        url: "https://paxis.global",
        logo: "https://paxis.global/logo.svg",
        sameAs: [
          "https://twitter.com/paxisdao",
          "https://github.com/paxisdao",
          "https://discord.gg/paxis",
        ],
        description:
          "PAXIS is an open-source peace tech stack that uses blockchain, AI, VR, and trust-based systems to build post-conflict infrastructure and make war obsolete.",
        location: {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressRegion: "Global",
            addressCountry: "World",
          },
        },
        founder: {
          "@type": "Person",
          name: "Wild Panther",
        },
      },
    };

    const pages: Record<string, Partial<MetaTagConfig>> = {
      "/": {
        title: "PAXIS: PeaceTech Stack for a Post-War World",
        description:
          "Build positive peace with PAXIS — the open-source full-stack ecosystem for conflict resolution, disarmament, commons sharing, and global diplomacy powered by AI, blockchain, and community.",
        keywords:
          "peacetech, positive peace, conflict AI, blockchain for peace, VR diplomacy, Peace DAO, PeaceCoin, disarmament tech, empathy engine, trust protocol",
        ogTitle: "PAXIS: Engineering Peace for the 21st Century",
        ogDescription:
          "PAXIS is an open-source ecosystem for peacebuilders. Powered by blockchain, AI, and cultural intelligence. Make war obsolete.",
        ogImage: "https://paxis.global/og-cover.jpg",
        ogUrl: "https://paxis.global",
        canonicalUrl: "https://paxis.global",
      },
      "/dao": {
        title: "Join PeaceDAO - Decentralized Governance for Global Peace",
        description:
          "Participate in the PeaceDAO governance system. Vote on peace initiatives, propose solutions, and help build a decentralized future for conflict resolution.",
        keywords:
          "Peace DAO, decentralized governance, blockchain voting, peace initiatives, community governance",
        ogTitle: "PeaceDAO: Community-Governed Peace Building",
        ogUrl: "https://paxis.global/dao",
      },
      "/tools": {
        title: "AI, Blockchain & VR Tools - PAXIS Peace Technology",
        description:
          "Explore cutting-edge peace technology tools including AI-powered conflict resolution, blockchain trust networks, and VR empathy labs.",
        keywords:
          "AI tools, blockchain tools, VR tools, conflict resolution technology, peace tech stack",
        ogTitle: "Advanced Peace Technology Tools",
        ogUrl: "https://paxis.global/tools",
      },
      "/vr-labs": {
        title: "VR Empathy Labs - Virtual Reality for Peace Education",
        description:
          "Experience immersive VR environments designed to build empathy, understanding, and cultural bridge-building across divides.",
        keywords:
          "VR empathy lab, virtual reality peace, empathy education, cultural exchange VR, peace training",
        ogTitle: "VR Labs: Building Empathy Through Virtual Reality",
        ogUrl: "https://paxis.global/vr-labs",
      },
      "/peacecoin": {
        title: "PeaceCoin - Earn Peace Through Positive Action",
        description:
          "Learn about PeaceCoin, the cryptocurrency that rewards peace-building activities, conflict resolution, and community healing efforts.",
        keywords:
          "PeaceCoin, earn peace, peace cryptocurrency, blockchain rewards, peace economy",
        ogTitle: "PeaceCoin: The Currency of Peace",
        ogUrl: "https://paxis.global/peacecoin",
      },
    };

    return { ...baseConfig, ...pages[path] };
  }
}

// Hook for React components
export const useSEO = (path: string) => {
  const seo = SEOManager.getInstance();

  const updateSEO = (customConfig?: Partial<MetaTagConfig>) => {
    const defaultConfig = SEOManager.getPageConfig(path);
    const finalConfig = { ...defaultConfig, ...customConfig };
    seo.updateMetaTags(finalConfig);
  };

  return { updateSEO };
};
