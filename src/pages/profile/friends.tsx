import { getPrivateProfileLayout } from "@/components/ui/ProfileLayout";
import { NextPageWithLayout } from "../_app";
import Friend from "@/components/Friend";
import List from "@/components/ui/List";

const Friends: NextPageWithLayout = () => {
  return (
    <>
      <List of={[{ userName: "sqmasep" }, { userName: "hell yeah" }]}>
        {({ userName }) => <Friend userName={userName} />}
      </List>
    </>
  );
};

Friends.getLayout = getPrivateProfileLayout;

export default Friends;
