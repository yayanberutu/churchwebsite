// src/api/siteConfigApi.js

const MOCK_DATA = {
  success: true,
  message: "Site config fetched successfully",
  data: {
    churchName: "HKBP Kernolong",
    churchLogoUrl: "", // Empty for now, will use text fallback
    menus: [
      { id: 1, name: "Home", slug: "home", path: "/", order: 1, isActive: true },
      { id: 2, name: "About Us", slug: "about", path: "/about", order: 2, isActive: true },
      { id: 3, name: "Ministries", slug: "ministries", path: "/ministries", order: 3, isActive: true },
      { id: 4, name: "Sermons", slug: "sermons", path: "/sermons", order: 4, isActive: true },
      { id: 5, name: "Events", slug: "events", path: "/events", order: 5, isActive: true },
      { id: 6, name: "Giving", slug: "giving", path: "/giving", order: 6, isActive: true },
    ]
  }
};

export const fetchSiteConfig = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/v1/public/site-config");
    if (!response.ok) throw new Error("Backend not reachable");
    return await response.json();
  } catch (error) {
    console.warn("Backend fetch failed, using mock data:", error);
    // Simulate API delay for mock
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_DATA);
      }, 500);
    });
  }
};
