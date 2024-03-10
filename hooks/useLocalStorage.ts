import { useEffect, useState } from "react";

export default function useLocalStorage() {
  const [backup, setBackup] = useState(null);
  const [timer, setTimer] = useState<string | null>(null);

  useEffect(() => {
    const localBackup = localStorage.getItem("readme-backup");

    if (localBackup) {
      setBackup(JSON.parse(localBackup));
    }
  }, []);

  const saveBackup = (templates: any) => {
    try {
      if (timer) {
        clearTimeout(timer);
      }

      setTimeout(() => {
        localStorage.setItem("readme-backup", JSON.stringify(templates));
    //    setTimer(value as string)
      }, 1000)
     
    
      
    } catch (_) {
      console.log("Failed to create a local backup");
    }
  };

  const deletBackup = () => {
    try {
      localStorage.removeItem("readme-backup");
    } catch (_) {
      console.error("Failed to delete local backup");
    }
  };

  return { backup, saveBackup, deletBackup };
}
