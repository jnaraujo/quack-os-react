import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

const default_code = `import math

print("Hello, world!")
print("Square root of 2 is", math.sqrt(2))`

interface PyIDEStore {
  code: string
  setCode: (code: string) => void
}

export const usePyIDEStore = create(
  persist<PyIDEStore>(
    (set) => ({
      code: default_code,
      setCode: (code: string) => set({ code }),
    }),
    {
      name: "pyeditor-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
