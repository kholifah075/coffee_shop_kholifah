import { useRouter } from "expo-router"; // kalau pakai expo-router
import { useEffect, useState } from "react";
import { getToken } from "../config/storage";

export default function useAuthGuard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken("accessToken");

      if (!token) {
        router.push("/login"); // redirect ke login
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return loading;
}