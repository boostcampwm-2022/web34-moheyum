import { useRouter } from "next/router";
import React, { useEffect, useState } from "react"

type AuthProps = {
  children: React.ReactNode;
  noRedirect?: boolean;
}

export default function AuthGuard({ children, noRedirect=false }: AuthProps ) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    authCheck();
  }, [])

  async function authCheck() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
    {credentials: "include"});
    const result = await response.json();
    if (result.message === "success") {
      setAuthorized(true);
    }
    if (result.message === "Unauthorized") {
      setAuthorized(false);
      if (!noRedirect)
        router.push("/login");
    }
  }

  return (
    <>
      {(noRedirect || authorized) && children}
    </>
  )
}
