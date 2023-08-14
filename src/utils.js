import { dirname } from "path";
import { fileURLToPath } from "url";

// Obtiene la ruta absoluta del archivo actual y el directorio que lo contiene
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

// Exporta el directorio que contiene el archivo actual
export default __dirname;
