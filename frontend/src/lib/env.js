// Dev: dùng /api/v1 → Vite proxy tới backend (tránh lỗi CORS). Production: set VITE_BASE_BE_URL đầy đủ.
const baseBe =
    import.meta.env.VITE_BASE_BE_URL ||
    import.meta.env.VIT_BASE_BE_URL ||
    (import.meta.env.DEV ? '/api/v1' : 'http://localhost:3000/api/v1');

export const ENV = {
    VITE_BASE_BE_URL: baseBe,
};

export default ENV;