import { useEffect } from 'react';

interface ShortcutConfig {
  key: string;
  ctrlKey?: boolean;
  action: () => void;
}

export function useKeyboardShortcuts(shortcuts: ShortcutConfig[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      shortcuts.forEach(({ key, ctrlKey, action }) => {
        if (
          event.key.toLowerCase() === key.toLowerCase() &&
          (!ctrlKey || (ctrlKey && event.ctrlKey))
        ) {
          event.preventDefault();
          action();
        }
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}