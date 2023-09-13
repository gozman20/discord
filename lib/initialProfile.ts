import prismadb from "./prismadb";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";

export const InitialProfile = async () => {
  const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }

  const profile = await prismadb.profile.findUnique({
    where: {
      userId: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await prismadb.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newProfile;
};
