export function validEnvValue(value: string | number): string | number {
  if (value === undefined || value === "") {
    throw new Error(`Valeur d'environnement manquante`);
  }
  return value;
}
