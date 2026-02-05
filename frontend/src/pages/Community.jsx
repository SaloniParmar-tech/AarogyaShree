import { useState } from "react";
import communityPosts from "../data/communityPosts";
import { communityTopics } from "../data/communityTopics";

import CommunityHeader from "../components/community/CommunityHeader";
import TopicTabs from "../components/community/TopicTabs";
import CommunityCard from "../components/community/CommunityCard";
import DisclaimerBanner from "../components/community/DisclaimerBanner";
import ShareStoryModal from "../components/community/ShareStoryModal";

export default function Community() {
  const [activeTopic, setActiveTopic] = useState("All");
  const [posts, setPosts] = useState(communityPosts);
  const [showModal, setShowModal] = useState(false);
  const [hiddenPosts, setHiddenPosts] = useState(new Set());

  const filteredPosts = posts
    .filter((p) => activeTopic === "All" || p.topic === activeTopic)
    .filter((p) => !hiddenPosts.has(p.id))
    .sort((a, b) => (b.supportCount ?? 0) - (a.supportCount ?? 0));

  return (
    <div className="min-h-screen bg-pink-50">
      <div className="max-w-4xl mx-auto px-6 py-6">
        <CommunityHeader />

        <div className="mt-6">
          <TopicTabs
            activeTopic={activeTopic}
            onChange={setActiveTopic}
            topics={["All", ...communityTopics]}
          />
        </div>

        <DisclaimerBanner />

        <div className="mt-6 space-y-4">
          {filteredPosts.length ? (
            filteredPosts.map((post) => (
              <CommunityCard
                key={post.id}
                post={post}
                onHide={() =>
                  setHiddenPosts((prev) => new Set(prev).add(post.id))
                }
              />
            ))
          ) : (
            <div className="bg-white rounded-2xl border border-pink-200 p-8 text-center text-sm text-gray-600">
              No posts available for this topic yet.
            </div>
          )}
        </div>

        {/* Share button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 rounded-full
              bg-pink-600/80 text-white text-sm font-medium
              hover:bg-pink-600 transition"
          >
            Share Your Story
          </button>
        </div>

        <ShareStoryModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={(newPost) => setPosts((prev) => [newPost, ...prev])}
          topics={communityTopics}
        />
      </div>
    </div>
  );
}
