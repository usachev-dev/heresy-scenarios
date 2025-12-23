export let storage: {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
} =  global?.localStorage || {
  getItem(key: string): string {
    return ""
  },
  setItem(key: string, value: string) {},
  removeItem(key: string) {}
}
