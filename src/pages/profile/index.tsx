import Card from "@/components/Card";
import CardList from "@/components/ui/CardList";
import { getPrivateProfileLayout } from "@/components/ui/ProfileLayout";
import useSettingsStore from "@/store/settings";
import { trpc } from "@/utils/trpc";
import { FormControlLabel, Switch } from "@mui/material";
import { NextPageWithLayout } from "../_app";

const Profile: NextPageWithLayout = () => {
  const { data, isLoading, isError } = trpc.posts.personalInfos.useQuery();
  const settings = useSettingsStore();

  return (
    <>
      <FormControlLabel
        label='Masquer les posts supprimés'
        control={
          <Switch
            value={settings.maskDeleted}
            onChange={() => settings.toggleMaskDeleted()}
          />
        }
      />

      {data && (
        <CardList data={data?.posts} mt={4}>
          {post => (
            <Card
              title={post.title}
              description={post.description}
              postId={post.id}
              authorId={post.authorId}
              deleteButton
              deleted={post.deleted}
              date={post.createdAt}
            />
          )}
        </CardList>
      )}
    </>
  );
};

Profile.getLayout = getPrivateProfileLayout;

export default Profile;
