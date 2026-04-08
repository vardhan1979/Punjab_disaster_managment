const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }, // Markdown or HTML string
    videoUrl: { type: String }, // Links to YouTube or S3
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isApproved: { type: Boolean, default: false }, // Admin moderation
    category: { type: String, enum: ['Floods', 'Earthquakes', 'Fire', 'First Aid'] },
    createdAt: { type: Date, default: Date.now }
});