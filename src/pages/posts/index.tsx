import { trpc } from "@/utils/trpc";

const Posts: React.FC = () => {
  const { data } = trpc.posts.all.useQuery();

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default Posts;
