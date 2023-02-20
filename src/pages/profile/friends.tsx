import { getPrivateProfileLayout } from "@/components/ui/ProfileLayout";
import { NextPageWithLayout } from "../_app";

const Friends: NextPageWithLayout = () => {
  return <>friends</>;
};

Friends.getLayout = getPrivateProfileLayout;

export default Friends;
