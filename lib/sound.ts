/**
 * Motor de sonido (desactivado a petición del usuario).
 * Expone métodos no-op compatibles con la interfaz previa para evitar errores de tipo o ejecución.
 */

class SoundEngine {
  public getMuted(): boolean {
    return true
  }

  public setMuted(_muted: boolean): void {}

  public toggleMute(): boolean {
    return true
  }

  public subscribe(_fn: (muted: boolean) => void): () => void {
    return () => {}
  }

  public playClick(): void {}

  public playKey(): void {}

  public playSwitch(): void {}

  public playSuccess(): void {}
}

export const sounds = new SoundEngine()

