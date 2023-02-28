import { getPrivateProfileLayout } from "@/components/ui/ProfileLayout";
import { NextPageWithLayout } from "../_app";
import ProfileCard from "@/components/ProfileCard";
import List from "@/components/ui/List";

const Friends: NextPageWithLayout = () => {
  return (
    <>
      <List of={[{ userName: "sqmasep" }, { userName: "hell yeah" }]}>
        {({ userName }) => (
          <ProfileCard
            userName={userName}
            userId={"dsqdsq"}
            lastConnection={Date.now()}
            defaultFollow={false}
            defaultFriend={true}
          />
        )}
      </List>
    </>
  );
};

Friends.getLayout = getPrivateProfileLayout;

export default Friends;
