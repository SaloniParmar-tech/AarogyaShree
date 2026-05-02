import CommunityCard from "./CommunityCard";

export default function CommunityFeed({ posts, onHide }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Community Stories</h2>

      {posts.length ? (
        posts.map((post) => (
          <CommunityCard
            key={post.id}
            post={post}
            onHide={() => onHide(post.id)}
          />
        ))
      ) : (
        <div className="bg-white p-6 rounded-2xl text-center text-sm text-gray-500">
          No posts yet for this topic.
        </div>
      )}
    </div>
  );
}
