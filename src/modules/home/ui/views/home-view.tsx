"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function HomeView() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  return (
    <div className="flex flex-col gap-y-4 p-4">
      <h1>Home view</h1>
      <p>
        Logged In user {"==>"}
        {session?.user?.name}
      </p>
      <Button
        onClick={async () =>
          await authClient.signOut({
            fetchOptions: {
              onSuccess() {
                router.push("/sign-in");
              },
            },
          })
        }
      >
        sign out
      </Button>
    </div>
  );
}
