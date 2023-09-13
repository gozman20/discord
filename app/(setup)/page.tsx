import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { InitialProfile } from "@/lib/initialProfile";
import { InitialModal } from "@/components/modals/InitialModal";

export default async function SetUp() {
  const profile = await InitialProfile();

  const server = await prismadb.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (server) return redirect(`/servers/${server.id}`);
  return (
    <div className="">
      <InitialModal />
    </div>
  );
}
