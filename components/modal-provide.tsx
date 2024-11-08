"use client";

import { useState, useEffect } from "react";
import { SettingsModal } from "./modals/setting-modals";
import { CoverImageModal } from "./modals/coverImage-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  );
};
