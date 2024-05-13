'use client';

import { CoverImageModal } from '@/components/modals/cover-image-modal';
import { SettingsModal } from '@/components/modals/settings-modal';
import { useEffect, useState } from 'react';

export const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <SettingsModal />
      <CoverImageModal />
    </>
  );
};
