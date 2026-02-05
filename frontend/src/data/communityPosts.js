const communityPosts = [
    {
        id: 1,
        type: "story",
        topic: "Periods",
        title: "I finally spoke to a doctor",
        content:
            "For years I ignored painful periods thinking it was normal. After joining this community, I realised I should seek help. Talking to a gynecologist changed everything.",
        author: "Anonymous",
        timestamp: "2 days ago",
        supportCount: 12,
    },

    {
        id: 2,
        type: "expert",
        topic: "Mental Health",
        title: "Stress and menstrual cycles",
        content:
            "High stress levels can delay ovulation and disrupt menstrual cycles. Managing stress through sleep, nutrition, and professional support can significantly improve hormonal balance.",
        author: "Dr. Meera (Gynecologist)",
        verified: true,
        timestamp: "3 days ago",
        supportCount: 25,
    },

    {
        id: 3,
        type: "story",
        topic: "Pregnancy",
        title: "My first trimester experience",
        content:
            "The first trimester was overwhelming—nausea, anxiety, and constant fear. Reading other women's stories here helped me feel less alone.",
        author: "Anonymous",
        timestamp: "5 days ago",
        supportCount: 9,
    },

    {
        id: 4,
        type: "resource",
        topic: "Safety",
        title: "Government women helplines",
        content:
            "If you are in danger or distress, these helplines are available 24/7.",
        ctaText: "View helplines",
        onCtaClick: () => {
            window.location.href = "/resources";
        },
    }
    ,

    {
        id: 5,
        type: "expert",
        topic: "Other Health",
        title: "When to consult a doctor",
        content:
            "If pain, irregular cycles, or emotional distress affect daily life, do not ignore the symptoms. Early consultation prevents long-term complications.",
        author: "Dr. Asha (Community Health Expert)",
        verified: true,
        timestamp: "1 week ago",
        supportCount: 18,
    },
];

export default communityPosts;
