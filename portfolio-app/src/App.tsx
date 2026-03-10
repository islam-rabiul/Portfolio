import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Code, Image, Brain, Menu, X } from 'lucide-react';

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const projects = [
    {
      title: 'OpenCV Projects',
      description: 'Computer vision projects using OpenCV including image processing and feature detection',
      image: '/assets/imageblending.png',
      tech: ['Python', 'OpenCV', 'NumPy'],
      github: 'https://github.com/islam-rabiul/OpenCV-project',
      icon: <Image className="w-6 h-6" />
    },
    {
      title: 'Lung Cancer Prediction',
      description: 'Machine learning model for predicting lung cancer using medical imaging data',
      image: '/assets/lungcancer.jpg',
      tech: ['Python', 'TensorFlow', 'Scikit-learn'],
      github: 'https://github.com/islam-rabiul/Machine-Learning-Projects/blob/main/Lung_cancer_prediction_ipynb.ipynb',
      icon: <Brain className="w-6 h-6" />
    },
    {
      title: 'Password Validator',
      description: 'Secure password validation tool with strength checking and security recommendations',
      image: '/assets/PasswordValidator.png',
      tech: ['JavaScript', 'React', 'CSS'],
      github: 'https://github.com/islam-rabiul/Password-Validator',
      icon: <Code className="w-6 h-6" />
    }
  ];

  const skills = [
    'Python', 'JavaScript', 'React', 'Node.js', 'Machine Learning', 
    'OpenCV', 'TensorFlow', 'Git', 'CSS', 'HTML', 'TypeScript'
  ];

  const certificates = [
    {
      title: 'AIT Certification',
      description: 'Advanced certification in Artificial Intelligence and Machine Learning',
      image: '/assets/Ait (1).jpeg',
      issuer: 'AIT Institute',
      date: '2024'
    },
    {
      title: 'IIITA Certification',
      description: 'Professional certification in Web Development and Cloud Computing',
      image: '/assets/IIITA (1).jpeg',
      issuer: 'IIITA',
      date: '2023'
    },
    {
      title: 'Udemy Certificate',
      description: 'Complete Web Development Bootcamp - Full Stack Course',
      image: '/assets/udemy_page-0001 (1).jpg',
      issuer: 'Udemy',
      date: '2023'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-xl font-bold gradient-text">Portfolio</div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
              <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
              <a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a>
              <a href="#skills" className="hover:text-blue-400 transition-colors">Skills</a>
              <a href="#certificates" className="hover:text-blue-400 transition-colors">Certificates</a>
              <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden bg-gray-800 rounded-lg mt-2 p-4"
            >
              <div className="flex flex-col space-y-3">
                <a href="#home" className="hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</a>
                <a href="#about" className="hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>About</a>
                <a href="#projects" className="hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Projects</a>
                <a href="#skills" className="hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Skills</a>
                <a href="#certificates" className="hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Certificates</a>
                <a href="#contact" className="hover:text-blue-400 transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</a>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl w-full"
        >
          <div className="mb-8">
            <img 
              src="/assets/Profileicon.jpeg" 
              alt="Profile" 
              className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full mx-auto border-4 border-blue-500 shadow-xl"
            />
          </div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="gradient-text">Rabiul Islam</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 px-4"
          >
            Full Stack Developer & Machine Learning Enthusiast
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center space-x-4"
          >
            <a 
              href="https://github.com/islam-rabiul" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a 
              href="https://www.linkedin.com/in/mohammad-rabiul-islam/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a 
              href="mailto:islamrabi93@gmail.com"
              className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-16 gradient-text"
          >
            About Me
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-blue-400">Full Stack Developer & ML Enthusiast</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                I'm Rabiul Islam, a passionate developer with expertise in full-stack web development and machine learning. 
                I love creating innovative solutions that bridge the gap between cutting-edge technology and real-world applications.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                My journey in tech started with a curiosity about how things work, and has evolved into a career focused on 
                building scalable web applications and exploring the fascinating world of artificial intelligence.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                or sharing knowledge with the developer community. I believe in continuous learning and staying updated with 
                the latest industry trends.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium">
                  Problem Solver
                </span>
                <span className="px-4 py-2 bg-green-600/20 text-green-400 rounded-full text-sm font-medium">
                  Team Player
                </span>
                <span className="px-4 py-2 bg-purple-600/20 text-purple-400 rounded-full text-sm font-medium">
                  Quick Learner
                </span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <h4 className="text-xl font-semibold mb-4 text-blue-400">Education</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-white">Bachelor of Technology</h5>
                    <p className="text-gray-400 text-sm">Computer Science & Engineering</p>
                    <p className="text-gray-500 text-xs">2022 - 2026</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <h4 className="text-xl font-semibold mb-4 text-blue-400">Interests</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Machine Learning</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Web Development</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">.Net</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-300 text-sm">Dsa</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
                <h4 className="text-xl font-semibold mb-4 text-blue-400">Languages</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">English</span>
                  <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">Hindi</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-16 gradient-text"
          >
            Projects
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl overflow-hidden card-hover border border-gray-700"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    View on GitHub <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-16 gradient-text"
          >
            Skills
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-20 px-4 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold text-center mb-16 gradient-text"
          >
            Certificates
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((certificate, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-xl overflow-hidden card-hover border border-gray-700"
              >
                <div className="h-48 overflow-hidden cursor-pointer group relative">
                  <a 
                    href={certificate.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full h-full"
                  >
                    <img 
                      src={certificate.image}
                      alt={certificate.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  </a>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{certificate.title}</h3>
                  <p className="text-gray-300 mb-4">{certificate.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-400">{certificate.issuer}</span>
                    <span className="text-gray-400">{certificate.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl font-bold mb-8 gradient-text"
          >
            Get In Touch
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 mb-8"
          >
            I'm always interested in hearing about new opportunities and exciting projects.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center space-x-6"
          >
            <a 
              href="mailto:islamrabi93@gmail.com"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-medium hover:shadow-lg transition-all"
            >
              Send Email
            </a>
            <a 
              href="/assets/Resume HCL.pdf"
              download="Resume"
              className="px-8 py-3 border border-gray-600 rounded-full font-medium hover:bg-gray-800 transition-all"
            >
              Download Resume
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-700">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2026 Islam Rabiul. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
