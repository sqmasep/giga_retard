import React, { useEffect } from "react";
import { trpc } from "@/utils/trpc";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ProfileHeader from "./ProfileHeader";

const PublicProfile: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const router = useRouter();
  const userId = router.query.userId as string;
  const { data: session } = useSession();
  const { data } = trpc.posts.byProfileId.useQuery(
    {
      id: userId,
    },
    {
      enabled: !!userId,
    }
  );

  useEffect(() => {
    if (session && session.user.id === userId) router.push("/profile");
  }, [session, userId]);

  return (
    <>
      <ProfileHeader nbPosts={2} userId={userId} userImage={""} userName={""} />
      {children}
      <p>{userId}</p>
    </>
  );
};

export default PublicProfile;
