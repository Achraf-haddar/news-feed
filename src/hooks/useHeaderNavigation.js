// useHeaderNavigation.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useHeaderNavigation(initialPages, setAnchorElNav) {
  const [selectedPage, setSelectedPage] = useState(
    window.location.pathname.substring(1)
  );
  const navigate = useNavigate();

  const handleNavigation = (page) => {
    navigate(`/${page}`);
    setAnchorElNav(null);
    setSelectedPage(page);
  };

  return { selectedPage, handleNavigation, pages: initialPages };
}
