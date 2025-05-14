import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRightIcon, 
  CodeBracketIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  TagIcon
} from '@heroicons/react/24/outline';

// Import global styles
import './index.css';

// Import pages
import Features from './pages/features';
import Pricing from './pages/pricing';
import Documentation from './pages/documentation';
import About from './pages/about';

// Auth components
import { AuthProvider, useAuth } from './AuthContext';
import AuthModal from './components/AuthModal';
import UserDropdown from './components/UserDropdown';

// Mock Blog Post Data
const mockBlogPosts = [
  {
    id: 1,
    title: 'The Evolution of AI in Web Development',
    slug: 'evolution-ai-web-dev',
    excerpt: 'Explore how Artificial Intelligence is reshaping the landscape of web development, from automated coding to intelligent user experiences.',
    author: 'Dr. Ada Lovelace',
    date: 'November 15, 2023',
    category: 'Artificial Intelligence',
    imageUrl: 'https://placehold.co/800x400?text=AI+in+Web+Dev',
    imageFilename: 'ai-web-dev-featured',
    imageWidth: 800,
    imageHeight: 400,
    featured: true,
  },
  {
    id: 2,
    title: 'Crafting Modern User Interfaces with React',
    slug: 'modern-ui-react',
    excerpt: 'A deep dive into the principles and practices for building beautiful, responsive, and intuitive user interfaces using React.',
    author: 'Brendan Eich',
    date: 'November 10, 2023',
    category: 'React',
    imageUrl: 'https://placehold.co/400x225?text=Modern+React+UI',
    imageFilename: 'modern-react-ui',
    imageWidth: 400,
    imageHeight: 225,
    featured: false,
  },
  {
    id: 3,
    title: 'Serverless Architectures: The Future of Scalable Applications',
    slug: 'serverless-architectures-future',
    excerpt: 'Understand the benefits and challenges of serverless computing and how it enables developers to build highly scalable and cost-effective applications.',
    author: 'Grace Hopper',
    date: 'November 5, 2023',
    category: 'Backend',
    imageUrl: 'https://placehold.co/400x225?text=Serverless+Future',
    imageFilename: 'serverless-future',
    imageWidth: 400,
    imageHeight: 225,
    featured: false,
  },
  {
    id: 4,
    title: 'The Importance of UX in SaaS Products',
    slug: 'ux-in-saas',
    excerpt: 'Why a great user experience is critical for the success of Software-as-a-Service products and how to achieve it.',
    author: 'Alan Turing',
    date: 'October 30, 2023',
    category: 'UX/UI Design',
    imageUrl: 'https://placehold.co/400x225?text=UX+for+SaaS',
    imageFilename: 'ux-for-saas',
    imageWidth: 400,
    imageHeight: 225,
    featured: false,
  },
];

function BlogPostCard({ post }) {
  return (
    <motion.div 
      className="blog-post-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link to={`/blog/${post.slug}`} className="post-card-image-link">
        {/* #ai-image-${post.imageWidth}x${post.imageHeight} img=${post.imageFilename} */}
        <img 
          src={post.imageUrl} 
          alt={`${post.title} placeholder`} 
          className="post-card-image"
          style={{width: `${post.imageWidth}px`, height: `${post.imageHeight}px`, display: 'block', objectFit: 'cover'}}
        />
      </Link>
      <div className="post-card-content">
        <div className="post-card-meta">
          <span className="post-card-category">
            <TagIcon className="icon-xs" /> {post.category}
          </span>
        </div>
        <h3 className="post-card-title">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="post-card-excerpt">{post.excerpt}</p>
        <div className="post-card-author-date">
          <span><UserCircleIcon className="icon-xs" /> {post.author}</span>
          <span><CalendarDaysIcon className="icon-xs" /> {post.date}</span>
        </div>
        <Link to={`/blog/${post.slug}`} className="btn-secondary btn-small post-card-readmore">
          Read More <ArrowRightIcon className="icon-xs" />
        </Link>
      </div>
    </motion.div>
  );
}

function FeaturedPostCard({ post }) {
  return (
    <motion.div 
      className="featured-post-card"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Link to={`/blog/${post.slug}`} className="featured-post-image-link">
        {/* #ai-image-${post.imageWidth}x${post.imageHeight} img=${post.imageFilename} */}
        <img 
          src={post.imageUrl} 
          alt={`${post.title} placeholder`} 
          className="featured-post-image"
          style={{width: `${post.imageWidth}px`, height: `${post.imageHeight}px`, display: 'block', objectFit: 'cover'}}
        />
      </Link>
      <div className="featured-post-content">
        <div className="featured-post-meta">
          <span className="featured-post-category">
            <TagIcon className="icon-sm" /> {post.category}
          </span>
        </div>
        <h2 className="featured-post-title">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="featured-post-excerpt">{post.excerpt}</p>
        <div className="featured-post-author-date">
          <span><UserCircleIcon className="icon-sm" /> {post.author}</span>
          <span><CalendarDaysIcon className="icon-sm" /> {post.date}</span>
        </div>
        <Link to={`/blog/${post.slug}`} className="btn-primary post-card-readmore">
          Read Full Story <ArrowRightIcon className="icon-sm" />
        </Link>
      </div>
    </motion.div>
  );
}

function BlogHome() {
  const featuredPost = mockBlogPosts.find(post => post.featured);
  const recentPosts = mockBlogPosts.filter(post => !post.featured);

  return (
    <div className="blog-home-container">
      {featuredPost && <FeaturedPostCard post={featuredPost} />}
      
      <section className="recent-posts-section">
        <h2 className="section-title">Recent Articles</h2>
        <div className="post-grid">
          {recentPosts.map(post => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/about" element={<About />} />
            {/* Add route for individual blog posts if needed in future */}
            {/* <Route path="/blog/:slug" element={<BlogPostPage />} /> */}
          </Routes>
          <Footer />
          <AuthModal />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

function Home() {
  return <BlogHome />;
}

function AuthButtons() {
  const { user, openAuthModal } = useAuth();

  if (user) {
    return <UserDropdown />;
  }

  return (
    <div className="auth-buttons">
      <button className="btn-secondary" onClick={openAuthModal}>Sign In</button>
      <button className="btn-primary" onClick={openAuthModal}>Sign Up</button>
    </div>
  );
}

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, openAuthModal, signOut } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <CodeBracketIcon className="icon" />
          <span>React+Node.JS Lite</span>
        </div>
        
        <nav className="desktop-menu">
          <Link to="/">Home</Link>
          <Link to="/features">Features</Link>
          <Link to="/pricing">Pricing</Link>
          <Link to="/documentation">Documentation</Link>
          <Link to="/about">About</Link>
          {/* Consider adding a Blog link if it becomes a main section */}
          {/* <Link to="/blog">Blog</Link> */}
        </nav>
        
        <AuthButtons />
        
        <button 
          className="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <Link to="/">Home</Link>
            <Link to="/features">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/documentation">Documentation</Link>
            <Link to="/about">About</Link>
            {user ? (
              <>
                <div className="mobile-user-info">
                  <span>{user.email}</span>
                </div>
                <button className="btn-secondary" onClick={signOut}>Sign Out</button>
              </>
            ) : (
              <>
                <button className="btn-secondary" onClick={openAuthModal}>Sign In</button>
                <button className="btn-primary" onClick={openAuthModal}>Sign Up</button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <CodeBracketIcon className="icon" />
          <span>React+Node.JS Lite</span>
        </div>
        
        <div className="footer-links">
          <div className="footer-column">
            <h4>Product</h4>
            <Link to="/">Home</Link>
            <Link to="/features">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/documentation">Documentation</Link>
          </div>
          
          <div className="footer-column">
            <h4>Resources</h4>
            {/* Update these links if a blog section is formally added */}
            <a href="#blog">Blog</a> 
            <a href="#tutorials">Tutorials</a>
            <a href="#support">Support</a>
          </div>
          
          <div className="footer-column">
            <h4>Company</h4>
            <Link to="/about">About</Link>
            <a href="#careers">Careers</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} React+Node.JS Lite. All rights reserved.</p>
      </div>
    </footer>
  );
}
