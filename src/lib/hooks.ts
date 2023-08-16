import { useEffect } from "react";

export const useMaterialIcons = () => {
    useEffect(() => {
        const head = document.querySelector('head');
        if(head) {
          const existingMaterialIconsLink = head.querySelector('link[href="https://fonts.googleapis.com/icon?family=Material+Icons"]');
          if(!existingMaterialIconsLink) {
            const newMaterialIconsLink = document.createElement('link');
            newMaterialIconsLink.setAttribute("href", "https://fonts.googleapis.com/icon?family=Material+Icons");
            newMaterialIconsLink.setAttribute("rel", "stylesheet");
            head.appendChild(newMaterialIconsLink);
          }
        }
      }, []);
};