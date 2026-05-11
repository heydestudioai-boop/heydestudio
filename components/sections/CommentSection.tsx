'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Comment {
  id: string;
  name: string;
  email: string;
  content: string;
  date: string;
}

export function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      content:
        'Excellent breakdown of visual systems. This is exactly what we needed for our brand.',
      date: '2024-05-01',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.content) {
      return;
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      content: formData.content,
      date: new Date().toISOString().split('T')[0],
    };

    setComments([newComment, ...comments]);
    setFormData({ name: '', email: '', content: '' });
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Comment Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta/20"
            required
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta/20"
            required
          />
        </div>

        <textarea
          placeholder="Your comment..."
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          rows={4}
          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-magenta focus:ring-1 focus:ring-magenta/20"
          required
        />

        <button
          type="submit"
          className="px-6 py-2 bg-magenta text-white font-bold rounded hover:bg-magenta-dark transition-colors"
        >
          Post Comment
        </button>

        <AnimatePresence>
          {submitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-green-600 text-sm font-medium"
            >
              ✓ Comment posted successfully
            </motion.p>
          )}
        </AnimatePresence>
      </motion.form>

      {/* Comments List */}
      <div className="space-y-6 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-bold">{comments.length} Comments</h3>

        <div className="space-y-6">
          {comments.map((comment, idx) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="border-l-4 border-magenta pl-6 py-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-black">{comment.name}</p>
                  <p className="text-xs text-gray-500">{comment.date}</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{comment.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
